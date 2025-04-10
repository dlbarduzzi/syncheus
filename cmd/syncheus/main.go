package main

import (
	"context"
	"os"

	"github.com/dlbarduzzi/syncheus/internal/logging"
	"github.com/dlbarduzzi/syncheus/internal/registry"
	"github.com/dlbarduzzi/syncheus/internal/server"
	"github.com/dlbarduzzi/syncheus/internal/syncheus"
	"github.com/spf13/viper"
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

	appConfig := setSyncheusConfig(reg)

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
