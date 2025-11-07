package repositories

import (
	"context"

	"github.com/nava1525/bilio-backend/internal/app/models"
	"github.com/nava1525/bilio-backend/internal/database"
	"github.com/nava1525/bilio-backend/prisma/client"
)

type UserRepository interface {
	List(ctx context.Context) ([]models.User, error)
	Create(ctx context.Context, user *models.User) (*models.User, error)
}

type prismaUserRepository struct {
	client *database.PrismaClient
}

func NewUserRepository(client *database.PrismaClient) UserRepository {
	return &prismaUserRepository{client: client}
}

func (r *prismaUserRepository) List(ctx context.Context) ([]models.User, error) {
	records, err := r.client.User.FindMany().Exec(ctx)
	if err != nil {
		return nil, err
	}

	users := make([]models.User, len(records))
	for i, rec := range records {
		users[i] = models.User{
			ID:    rec.ID,
			Email: rec.Email,
			Name:  rec.Name,
		}
	}
	return users, nil
}

func (r *prismaUserRepository) Create(ctx context.Context, user *models.User) (*models.User, error) {
	created, err := r.client.User.CreateOne(
		client.User.Email.Set(user.Email),
		client.User.Name.Set(user.Name),
	).Exec(ctx)
	if err != nil {
		return nil, err
	}

	return &models.User{
		ID:    created.ID,
		Email: created.Email,
		Name:  created.Name,
	}, nil
}
