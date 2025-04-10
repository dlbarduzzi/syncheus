package syncheus

import (
	"bytes"
	"io"
	"log/slog"
	"net/http"
	"net/http/httptest"
	"testing"
)

func newTestSyncheus(t *testing.T) *Syncheus {
	t.Helper()
	return &Syncheus{
		logger: slog.New(slog.NewTextHandler(io.Discard, nil)),
	}
}

type testServer struct {
	*httptest.Server
}

func newTestServer(t *testing.T, h http.Handler) *testServer {
	t.Helper()
	srv := httptest.NewServer(h)
	return &testServer{srv}
}

func (s *testServer) get(t *testing.T, path string) (int, string) {
	res, err := s.Client().Get(s.URL + path)
	if err != nil {
		t.Fatal(err)
	}

	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		t.Fatal(err)
	}

	body = bytes.TrimSpace(body)
	return res.StatusCode, string(body)
}
