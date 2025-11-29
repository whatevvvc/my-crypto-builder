import prisma from "@/lib/prisma";
import { createProduct } from "@/actions/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default async function ProductsPage() {
  // 1. Fetch all products from the database
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-10 max-w-4xl mx-auto space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Inventory</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT COLUMN: Create New Product */}
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createProduct} className="space-y-4">
              <div className="space-y-2">
                <Label>Product Name</Label>
                <Input name="name" placeholder="e.g. Bitcoin T-Shirt" required />
              </div>
              
              <div className="space-y-2">
                <Label>Price (USD)</Label>
                <Input name="price" type="number" step="0.01" placeholder="0.00" required />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Input name="description" placeholder="Product details..." />
              </div>

              <Button type="submit" className="w-full">Create Product</Button>
            </form>
          </CardContent>
        </Card>

        {/* RIGHT COLUMN: List of Products */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Items</h2>
          {products.length === 0 ? (
            <p className="text-gray-500">No products yet.</p>
          ) : (
            products.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">${product.price}</p>
                    <p className="text-xs text-gray-400">USD</p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}