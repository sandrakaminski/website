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

func (p Person) addContact() error {
	godotenv.Load(".env")
	
	apiKey := os.Getenv("SENDGRID_API_KEY")
	if apiKey == "" {
		log.Println("Missing required environment variables.")
		return fmt.Errorf("cannot send email, try again later")
	}

	req := send.GetRequest(apiKey, "/v3/marketing/contacts", "https://api.sendgrid.com")
	req.Method = "PUT"

	req.Body, _ = json.Marshal(Contact{Contacts: []Person{p}})
	response, err := send.API(req)
	if err != nil {
		log.Println(err)
		return err
	} 

	if response.StatusCode != 202 {
		err := fmt.Errorf("There was a problem with the submission.")
		log.Println(err, response.Body)
		return err
	}

	return nil
}

func handler(e events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	var p Person

	if err := json.Unmarshal([]byte(e.Body), &p); err != nil {
		return nil, err
	}

	err := p.addContact()
	if err != nil {
		errorResponse, _ := json.Marshal(map[string]string{
			"error": fmt.Sprintf("Error sending email: %v", err),
		})

		return &events.APIGatewayProxyResponse{
			StatusCode: 500,
			Headers:    map[string]string{"Content-Type": "application/json"},
			Body:       string(errorResponse),
		}, nil
	}

	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers:    map[string]string{"Content-Type": "application/json"},
		Body:       `{"message": "Contact added successfully"}`,
	}, nil
}

func main() {
	lambda.Start(handler)
}
