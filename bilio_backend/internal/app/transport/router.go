package transport

import (
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/rs/zerolog"

	appHandlers "github.com/nava1525/bilio-backend/internal/app/handlers"
	appRepositories "github.com/nava1525/bilio-backend/internal/app/repositories"
	"github.com/nava1525/bilio-backend/internal/database"
	pkgmiddleware "github.com/nava1525/bilio-backend/pkg/middleware"
)

func NewRouter(logger zerolog.Logger, prisma *database.PrismaClient) http.Handler {
	r := chi.NewRouter()

	r.Use(pkgmiddleware.RequestLogger(logger))
	r.Use(pkgmiddleware.Recovery(logger))
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Timeout(60 * time.Second))

	healthHandler := appHandlers.NewHealthHandler()
	userRepo := appRepositories.NewUserRepository(prisma)
	userHandler := appHandlers.NewUserHandler(userRepo)

	r.Get("/health", healthHandler.Check)

	r.Route("/api/v1", func(r chi.Router) {
		r.Route("/users", func(r chi.Router) {
			r.Get("/", userHandler.List)
			r.Post("/", userHandler.Create)
		})
	})

	return r
}
