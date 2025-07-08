/* eslint-disable @typescript-eslint/explicit-function-return-type */
"use client";

import { useEffect, useState, type ComponentProps } from "react";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) return;

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
