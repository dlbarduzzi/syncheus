package jsonfy

import (
	"encoding/json"
	"net/http"
)

func WriteJson(w http.ResponseWriter, data interface{}, code int, headers http.Header) error {
	res, err := json.Marshal(data)
	if err != nil {
		return err
	}

	res = append(res, '\n')

	for key, value := range headers {
		w.Header()[key] = value
	}

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(code)

	if _, err := w.Write(res); err != nil {
		return err
	}

	return nil
}
