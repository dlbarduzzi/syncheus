package main

import (
	"context"
	"os"

	"github.com/dlbarduzzi/syncheus/internal/logging"
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
	logger.Info("application running...")
	return nil
}
