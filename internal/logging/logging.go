package logging

import (
	"log/slog"
	"os"
)

func NewLogger(dev bool) *slog.Logger {
	var logger *slog.Logger

	if dev {
		logger = slog.New(slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{
			AddSource: true,
		}))
	} else {
		logger = slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
			AddSource: true,
		}))
	}

	return logger
}

func NewLoggerFromEnv() *slog.Logger {
	return NewLogger(false)
}
