"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function saveSiteContent(blocks: any[]) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  // 1. Find the user's site
  const site = await prisma.site.findFirst({
    where: { userId: user.id }
  });

  if (!site) throw new Error("Site not found. Create a product first to generate your site.");

  // 2. Save the Blocks JSON to the database
  await prisma.site.update({
    where: { id: site.id },
    data: {
      content: blocks
    }
  });

  // 3. Refresh the live site so changes show up
  revalidatePath("/");
  return { success: true };
}