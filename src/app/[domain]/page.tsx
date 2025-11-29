import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function SiteHomePage({
  params,
}: {
  params: { domain: string };
}) {
  // 1. Get the domain from the URL (e.g. "coolshoes")
  const domain = decodeURIComponent(params.domain);

  // 2. Fetch data (Simulated for now, we will connect real DB later)
  // For now, let's just show what domain we are on.
  
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b p-6">
        <h1 className="text-3xl font-bold capitalize">{domain} Store</h1>
        <p className="text-gray-500">Powered by Crypto Builder</p>
      </header>
      
      <main className="grid grid-cols-1 gap-6 p-10 md:grid-cols-3">
        {/* Placeholder Products */}
        {[1, 2, 3].map((i) => (
           <div key={i} className="rounded-lg border p-4 shadow-sm transition hover:shadow-md">
              <div className="h-40 w-full rounded bg-gray-100 mb-4"></div>
              <h2 className="text-xl font-semibold">Test Product {i}</h2>
              <p className="mt-2 font-bold text-green-600">$100.00 USD</p>
           </div>
        ))}
      </main>
    </div>
  );
}