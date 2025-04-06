package main

import (
	"context"
	"os"

	"github.com/dlbarduzzi/syncheus/internal/logging"
	"github.com/dlbarduzzi/syncheus/internal/server"
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

	srv := server.NewServer(8000, logger)
	srv.OnShutdown(func() {
		logger.Info("app tasks to run before shutdown...")
	})

	return srv.Start(ctx, nil)
}
