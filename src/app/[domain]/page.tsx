import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CheckoutButton from "@/components/CheckoutButton";

export default async function SiteHomePage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const resolvedParams = await params;
  const domain = decodeURIComponent(resolvedParams.domain);
  const subdomain = domain.replace("/", "");

  const data = await prisma.site.findFirst({
    where: { subdomain: subdomain },
    include: {
      products: { orderBy: { createdAt: 'desc' } }
    },
  });

  if (!data) return <div className="p-10 text-center">Store not found</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b p-6 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900">{data.name}</h1>
            <p className="text-slate-500">{data.description || "Welcome to my crypto store"}</p>
        </div>
      </header>
      
      <main className="max-w-5xl mx-auto p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.products.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="relative h-64 w-full bg-white">
                        {product.image ? (
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="h-full w-full object-contain p-4"
                            />
                        ) : (
                            <div className="h-full w-full bg-slate-100 flex items-center justify-center text-slate-400">
                                No Image
                            </div>
                        )}
                    </div>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-slate-600 text-sm mb-4 min-h-[40px] line-clamp-2">{product.description}</p>
                        <div className="flex justify-between items-center mt-4">
                            <span className="font-bold text-xl text-green-700">${product.price}</span>
                            <CheckoutButton 
                                productId={product.id} 
                                siteId={data.id} 
                                price={product.price} 
                            />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      </main>
    </div>
  );
}