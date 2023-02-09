package main

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	_ "image/png"
	"log"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Review struct {
	ID     string `json:"id"`
	Name   string `json:"name"`
	Rating int    `json:"rating"`
	Review string `json:"review"`
	Date   int64  `json:"date"`
	Media  string `json:"media"`
}
type Page struct {
	Data    []Review `json:"data"`
	Matches int64    `json:"matches"`
}
type Store struct {
	locaColl *mongo.Collection
}

var validMedia = map[string]string{
	"\xff\xd8\xff":      "data:image/jpeg",
	"\x89PNG\r\n\x1a\n": "data:image/png",
}

func (s *Store) detectContentType(data []byte) string {
	for magic, contentType := range validMedia {
		if strings.HasPrefix(string(data), magic) {
			return contentType
		}
	}
	return ""
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
		locaColl: db.Collection("reviews"),
	}
}

func (s *Store) AddReview(rev Review) {
	insertResult, err := s.locaColl.InsertOne(context.Background(), rev)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("\nInserted a Single Document: %v\n", insertResult)
}

func (s *Store) GetReviews(searchText string, limit, skip *int64) (Page, error) {
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
	var rev Review

	if err := json.Unmarshal([]byte(r.Body), &rev); err != nil {
		log.Fatal(err)
	}
	rev.Date = time.Now().Unix()

	// decode base64, check it's valid, then re-encode
	if rev.Media != "" {
		b64data := rev.Media[strings.IndexByte(rev.Media, ',')+1:]
		data, err := base64.StdEncoding.DecodeString(b64data)
		if err != nil {
			log.Fatal("error:", err)
		}
		en := base64.StdEncoding.EncodeToString(data)
		rev.Media = s.detectContentType(data) + ";base64," + en
	}

	s.AddReview(rev)
	rspByt, err := json.Marshal(rev)
	if err != nil {
		return nil, fmt.Errorf("error marshaling payment link: %w", err)
	}

	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers:    map[string]string{"Content-Type": "application/json"},
		Body:       string(rspByt),
	}, nil
}

func (s *Store) Query(r events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	limit, err := strconv.ParseInt(r.QueryStringParameters["limit"], 10, 64)
	if err != nil {
		limit = 10
	}
	skip, err := strconv.ParseInt(r.QueryStringParameters["skip"], 10, 64)
	if err != nil {
		skip = 0
	}
	searchText := r.QueryStringParameters["searchText"]
	pg, err := s.GetReviews(searchText, &limit, &skip)
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
	case "GET":
		return cmmntSt.Query(r)
	case "POST":
		return cmmntSt.Create(r)
	default:
		return &events.APIGatewayProxyResponse{
			StatusCode: 405,
			Headers:    map[string]string{"Content-Type": "application/json"},
			Body:       "Method Not Allowed",
		}, nil

	}
}

func main() {
	lambda.Start(handler)
}