package syncheus

import (
	"encoding/json"
	"net/http"
	"testing"
)

func TestHealthHandler(t *testing.T) {
	t.Parallel()

	app := newTestSyncheus(t)
	srv := newTestServer(t, app.Routes())
	defer srv.Close()

	code, body := srv.get(t, "/api/v1/health")
	if code != http.StatusOK {
		t.Fatalf("expected status code to be %d; got %d", http.StatusOK, code)
	}

	var res healthResponse

	if err := json.Unmarshal([]byte(body), &res); err != nil {
		t.Fatal(err)
	}

	if res.Ok != true {
		t.Errorf("expected response ok to be true; got %v", res.Ok)
	}

	msg := "API is healthy."

	if res.Message != msg {
		t.Errorf("expected response message to be %s; got %s", msg, res.Message)
	}
}
