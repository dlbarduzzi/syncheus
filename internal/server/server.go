package server

import (
	"context"
	"errors"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

type Server struct {
	port       int
	logger     *slog.Logger
	onShutdown []func()
}

func NewServer(port int, logger *slog.Logger) *Server {
	return &Server{
		port:       port,
		logger:     logger,
		onShutdown: make([]func(), 0),
	}
}

func (s *Server) Start(ctx context.Context, handler http.Handler) error {
	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", s.port),
		Handler:      handler,
		IdleTimeout:  time.Second * 60,
		ReadTimeout:  time.Second * 10,
		WriteTimeout: time.Second * 30,
	}

	shutdownErr := make(chan error)

	go func() {
		quit := make(chan os.Signal, 1)
		signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

		inSignal := <-quit
		s.logger.Info("server received shutdown signal", slog.String("signal", inSignal.String()))

		if len(s.onShutdown) > 0 {
			s.logger.Info("server completing background tasks...")
		}

		for _, fn := range s.onShutdown {
			fn()
		}

		ctx, cancel := context.WithTimeout(ctx, time.Second*30)
		defer cancel()

		err := server.Shutdown(ctx)
		if err != nil {
			shutdownErr <- err
		}

		shutdownErr <- nil
	}()

	s.logger.Info("server starting", slog.Int("port", s.port))

	err := server.ListenAndServe()
	if !errors.Is(err, http.ErrServerClosed) {
		return err
	}

	err = <-shutdownErr
	if err != nil {
		return err
	}

	s.logger.Info("server stopped")

	return nil
}

func (s *Server) OnShutdown(fn func()) {
	s.onShutdown = append(s.onShutdown, fn)
}
