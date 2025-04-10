package syncheus

import (
	"log/slog"
	"sync"
)

type Syncheus struct {
	config *Config
	logger *slog.Logger
	wg     *sync.WaitGroup
}

func NewSyncheus(logger *slog.Logger, config *Config) (*Syncheus, error) {
	cfg, err := config.parse()
	if err != nil {
		return nil, err
	}
	return &Syncheus{
		config: cfg,
		logger: logger,
		wg:     &sync.WaitGroup{},
	}, nil
}

func (s *Syncheus) Port() int {
	return s.config.Port
}

func (s *Syncheus) Shutdown() {
	s.wg.Wait()
}
