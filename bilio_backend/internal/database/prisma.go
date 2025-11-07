package database

import (
	"fmt"
	"os"

	"github.com/nava1525/bilio-backend/prisma/client"
)

type PrismaClient struct {
	*client.PrismaClient
}

func NewClient(databaseURL string) (*PrismaClient, error) {
	if databaseURL != "" {
		if err := os.Setenv("DATABASE_URL", databaseURL); err != nil {
			return nil, fmt.Errorf("set DATABASE_URL: %w", err)
		}
	}

	prisma := client.NewClient()

	if err := prisma.Connect(); err != nil {
		return nil, fmt.Errorf("connect prisma: %w", err)
	}

	return &PrismaClient{PrismaClient: prisma}, nil
}

func (p *PrismaClient) Disconnect() {
	if err := p.PrismaClient.Disconnect(); err != nil {
		fmt.Printf("failed to disconnect prisma client: %v\n", err)
	}
}
