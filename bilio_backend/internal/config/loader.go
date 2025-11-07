package config

import (
	"fmt"
	"time"

	"github.com/spf13/viper"
)

type Config struct {
	App struct {
		Name string
		Env  string
		Port int
	}
	Server struct {
		ReadTimeout  time.Duration
		WriteTimeout time.Duration
		IdleTimeout  time.Duration
	}
	Database struct {
		URL string
	}
	Logging struct {
		Level string
	}
}

func Load() (*Config, error) {
	v := viper.New()
	v.SetConfigName("config")
	v.AddConfigPath("configs")
	v.SetConfigType("yaml")

	v.SetEnvPrefix("APP")
	v.AutomaticEnv()

	if err := v.ReadInConfig(); err != nil {
		return nil, fmt.Errorf("read config: %w", err)
	}

	// Timeouts as strings in config
	v.SetDefault("server.readtimeout", "5s")
	v.SetDefault("server.writetimeout", "10s")
	v.SetDefault("server.idletimeout", "120s")

	var cfg Config
	if err := v.Unmarshal(&cfg); err != nil {
		return nil, fmt.Errorf("unmarshal config: %w", err)
	}

	return &cfg, nil
}
