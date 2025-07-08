/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useQuery } from "@tanstack/react-query";

import { authClient } from "@/server/auth/client";

export function useListSessions() {
  return useQuery({
    queryKey: ["listSessions"],
    queryFn: async () => {
      return await authClient.listSessions({ fetchOptions: { throw: true } });
    },
  });
}
