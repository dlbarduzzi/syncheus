package main

import (
	"context"
	"os"

	"github.com/dlbarduzzi/syncheus/internal/logging"
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

	app, err := syncheus.NewSyncheus(logger)
	if err != nil {
		return err
	}

	srv := server.NewServer(8000, logger)
	srv.OnShutdown(func() {
		app.Shutdown()
	})

	return srv.Start(ctx, app.Routes())
}
