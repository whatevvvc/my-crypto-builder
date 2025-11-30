"use client"; 

// NOTE: We switched to "use client" because we need state for the image upload
// This means we need to fetch data differently or separate the form.
// For simplicity, we will keep the list server-side in a separate component conceptually,
// but for this specific file, we'll make the whole page client-side for the MVP.

import { createProduct } from "@/actions/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UploadButton } from "@/lib/uploadthing";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    // Append the image URL to the form data manually
    formData.append("imageUrl", imageUrl);
    await createProduct(formData);
    
    // Reset and refresh
    setImageUrl("");
    router.refresh();
    alert("Product Created!");
  }

  return (
    <div className="p-10 max-w-4xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold">Inventory</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT COLUMN: Create New Product */}
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 1. IMAGE UPLOAD */}
            <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
                {imageUrl ? (
                    <img src={imageUrl} alt="Product" className="h-32 object-cover rounded mb-4" />
                ) : (
                    <div className="mb-4 text-sm text-gray-500">No image selected</div>
                )}
                
                <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        setImageUrl(res[0].url);
                        alert("Upload Completed");
                    }}
                    onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`);
                    }}
                />
            </div>

            {/* 2. FORM DETAILS */}
            <form action={handleSubmit} className="space-y-4">
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

              <Button type="submit" className="w-full" disabled={!imageUrl}>
                {imageUrl ? "Create Product" : "Upload Image First"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* RIGHT COLUMN: Instructions (We removed the list for Client Component simplicity) */}
        <div className="space-y-4">
            <Card>
                <CardHeader><CardTitle>Pro Tip</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-gray-500">
                        Upload an image first. Once the upload finishes, the "Create Product" button will unlock.
                        <br /><br />
                        Your products will appear instantly on your public store.
                    </p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}