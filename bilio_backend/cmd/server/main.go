package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/joho/godotenv"

	"github.com/nava1525/bilio-backend/internal/config"
	"github.com/nava1525/bilio-backend/internal/database"
	"github.com/nava1525/bilio-backend/internal/logger"
	"github.com/nava1525/bilio-backend/internal/server"
)

func main() {
	_ = godotenv.Load()

	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("failed to load configuration: %v", err)
	}

	logProvider := logger.New(cfg.Logging.Level)

	prismaClient, err := database.NewClient(cfg.Database.URL)
	if err != nil {
		logProvider.Fatal().Err(err).Msg("failed to initialize prisma client")
	}
	defer prismaClient.Disconnect()

	srv := server.NewHTTPServer(cfg, logProvider, prismaClient)

	shutdownCtx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	go func() {
		if err := srv.Start(); err != nil {
			logProvider.Fatal().Err(err).Msg("server stopped with error")
		}
	}()

	<-shutdownCtx.Done()
	logProvider.Info().Msg("shutting down server...")

	if err := srv.Stop(); err != nil {
		logProvider.Error().Err(err).Msg("graceful shutdown failed")
		os.Exit(1)
	}

	logProvider.Info().Msg("server exited cleanly")
}
