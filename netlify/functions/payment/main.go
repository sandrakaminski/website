package main

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/stripe/stripe-go/v73"
	"github.com/stripe/stripe-go/v73/checkout/session"
	"github.com/stripe/stripe-go/v73/product"

	"github.com/joho/godotenv"
)

type Order struct {
	Currency   string      `json:"currency"`
	Country    string      `json:"country"`
	Shipping   int64       `json:"shipping"`
	OrderItems []OrderItem `json:"orderItems"`
}

type OrderItem struct {
	ProductID string `json:"productId"`
	Quantity  int64  `json:"quantity"`
}

const url = "https://www.sandrakaminski.com"

func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	godotenv.Load(".env")

	stripe.Key = os.Getenv("STRIPE_SECRET")

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
	var lineItems []*stripe.CheckoutSessionLineItemParams

	for prdIter.Next() {
		prod := prdIter.Product()
		lineItems = append(lineItems, &stripe.CheckoutSessionLineItemParams{
			Price:    stripe.String(prod.DefaultPrice.ID),
			Quantity: stripe.Int64(ordItems[prod.ID].Quantity),
		})
	}

	// create a checkout session
	params := &stripe.CheckoutSessionParams{
		PaymentMethodTypes: stripe.StringSlice([]string{
			"card",
		}),
		PhoneNumberCollection: &stripe.CheckoutSessionPhoneNumberCollectionParams{
			Enabled: stripe.Bool(true),
		},
		AllowPromotionCodes: stripe.Bool(true),
		Currency:   stripe.String(string(ord.Currency)),
		SubmitType: stripe.String("pay"),
		Mode:       stripe.String(string(stripe.CheckoutSessionModePayment)),
		SuccessURL: stripe.String(url + "/success"),
		CancelURL:  stripe.String(url + "/cart"),
		ShippingAddressCollection: &stripe.CheckoutSessionShippingAddressCollectionParams{
			AllowedCountries: stripe.StringSlice([]string{ord.Country}),
		},
		ShippingOptions: []*stripe.CheckoutSessionShippingOptionParams{
			{ShippingRateData: &stripe.CheckoutSessionShippingOptionShippingRateDataParams{
				TaxBehavior: stripe.String("inclusive"),
				Type:        stripe.String("fixed_amount"),
				DisplayName: stripe.String("Shipping and handling to " + ord.Country),
				FixedAmount: &stripe.CheckoutSessionShippingOptionShippingRateDataFixedAmountParams{
					Currency: stripe.String(ord.Currency),
					Amount:   stripe.Int64(ord.Shipping),
				},
			}},
		},
		AutomaticTax: &stripe.CheckoutSessionAutomaticTaxParams{Enabled: stripe.Bool(true)},
		LineItems:    lineItems,
	}

	link, err := session.New(params)
	if err != nil {
		// if err is 400
		if stripeErr, ok := err.(*stripe.Error); ok && stripeErr.HTTPStatusCode == 400 {
			return &events.APIGatewayProxyResponse{
				StatusCode: 400,
				Headers:    map[string]string{"Content-Type": "application/json"},
				Body:       fmt.Sprintf(`{"error":"%s"}`, stripeErr.Msg),
			}, nil
		}
		return nil, fmt.Errorf("error generating payment link: %w", err)
	}
	rspByt, err := json.Marshal(link)
	if err != nil {
		return nil, fmt.Errorf("error marshaling payment link: %w", err)
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
