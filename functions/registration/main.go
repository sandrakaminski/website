package main

import (
	"encoding/json"
	"io"
	"log"

	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/joho/godotenv"
	"github.com/sendgrid/sendgrid-go"
)

func main() {
	lambda.Start(Create)
}

type Person struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
}

type Contact struct {
	Contacts []Person `json:"contacts"`
}

func addContact(per Person) {
	host := loadEnv("SEND_GRID_HOST")
	ep := loadEnv("SEND_GRID_ENDPOINT")
	apiKey := loadEnv("SENDGRID_API_KEY")

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

func Create(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	reqByt, err := io.ReadAll(request.Body)
	if err != nil {
		return nil, err
	}

	var per Person
	json.Unmarshal(reqByt, &per)

	addContact(per)

	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers:    map[string]string{"Content-Type": "application/json"},
		Body:       "Contact added",
	}, nil
}

func loadEnv(env string) (uri string) {
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file ")
	}
	uri = os.Getenv(env)
	return uri
}
