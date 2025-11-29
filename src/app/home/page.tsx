import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-black text-white p-4 text-center">
      <h1 className="text-6xl font-bold tracking-tighter mb-4">Crypto Builder</h1>
      <p className="text-xl text-zinc-400 mb-8 max-w-lg">
        The ultimate platform to build your crypto store. 
        Accept Bitcoin, modify your site, and own your data.
      </p>

      <div className="flex gap-4">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-white text-black px-8 py-3 rounded font-bold hover:bg-zinc-200 transition">
              Start Building
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <Link href="/app">
            <button className="bg-green-600 text-white px-8 py-3 rounded font-bold hover:bg-green-700 transition">
              Go to Dashboard
            </button>
          </Link>
        </SignedIn>
      </div>
    </div>
  );
}