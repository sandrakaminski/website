package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"os"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type comments struct {
	Name    string `json:"name"`
	Comment string `json:"comment"`
	ID      string `json:"id"`
	Date    int64  `json:"date"`
}
type Page struct {
	Data    []comments `json:"data"`
	Matches int64      `json:"matches"`
}
type Store struct {
	locaColl *mongo.Collection
}
type CommentStore struct {
	Store Store
}

func Connect() Store {
	godotenv.Load(".env")
	clientOptions := options.Client().ApplyURI(os.Getenv("MONGO_URI"))
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	db := client.Database("info")

	return Store{
		locaColl: db.Collection("comments"),
	}
}

func (s *Store) AddComment(c comments) {
	insertResult, err := s.locaColl.InsertOne(context.Background(), c)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("\nInserted a Single Document: %v\n", insertResult)
}

func (c *CommentStore) handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	reqByt, err := io.ReadAll(events.APIGatewayProxyRequest.Body)
	if err != nil {
		return nil, err
	}
	var coms comments
	json.Unmarshal(reqByt, &coms)
	coms.Date = time.Now().Unix()
	c.Store.AddComment(coms)

	if err != nil {
		return nil, fmt.Errorf("error generating payment link: %w", err)
	}
	rspByt, err := json.Marshal(coms)
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
	c := CommentStore{
		Store: Connect(),
	}
	lambda.Start(c)
}
