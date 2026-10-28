package main

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/joho/godotenv"
	"github.com/stripe/stripe-go/v73"
	"github.com/stripe/stripe-go/v73/price"
	"github.com/stripe/stripe-go/v73/product"
)

type requestBody struct {
	Currency   string   `json:"currency"`
	ProductIDs []string `json:"productIds"`
}

type responseBody struct {
	// Amounts in major units for the requested currency (from Stripe currency_options).
	Prices map[string]float64 `json:"prices"`
}

func isZeroDecimal(currency string) bool {
	switch strings.ToUpper(currency) {
	case "JPY", "TWD":
		return true
	default:
		return false
	}
}

func toMajorUnits(currency string, amount int64) float64 {
	if isZeroDecimal(currency) {
		return float64(amount)
	}
	return float64(amount) / 100
}

func amountForCurrency(p *stripe.Price, currency string) (float64, bool) {
	currency = strings.ToLower(currency)
	if strings.ToLower(string(p.Currency)) == currency {
		return toMajorUnits(currency, p.UnitAmount), true
	}
	if opt, ok := p.CurrencyOptions[currency]; ok && opt != nil {
		return toMajorUnits(currency, opt.UnitAmount), true
	}
	return 0, false
}

func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	godotenv.Load(".env")
	stripe.Key = os.Getenv("STRIPE_SECRET")

	var body requestBody
	if err := json.Unmarshal([]byte(request.Body), &body); err != nil {
		return nil, err
	}
	if body.Currency == "" || len(body.ProductIDs) == 0 {
		return &events.APIGatewayProxyResponse{
			StatusCode: 400,
			Headers:    map[string]string{"Content-Type": "application/json"},
			Body:       `{"error":"currency and productIds are required"}`,
		}, nil
	}

	requested := strings.ToLower(body.Currency)
	out := make(map[string]float64, len(body.ProductIDs))

	prodParams := &stripe.ProductListParams{}
	for _, id := range body.ProductIDs {
		prodParams.IDs = append(prodParams.IDs, stripe.String(id))
	}

	prdIter := product.List(prodParams)
	for prdIter.Next() {
		prod := prdIter.Product()
		if prod.DefaultPrice == nil {
			return &events.APIGatewayProxyResponse{
				StatusCode: 400,
				Headers:    map[string]string{"Content-Type": "application/json"},
				Body:       fmt.Sprintf(`{"error":"missing default price for product %s"}`, prod.ID),
			}, nil
		}

		priceParams := &stripe.PriceParams{}
		priceParams.AddExpand("currency_options")
		p, err := price.Get(prod.DefaultPrice.ID, priceParams)
		if err != nil {
			return nil, fmt.Errorf("error retrieving price for %s: %w", prod.ID, err)
		}

		amount, ok := amountForCurrency(p, requested)
		if !ok {
			return &events.APIGatewayProxyResponse{
				StatusCode: 400,
				Headers:    map[string]string{"Content-Type": "application/json"},
				Body: fmt.Sprintf(
					`{"error":"product %s is not available in %s"}`,
					prod.ID,
					requested,
				),
			}, nil
		}
		out[prod.ID] = amount
	}
	if err := prdIter.Err(); err != nil {
		return nil, fmt.Errorf("error listing products: %w", err)
	}

	rspByt, err := json.Marshal(responseBody{Prices: out})
	if err != nil {
		return nil, fmt.Errorf("error marshaling prices: %w", err)
	}

	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers:    map[string]string{"Content-Type": "application/json"},
		Body:       string(rspByt),
	}, nil
}

func main() {
	lambda.Start(handler)
}
