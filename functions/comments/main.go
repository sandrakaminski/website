package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strconv"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Comments struct {
	Name    string `json:"name"`
	Comment string `json:"comment"`
	ID      string `json:"id"`
	Date    int64  `json:"date"`
}
type Page struct {
	Data    []Comments `json:"data"`
	Matches int64      `json:"matches"`
}
type Store struct {
	locaColl *mongo.Collection
}

// stores
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

func (s *Store) AddComment(c Comments) {
	insertResult, err := s.locaColl.InsertOne(context.Background(), c)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("\nInserted a Single Document: %v\n", insertResult)
}

func (s *Store) GetComments(searchText string, limit, skip *int64) (Page, error) {
	filter := bson.M{}

	if searchText != "" {
		filter = bson.M{"$text": bson.M{"$search": `"` + searchText + `"`}}
	}
	opt := options.FindOptions{
		Skip:  skip,
		Limit: limit,
		Sort:  bson.M{"date": -1},
	}

	mctx := context.Background()
	cursor, err := s.locaColl.Find(mctx, filter, &opt)
	if err != nil {
		return Page{}, err
	}

	var pg Page
	if err := cursor.All(mctx, &pg.Data); err != nil {
		return Page{}, err
	}
	if pg.Matches, err = s.locaColl.CountDocuments(mctx, filter); err != nil {
		return Page{}, err
	}
	return pg, nil
}

// handlers

func (s *Store) Create(r events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	var coms Comments
	if err := json.Unmarshal([]byte(r.Body), &coms); err != nil {
		log.Fatal(err)
	}
	coms.Date = time.Now().Unix()
	s.AddComment(coms)

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

func (s *Store) Get(r events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	limit, err := strconv.ParseInt(r.QueryStringParameters["limit"], 10, 64)
	if err != nil {
		limit = 10
	}
	skip, err := strconv.ParseInt(r.QueryStringParameters["skip"], 10, 64)
	if err != nil {
		skip = 0
	}
	searchText := r.QueryStringParameters["searchText"]
	pg, err := s.GetComments(searchText, &limit, &skip)
	if err != nil {
		return nil, fmt.Errorf("error getting comments: %w", err)
	}

	rspByt, err := json.Marshal(pg)
	if err != nil {
		return nil, fmt.Errorf("error marshaling payment link: %w", err)
	}

	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers:    map[string]string{"Content-Type": "application/json"},
		Body:       string(rspByt),
	}, nil
}

func handler(r events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	cmmntSt := Connect()
	switch r.HTTPMethod {
	case "POST":
		return cmmntSt.Create(r)
	case "GET":
		return cmmntSt.Get(r)
	default:
		return nil, fmt.Errorf("unsupported method: %s", r.HTTPMethod)
	}
}

func main() {
	lambda.Start(handler)
}