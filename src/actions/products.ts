"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: FormData) {
  // 1. Get data from the form
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const description = formData.get("description") as string;
  
  // HARDCODED DEMO USER
  const userId = "user_123"; 
  const userEmail = "demo@example.com";

  // === FIX STARTS HERE ===
  // 2. Ensure this User actually exists in the DB before linking a site
  // "upsert" means: Update if exists, Insert if new.
  await prisma.user.upsert({
    where: { email: userEmail },
    update: {},
    create: {
      id: userId,
      email: userEmail,
      name: "Demo Merchant",
    }
  });
  // === FIX ENDS HERE ===

  // 3. Find the user's site
  const site = await prisma.site.findFirst({
    where: { userId: userId }
  });

  if (!site) {
    // 4. Create Site (Now safe because User exists)
    await prisma.site.create({
      data: {
        name: "My First Store",
        subdomain: "demo",
        userId: userId,
        products: {
          create: {
            name,
            price,
            description,
          }
        }
      }
    });
  } else {
    // 5. Add product to existing site
    await prisma.product.create({
      data: {
        name,
        price,
        description,
        siteId: site.id,
      },
    });
  }

  revalidatePath("/app/products");
}