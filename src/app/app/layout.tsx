import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Settings, LogIn } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-white border-r">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold">CryptoBuilder</h1>
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/app" className="flex items-center gap-3 p-3 rounded hover:bg-gray-50 text-gray-700">
            <LayoutDashboard size={20} />
            Builder
          </Link>
          <Link href="/app/products" className="flex items-center gap-3 p-3 rounded hover:bg-gray-50 text-gray-700">
            <ShoppingBag size={20} />
            Products
          </Link>
          <Link href="/app/settings" className="flex items-center gap-3 p-3 rounded hover:bg-gray-50 text-gray-700">
            <Settings size={20} />
            Settings
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="h-16 bg-white border-b flex items-center justify-end px-8">
          {/* If user is logged in, show their Avatar */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          {/* If user is NOT logged in, show Sign In button */}
          <SignedOut>
            <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">Merchant Access:</p>
                <SignInButton mode="modal">
                    <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
                        <LogIn size={16} />
                        Sign In
                    </button>
                </SignInButton>
            </div>
          </SignedOut>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}