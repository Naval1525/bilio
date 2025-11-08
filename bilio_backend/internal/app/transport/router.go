package transport

import (
	"database/sql"
	"fmt"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/rs/zerolog"

	appHandlers "github.com/nava1525/bilio-backend/internal/app/handlers"
	appRepositories "github.com/nava1525/bilio-backend/internal/app/repositories"
	appServices "github.com/nava1525/bilio-backend/internal/app/services"
	"github.com/nava1525/bilio-backend/internal/config"
	pkgmailer "github.com/nava1525/bilio-backend/pkg/mailer"
	pkgmiddleware "github.com/nava1525/bilio-backend/pkg/middleware"
)

func NewRouter(cfg *config.Config, logger zerolog.Logger, db *sql.DB) (http.Handler, error) {
	r := chi.NewRouter()

	r.Use(pkgmiddleware.RequestLogger(logger))
	r.Use(pkgmiddleware.Recovery(logger))
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Timeout(60 * time.Second))
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   cfg.CORS.AllowedOrigins,
		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	healthHandler := appHandlers.NewHealthHandler()
	userRepo := appRepositories.NewUserRepository(db)
	userHandler := appHandlers.NewUserHandler(userRepo)

	waitlistRepo := appRepositories.NewWaitlistRepository(db)

	if cfg.Email.SMTP.Username == "" || cfg.Email.SMTP.Password == "" {
		return nil, fmt.Errorf("email smtp credentials missing; set EMAIL_USER and EMAIL_PASSWORD")
	}

	mailer, err := pkgmailer.NewSMTPMailer(pkgmailer.SMTPConfig{
		Host:     cfg.Email.SMTP.Host,
		Port:     cfg.Email.SMTP.Port,
		Username: cfg.Email.SMTP.Username,
		Password: cfg.Email.SMTP.Password,
		From:     cfg.Email.From,
	})
	if err != nil {
		return nil, err
	}

	waitlistService := appServices.NewWaitlistService(waitlistRepo, mailer)
	waitlistHandler := appHandlers.NewWaitlistHandler(waitlistService, logger)

	r.Get("/health", healthHandler.Check)

	r.Route("/api/v1", func(r chi.Router) {
		r.Route("/users", func(r chi.Router) {
			r.Get("/", userHandler.List)
			r.Post("/", userHandler.Create)
		})

		r.Post("/waitlist", waitlistHandler.Join)
	})

	return r, nil
}
