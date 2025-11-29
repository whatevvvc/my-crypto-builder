import CheckoutButton from "@/components/CheckoutButton";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function SiteHomePage({
  params,
}: {
  params: Promise<{ domain: string }>; // <--- CHANGE 1: It's a Promise now
}) {
  // <--- CHANGE 2: We must "await" the params
  const resolvedParams = await params;
  const domain = decodeURIComponent(resolvedParams.domain);

  // 1. FREE TIER LOGIC: 
  const subdomain = domain.replace("/", "");

  // 2. Fetch the Site AND its Products
  const data = await prisma.site.findFirst({
    where: { 
      subdomain: subdomain 
    },
    include: {
      products: {
        orderBy: { createdAt: 'desc' }
      }
    },
  });

  if (!data) {
    return (
        <div className="flex h-screen items-center justify-center flex-col gap-2">
            <h1 className="text-2xl font-bold">Store "{subdomain}" not found</h1>
            <p className="text-gray-500">Try creating a product in the dashboard first.</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="bg-white border-b p-6 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold">{data.name}</h1>
                <p className="text-slate-500">{data.description || "Welcome to my crypto store"}</p>
            </div>
            <Button>View Cart (0)</Button>
        </div>
      </header>
      
      {/* PRODUCT GRID */}
      <main className="max-w-5xl mx-auto p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.products.length === 0 ? (
                <p className="text-gray-500 col-span-3 text-center py-20">No products available yet.</p>
            ) : (
                data.products.map((product) => (
                    <Card key={product.id} className="hover:shadow-lg transition-shadow duration-300">
                        <div className="h-48 bg-slate-200 w-full rounded-t-xl animate-pulse" /> {/* Placeholder Image */}
                        <CardHeader>
                            <CardTitle>{product.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-lg text-green-700">${product.price}</span>
                                <CheckoutButton 
    productId={product.id} 
    siteId={data.id} 
    price={product.price} 
/>
                            </div>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
      </main>
    </div>
  );
}