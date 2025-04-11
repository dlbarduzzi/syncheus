package main

import (
	"context"
	"os"

	"github.com/spf13/viper"

	"github.com/dlbarduzzi/syncheus/internal/database"
	"github.com/dlbarduzzi/syncheus/internal/logging"
	"github.com/dlbarduzzi/syncheus/internal/registry"
	"github.com/dlbarduzzi/syncheus/internal/server"
	"github.com/dlbarduzzi/syncheus/internal/syncheus"
)

func main() {
	logger := logging.NewLoggerFromEnv()

	ctx := context.Background()
	ctx = logging.LoggerWithContext(ctx, logger)

	if err := start(ctx); err != nil {
		logger.Error(err.Error())
		os.Exit(1)
	}
}

func start(ctx context.Context) error {
	logger := logging.LoggerFromContext(ctx)

	reg, err := registry.NewRegistry()
	if err != nil {
		return err
	}

	dbConfig := setDatabaseConfig(reg)
	appConfig := setSyncheusConfig(reg)

	db, err := database.NewDatabase(dbConfig)
	if err != nil {
		return err
	}

	defer db.Close()
	logger.Info("database connection established")

	app, err := syncheus.NewSyncheus(logger, appConfig)
	if err != nil {
		return err
	}

	srv := server.NewServer(app.Port(), logger)
	srv.OnShutdown(func() {
		app.Shutdown()
	})

	return srv.Start(ctx, app.Routes())
}

func setSyncheusConfig(v *viper.Viper) *syncheus.Config {
	return &syncheus.Config{
		Port: v.GetInt("SY_APP_PORT"),
	}
}

func setDatabaseConfig(v *viper.Viper) *database.Config {
	return &database.Config{
		ConnectionURL:   v.GetString("SY_DB_CONNECTION_URL"),
		MaxOpenConns:    v.GetInt("SY_DB_MAX_OPEN_CONNS"),
		MaxIdleConns:    v.GetInt("SY_DB_MAX_IDLE_CONNS"),
		ConnMaxIdleTime: v.GetDuration("SY_DB_MAX_IDLE_TIME"),
	}
}
