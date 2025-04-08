package syncheus

import (
	"net/http"

	"github.com/dlbarduzzi/syncheus/internal/jsonfy"
)

type healthResponse struct {
	Ok      bool   `json:"ok"`
	Message string `json:"message"`
}

func (s Syncheus) healthHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodHead {
		w.WriteHeader(http.StatusOK)
		return
	}

	res := healthResponse{
		Ok:      true,
		Message: "API is healthy.",
	}

	if err := jsonfy.WriteJson(w, res, http.StatusOK, nil); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}
