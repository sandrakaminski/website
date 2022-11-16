package main

import (
	"encoding/json"
	"log"

	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/joho/godotenv"
	"github.com/sendgrid/sendgrid-go"
)

type Person struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
}

type Contact struct {
	Contacts []Person `json:"contacts"`
}

func addContact(per Person) {
	godotenv.Load(".env")
	host := os.Getenv("SEND_GRID_HOST")
	ep := os.Getenv("SEND_GRID_ENDPOINT")
	apiKey := os.Getenv("SENDGRID_API_KEY")

	request := sendgrid.GetRequest(apiKey, ep, host)
	request.Method = "PUT"

	request.Body, _ = json.Marshal(Contact{Contacts: []Person{per}})

	response, err := sendgrid.API(request)

	if err != nil {
		log.Println(err)
	} else {
		log.Println(response.Body)
	}
}

func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {

	var per Person
	if err := json.Unmarshal([]byte(request.Body), &per); err != nil {
		return nil, err
	}

	addContact(per)
	rsp := map[string]interface{}{
		"status":     200,
		"statusText": "All good",
	}
	byt, err := json.Marshal(rsp)
	if err != nil {
		return nil, err
	}

	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers:    map[string]string{"Content-Type": "application/json"},
		Body:       string(byt),
	}, nil
}

func main() {
	lambda.Start(handler)
}
