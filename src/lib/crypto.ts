export async function createPayment(
  price_amount: number,
  price_currency: string,
  apiKey: string
) {
  const url = "https://api.nowpayments.io/v1/invoice";
  
  const payload = {
    price_amount,
    price_currency,
    pay_currency: "btc", // You can make this dynamic later
    order_description: "Crypto Purchase",
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    // Log the error for debugging
    const errorText = await response.text();
    console.error("NOWPayments Error:", errorText);
    throw new Error(`Payment creation failed: ${response.statusText}`);
  }

  return response.json();
}