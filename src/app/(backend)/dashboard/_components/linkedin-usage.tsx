"use client";

import { Linkedin } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/react";

export default function LinkedinUsage({
  isSiteWide = false,
}: {
  isSiteWide?: boolean;
}): JSX.Element {
  const [data] = api.generations.getLinkedinStats.useSuspenseQuery({
    isSiteWide,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          LinkedIn Generations
        </CardTitle>
        <Linkedin className="text-muted-foreground size-4" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data.total.toLocaleString()}</div>
        <p className="text-muted-foreground text-xs">
          {`${data.percentageChange > 0 ? "+" : ""}${data.percentageChange.toFixed(1)}%`}{" "}
          from last month
        </p>
      </CardContent>
    </Card>
  );
}
