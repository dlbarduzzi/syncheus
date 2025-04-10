package jsonfy

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestWriteJson(t *testing.T) {
	t.Parallel()

	res := map[string]interface{}{"foo": "bar"}

	key := "Foo"
	value := "Bar"

	headers := http.Header{}
	headers.Add(key, value)

	w := httptest.NewRecorder()

	err := WriteJson(w, res, http.StatusOK, headers)
	if err != nil {
		t.Errorf("expected error to be nil; got %v", err)
	}

	if w.Code != http.StatusOK {
		t.Errorf("expected status code to be %d; got %d", http.StatusOK, w.Code)
	}

	header := w.Header().Get(key)
	if header != value {
		t.Errorf("expected header %s to be %s; got %s", key, value, header)
	}
}
