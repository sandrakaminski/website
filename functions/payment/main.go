package main

import (
	"encoding/json"
	"log"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/joho/godotenv"
	"github.com/stripe/stripe-go/v73"
	"github.com/stripe/stripe-go/v73/paymentlink"
	"github.com/stripe/stripe-go/v73/product"
)

func main() {
	lambda.Start(PlaceOrder)
}

func loadEnv(env string) (uri string) {
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file ")
	}
	uri = os.Getenv(env)
	return uri
}

type Order struct {
	Country    string      `json:"country"`
	ShippingID string      `json:"shippingId"`
	OrderItems []OrderItem `json:"orderItems"`
}

type OrderItem struct {
	ProductID string `json:"productId"`
	Quantity  int64  `json:"quantity"`
}

func PlaceOrder(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	stripe.Key = loadEnv("STRIPE_SECRET")

	var ord Order
	if err := json.Unmarshal([]byte(request.Body), &ord); err != nil {
		return nil, err
	}

	// create map of order items by product id
	ordItems := make(map[string]OrderItem)
	prodParams := &stripe.ProductListParams{}

	for _, oi := range ord.OrderItems {
		ordItems[oi.ProductID] = OrderItem{
			ProductID: oi.ProductID,
			Quantity:  oi.Quantity,
		}
		prodParams.IDs = append(prodParams.IDs, stripe.String(oi.ProductID))
	}

	// get payment line item(s)
	prdIter := product.List(prodParams)
	var lineItems []*stripe.PaymentLinkLineItemParams

	for prdIter.Next() {
		prod := prdIter.Product()
		lineItems = append(lineItems, &stripe.PaymentLinkLineItemParams{
			Price:    stripe.String(prod.DefaultPrice.ID),
			Quantity: stripe.Int64(ordItems[prod.ID].Quantity),
		})
	}

	// create payment link
	params := &stripe.PaymentLinkParams{
		BillingAddressCollection: stripe.String(string(stripe.PaymentLinkBillingAddressCollectionAuto)),
		ShippingAddressCollection: &stripe.PaymentLinkShippingAddressCollectionParams{
			AllowedCountries: []*string{
				stripe.String(ord.Country),
			},
		},

		Currency: stripe.String(string("NZD")),
		ShippingOptions: []*stripe.PaymentLinkShippingOptionParams{
			{ShippingRate: stripe.String(ord.ShippingID)},
		},

		LineItems: lineItems,
		AfterCompletion: &stripe.PaymentLinkAfterCompletionParams{
			Type: stripe.String(string(stripe.PaymentLinkAfterCompletionTypeRedirect)),
			Redirect: &stripe.PaymentLinkAfterCompletionRedirectParams{
				URL: stripe.String(loadEnv("DOMAIN")),
			},
		},
	}
	link, err := paymentlink.New(params)

	rspByt, err := json.Marshal(link)
	if err != nil {
		return nil, err
	}

	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers:    map[string]string{"Content-Type": "application/json"},
		Body:       string(rspByt),
	}, nil
}
