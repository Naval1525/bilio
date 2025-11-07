package client

import (
	"context"
	"errors"
)

var ErrClientNotGenerated = errors.New("prisma client not generated; run `npx prisma generate`")

type PrismaClient struct {
	User *UserClient
}

func NewClient() *PrismaClient {
	return &PrismaClient{User: &UserClient{}}
}

func (c *PrismaClient) Connect() error {
	return nil
}

func (c *PrismaClient) Disconnect() error {
	return nil
}

type UserClient struct{}

type UserModel struct {
	ID    string
	Email string
	Name  string
}

type UserFindMany struct{}

type UserCreate struct {
	model *UserModel
}

func (c *UserClient) FindMany() *UserFindMany {
	return &UserFindMany{}
}

func (q *UserFindMany) Exec(ctx context.Context) ([]UserModel, error) {
	return nil, ErrClientNotGenerated
}

type UserSetParam func(*UserModel)

type userEmailField struct{}

type userNameField struct{}

var User = struct {
	Email userEmailField
	Name  userNameField
}{}

func (userEmailField) Set(value string) UserSetParam {
	return func(m *UserModel) { m.Email = value }
}

func (userNameField) Set(value string) UserSetParam {
	return func(m *UserModel) { m.Name = value }
}

func (c *UserClient) CreateOne(params ...UserSetParam) *UserCreate {
	model := &UserModel{}
	for _, param := range params {
		param(model)
	}
	return &UserCreate{model: model}
}

func (c *UserCreate) Exec(ctx context.Context) (*UserModel, error) {
	return nil, ErrClientNotGenerated
}
