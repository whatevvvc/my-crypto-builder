"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function updateSettings(formData: FormData) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const apiKey = formData.get("apiKey") as string;

  // 1. Find the user's site
  const site = await prisma.site.findFirst({
    where: { userId: user.id }
  });

  if (!site) throw new Error("Site not found. Create a product first to generate your site.");

  // 2. Save the API Key to the SiteSettings table
  // We use 'upsert' to either create it (if new) or update it (if exists)
  await prisma.siteSettings.upsert({
    where: { siteId: site.id },
    update: { nowPaymentsApiKey: apiKey },
    create: {
      siteId: site.id,
      nowPaymentsApiKey: apiKey,
    }
  });

  revalidatePath("/app/settings");
}