package logging

import (
	"context"
	"log/slog"
	"os"
	"strings"
	"sync"
)

// contextKey is the logger string type used to avoid context collisions.
type contextKey string

// loggerKey identifies the logger value stored in the context.
const loggerKey = contextKey("logger")

var (
	defaultLogger     *slog.Logger
	defaultLoggerOnce sync.Once
)

func NewLogger(dev bool, level string) *slog.Logger {
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

func DefaultLogger() *slog.Logger {
	defaultLoggerOnce.Do(func() {
		defaultLogger = NewLoggerFromEnv()
	})
	return defaultLogger
}

func NewLoggerFromEnv() *slog.Logger {
	dev := strings.ToLower(strings.TrimSpace(os.Getenv("LOG_MODE"))) == "dev"
	level := strings.ToLower(strings.TrimSpace(os.Getenv("LOG_LEVEL")))
	return NewLogger(dev, level)
}

func LoggerWithContext(ctx context.Context, logger *slog.Logger) context.Context {
	return context.WithValue(ctx, loggerKey, logger)
}

func LoggerFromContext(ctx context.Context) *slog.Logger {
	if logger, ok := ctx.Value(loggerKey).(*slog.Logger); ok {
		return logger
	}
	return DefaultLogger()
}
