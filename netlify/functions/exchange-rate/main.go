package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"

	"github.com/joho/godotenv"
)

type exchangeRequest struct {
	Currency string `json:"currency"`
	NewCurrency string `json:"newCurrency"`
	Price float64 `json:"price"`
}

type ExchangeRateResponse struct {
	Data map[string]float64 `json:"data"`
}

type Result struct {
	Price string `json:"price"`
}

func handler(req events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	godotenv.Load(".env")

	accessTkn := os.Getenv("ACCESS_TOKEN")
	
 	client := &http.Client{}

	var exch exchangeRequest
	if err := json.Unmarshal([]byte(req.Body), &exch); err != nil {
		return &events.APIGatewayProxyResponse{
			Body:       string("Error deserialize exchange request"),
			StatusCode: 500,
		}, nil
	}

	url := fmt.Sprintf("https://api.freecurrencyapi.com/v1/latest?apikey=%s&currencies=%s&base_currency=%s", accessTkn,  exch.NewCurrency, exch.Currency)
	fmt.Println(url)
	hreq, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
			return &events.APIGatewayProxyResponse{
			Body:       string("Not Found"),
			StatusCode: 404,
		}, nil
	}
	resp, err := client.Do(hreq)
	if err != nil {
        return &events.APIGatewayProxyResponse{
            Body:       "Error making HTTP request",
            StatusCode: 400,
        }, nil
    }
	defer resp.Body.Close()

	responseBody, err := io.ReadAll(resp.Body)
    if err != nil {
       return &events.APIGatewayProxyResponse{
			Body:       string("Internal Server Error"),
			StatusCode: 500,
		}, nil
    }

	var exchRate *ExchangeRateResponse
    if err := json.Unmarshal(responseBody, &exchRate); err != nil {
         return &events.APIGatewayProxyResponse{
			Body:       string("Error deserialize exchange rate"),
			StatusCode: 500,
		}, nil
    }
	
	res := exchRate.Data[exch.NewCurrency]
	calc := res * exch.Price

	r, err := json.Marshal(Result{Price: fmt.Sprintf("%.2f", calc)})
	if err != nil {
		return &events.APIGatewayProxyResponse{
			Body:       string("Error serialize exchange rate"),
			StatusCode: 500,
		}, nil
	}

	return &events.APIGatewayProxyResponse{
		Body: 	 string(r),
		StatusCode: 200,
	}, nil
}

func main() {
	lambda.Start(handler)
}