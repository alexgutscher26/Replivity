/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppearanceForm } from "@/app/(backend)/dashboard/settings/appearance/_components/appearance-form";
import { Separator } from "@/components/ui/separator";

export default function SettingsAppearancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-muted-foreground text-sm">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>
      <Separator />
      <AppearanceForm />
    </div>
  );
}
