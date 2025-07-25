/* eslint-disable @typescript-eslint/explicit-function-return-type */
"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/trpc/react";
import {
  AI_MODEL_LIST,
  CURRENCIES_LIST,
  PAYMENT_PROVIDERS_LIST,
  paymentProviderSettingsSchema,
  type PaymentProviderSettings,
} from "@/utils/schema/settings";

export function UpdatePaymentProviderSettingsForm() {
  const utils = api.useUtils();
  const [settings] = api.settings.paymentProvider.useSuspenseQuery();
  const update = api.settings.updatePaymentProvider.useMutation({
    onSuccess: async () => {
      toast.success("Success", {
        description: "Your AI model provider settings have been saved.",
      });

      await utils.settings.paymentProvider.invalidate();
    },
    onError: (error) => {
      toast.error("Uh oh! Something went wrong.", {
        description:
          error.message || "Failed to update settings. Please try again.",
        action: {
          label: "Try again",
          onClick: () => {
            update.mutate(form.getValues());
          },
        },
      });
    },
  });

  const form = useForm<PaymentProviderSettings>({
    resolver: zodResolver(paymentProviderSettingsSchema),
    defaultValues: settings,
  });

  useEffect(() => {
    if (settings) {
      form.reset(settings);
    }
  }, [form, settings]);

  async function onSubmit(data: PaymentProviderSettings) {
    update.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <h3 className="mb-4 text-lg font-medium">Payment Provider Settings</h3>
        <div className="space-y-4 rounded-lg border p-4">
          <FormField
            control={form.control}
            name="enabledProviders"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enabled Providers</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange([value])}
                  value={field.value?.[0]}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a payment provider" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PAYMENT_PROVIDERS_LIST.map((provider, i) => (
                      <SelectItem key={i} value={provider.key}>
                        {provider.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select a payment provider to enable
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="apiKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>API Key</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter API key for the selected model"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter the API key for{" "}
                  {
                    AI_MODEL_LIST.find(
                      (m) => m.key === form.watch("enabledProviders")[0],
                    )?.name
                  }
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("enabledProviders")[0] === "paypal" && (
            <FormField
              control={form.control}
              name="clientSecret"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Secret</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter PayPal client secret"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter your PayPal client secret for authentication
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Currency</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a currency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CURRENCIES_LIST.map((currency, i) => (
                      <SelectItem key={i} value={currency.code}>
                        {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the currency you want to use for payments.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="sm"
            variant="outline"
            disabled={
              update.isPending ||
              !form.formState.isValid ||
              !form.formState.isDirty
            }
          >
            {update.isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
