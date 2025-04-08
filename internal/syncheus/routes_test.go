package syncheus

import "testing"

func TestRoutes(t *testing.T) {
	t.Parallel()

	app := newTestSyncheus(t)
	srv := newTestServer(t, app.Routes())
	defer srv.Close()

	routes := app.Routes()
	if routes == nil {
		t.Fatal("expected routes not to be nil")
	}
}
