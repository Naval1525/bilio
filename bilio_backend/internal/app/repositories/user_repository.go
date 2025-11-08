package repositories

import (
	"context"
	"database/sql"
	"time"

	"github.com/google/uuid"

	"github.com/nava1525/bilio-backend/internal/app/models"
)

type UserRepository interface {
	List(ctx context.Context) ([]models.User, error)
	Create(ctx context.Context, user *models.User) (*models.User, error)
}

type postgresUserRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) UserRepository {
	return &postgresUserRepository{db: db}
}

func (r *postgresUserRepository) List(ctx context.Context) ([]models.User, error) {
	rows, err := r.db.QueryContext(ctx, `SELECT id, email, COALESCE(name, '') FROM users ORDER BY created_at DESC`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []models.User
	for rows.Next() {
		var user models.User
		if err := rows.Scan(&user.ID, &user.Email, &user.Name); err != nil {
			return nil, err
		}
		users = append(users, user)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return users, nil
}

func (r *postgresUserRepository) Create(ctx context.Context, user *models.User) (*models.User, error) {
	id := uuid.NewString()
	now := time.Now().UTC()

	_, err := r.db.ExecContext(ctx,
		`INSERT INTO users (id, email, name, created_at, updated_at) VALUES ($1, $2, $3, $4, $4)`,
		id, user.Email, user.Name, now,
	)
	if err != nil {
		return nil, err
	}

	return &models.User{
		ID:    id,
		Email: user.Email,
		Name:  user.Name,
	}, nil
}
