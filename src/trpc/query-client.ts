/* eslint-disable import/no-named-as-default-member */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";
// eslint-disable-next-line import/no-named-as-default
import SuperJSON from "superjson";

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 30 * 1000,
      },
      dehydrate: {
        serializeData: SuperJSON.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        deserializeData: SuperJSON.deserialize,
      },
    },
  });
