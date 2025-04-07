package syncheus

import "net/http"

func (s *Syncheus) Routes() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /api/v1/health", s.healthHandler)
	return mux
}
