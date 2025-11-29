import { updateSettings } from "@/actions/settings";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function SettingsPage() {
  const user = await currentUser();
  
  if (!user) {
    return <div className="p-10">Please log in to view settings.</div>;
  }

  // Fetch existing settings so we can show the saved key (masked preferably, but raw for now)
  const site = await prisma.site.findFirst({
    where: { userId: user.id },
    include: { settings: true }
  });

  return (
    <div className="p-10 max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Store Settings</h1>
        <p className="text-gray-500">Configure your payments and preferences.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Crypto Payments (NOWPayments)</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updateSettings} className="space-y-4">
            <div className="space-y-2">
              <Label>API Key</Label>
              <Input 
                name="apiKey" 
                type="password" 
                placeholder="Paste your NOWPayments API Key here" 
                defaultValue={site?.settings?.nowPaymentsApiKey || ""}
              />
              <p className="text-xs text-gray-500">
                1. Go to <a href="https://nowpayments.io" target="_blank" className="underline text-blue-600">NOWPayments.io</a><br/>
                2. Sign up and copy your API Key from the Dashboard.<br/>
                3. Paste it above to accept Crypto.
              </p>
            </div>
            <Button type="submit">Save API Key</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}