package main

import (
	"github.com/dlbarduzzi/syncheus/internal/logging"
)

func main() {
	logger := logging.NewLoggerFromEnv()
	logger.Info("Welcome to Syncheus")
}
