package syncheus

import (
	"log/slog"
	"sync"
)

type Syncheus struct {
	logger *slog.Logger
	wg     *sync.WaitGroup
}

func NewSyncheus(logger *slog.Logger) (*Syncheus, error) {
	return &Syncheus{
		logger: logger,
		wg:     &sync.WaitGroup{},
	}, nil
}

func (s *Syncheus) Shutdown() {
	s.wg.Wait()
}
