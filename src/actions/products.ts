"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";

export async function createProduct(formData: FormData) {
  // 1. Get the Real User from Clerk
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be logged in to create products");
  }

  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const description = formData.get("description") as string;
  // --- NEW: Get the image URL ---
  const imageUrl = formData.get("imageUrl") as string; 
  
  // 2. Sync Clerk User to Our Database
  await prisma.user.upsert({
    where: { email: user.emailAddresses[0].emailAddress },
    update: {},
    create: {
      id: user.id,
      email: user.emailAddresses[0].emailAddress,
      name: user.firstName,
    }
  });

  // 3. Find THIS user's site
  const site = await prisma.site.findFirst({
    where: { userId: user.id }
  });

  if (!site) {
    // SCENARIO A: User has no site. Create Site + Product.
    await prisma.site.create({
      data: {
        name: `${user.firstName}'s Store`,
        subdomain: user.username || `store-${user.id.slice(0,5)}`,
        userId: user.id,
        products: {
          create: { 
            name, 
            price, 
            description,
            image: imageUrl // <--- ADDED HERE
          }
        }
      }
    });
  } else {
    // SCENARIO B: User has a site. Just create Product.
    await prisma.product.create({
      data: {
        name,
        price,
        description,
        image: imageUrl, // <--- ADDED HERE
        siteId: site.id,
      },
    });
  }

  revalidatePath("/app/products");
}