import { createAuthHooks } from "@daveyplate/better-auth-tanstack";

import { authClient } from "@/server/auth/client";

export const {
  useSession,
  usePrefetchSession,
  useToken,
  useListAccounts,
  useListSessions,
  useListDeviceSessions,
  useListPasskeys,
  useDeletePasskey,
  useUnlinkAccount,
  useRevokeDeviceSession,
  useRevokeSession,
  useRevokeOtherSessions,
  useRevokeSessions,
  useSetActiveSession,
  useUpdateUser,
} = createAuthHooks(authClient);
