package syncheus

import (
	"net/http"

	"github.com/dlbarduzzi/syncheus/internal/jsonfy"
)

func (s Syncheus) healthHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodHead {
		w.WriteHeader(http.StatusOK)
		return
	}

	type healthResponse struct {
		Ok      bool   `json:"ok"`
		Message string `json:"message"`
	}

	res := healthResponse{
		Ok:      true,
		Message: "API is healthy.",
	}

	if err := jsonfy.WriteJson(w, http.StatusOK, res, nil); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}
