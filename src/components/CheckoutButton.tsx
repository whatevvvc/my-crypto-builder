"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface CheckoutButtonProps {
  productId: string;
  siteId: string;
  price: number;
}

export default function CheckoutButton({ productId, siteId, price }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // 1. Call our API
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, siteId }),
      });

      const data = await res.json();

      // 2. If valid, send user to NOWPayments
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Payment setup incomplete: Merchant needs to add API Key.");
      }
    } catch (error) {
      alert("Checkout failed. See console.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
        onClick={handleCheckout} 
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white"
    >
      {loading ? (
        <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
        </>
      ) : (
        `Buy for $${price}`
      )}
    </Button>
  );
}