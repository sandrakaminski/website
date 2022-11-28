package main

import (
	"encoding/json"
	"log"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	send "github.com/sendgrid/sendgrid-go"
)

type Person struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
}

type Contact struct {
	Contacts []Person `json:"contacts"`
}

func addContact(per Person) (rsp int, err error) {
	request := send.GetRequest(os.Getenv("SENDGRID_API_KEY"), os.Getenv("SENDGRID_ENDPOINT"), os.Getenv("SENDGRID_HOST"))
	request.Method = "PUT"

	request.Body, _ = json.Marshal(Contact{Contacts: []Person{per}})
	response, err := send.API(request)

	if response.StatusCode != 202 {
		log.Println("Not posted")
		return response.StatusCode, err
	} else {
		log.Println(response.Body)
		return response.StatusCode, err
	}
}

func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	var per Person
	if err := json.Unmarshal([]byte(request.Body), &per); err != nil {
		return nil, err
	}

	rsp, err := addContact(per)
	if err != nil {
		return nil, err
	}

	return &events.APIGatewayProxyResponse{
		StatusCode: rsp,
	}, nil
}

func main() {
	lambda.Start(handler)
}
