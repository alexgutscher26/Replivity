/* eslint-disable @typescript-eslint/explicit-function-return-type */
"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { authClient } from "@/server/auth/client";

export default function SignOutForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    await authClient.signOut({
      fetchOptions: {
        onRequest: () => setLoading(true),
        onResponse: () => setLoading(false),
        onSuccess: () => {
          router.refresh();
        },
        onError: ({ error }) => {
          alert(error.message);
        },
      },
    });
  };
  return (
    <button onClick={handleClick} className="text-sm text-gray-100">
      {loading ? (
        <span className="relative">Signing out...</span>
      ) : (
        <span className="relative">Sign out</span>
      )}
    </button>
  );
}
