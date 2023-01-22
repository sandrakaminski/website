package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/joho/godotenv"

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

func (p Person) addContact() {
	godotenv.Load(".env")

	req := send.GetRequest(os.Getenv("SENDGRID_API_KEY"), "/v3/marketing/contacts", "https://api.sendgrid.com")
	req.Method = "PUT"

	req.Body, _ = json.Marshal(Contact{Contacts: []Person{p}})
	response, err := send.API(req)
	if err != nil {
		fmt.Println(err)
	} else {
		log.Println(response.Body)
	}
}

func handler(e events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	var p Person

	if err := json.Unmarshal([]byte(e.Body), &p); err != nil {
		return nil, err
	}

	p.addContact()

	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers:    map[string]string{"Content-Type": "application/json"},
		Body:       "Contact added",
	}, nil
}

func main() {
	lambda.Start(handler)
}
