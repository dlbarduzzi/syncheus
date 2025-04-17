"use client"

import type { ReactNode } from "react"
import type { AppRouter } from "@/trpc/router/app"
import type { QueryClient } from "@tanstack/react-query"

import superjson from "superjson"

import { useState } from "react"
import { createTRPCContext } from "@trpc/tanstack-react-query"
import { QueryClientProvider } from "@tanstack/react-query"
import { createTRPCClient, httpBatchLink } from "@trpc/client"

import { env } from "@/env/client"
import { newQueryClient } from "./query-client"

const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>()

let browserQueryClient: QueryClient

function getQueryClient() {
  if (typeof window === "undefined") {
    return newQueryClient()
  }
  if (!browserQueryClient) {
    browserQueryClient = newQueryClient()
  }
  return browserQueryClient
}

function getUrl() {
  const base = (() => {
    return typeof window !== "undefined"
      ? ""
      : env.NEXT_PUBLIC_APP_URL
  })()
  return `${base}/api/trpc`
}

function TRPCReactProvider(props: Readonly<{ children: ReactNode }>) {
  const queryClient = getQueryClient()
  const [trpcClient] = useState(() => {
    return createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: getUrl(),
          transformer: superjson,
        }),
      ],
    })
  })
  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {props.children}
      </TRPCProvider>
    </QueryClientProvider>
  )
}

export { TRPCReactProvider, useTRPC }
