import superjson from "superjson"

import {
  QueryClient,
  defaultShouldDehydrateQuery,
} from "@tanstack/react-query"

export function newQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
      },
      dehydrate: {
        serializeData: superjson.serialize,
        shouldDehydrateQuery: query => {
          return defaultShouldDehydrateQuery(query) || query.state.status === "pending"
        },
      },
      hydrate: {
        deserializeData: superjson.deserialize,
      },
    },
  })
}
