package main

import (
	"context"
	"log"
	"os"

	"github.com/nava1525/bilio-backend/internal/database"
	"github.com/nava1525/bilio-backend/prisma/client"
)

func main() {
	databaseURL := os.Getenv("DATABASE_URL")
	dbClient, err := database.NewClient(databaseURL)
	if err != nil {
		log.Fatalf("failed to init prisma: %v", err)
	}
	defer dbClient.Disconnect()

	ctx := context.Background()

	if _, err := dbClient.User.CreateOne(
		client.User.Email.Set("demo@bilio.dev"),
		client.User.Name.Set("Demo User"),
	).Exec(ctx); err != nil {
		log.Printf("seed skipped: %v\n", err)
		return
	}

	log.Println("seed completed")
}
