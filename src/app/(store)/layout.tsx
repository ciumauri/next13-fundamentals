import { Header } from "@/components/header";
import { CartProvider } from "@/contexts/cart-context";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="mx-auto grid min-h-screen w-full max-w-[1600px] grid-rows-[min-content_max-content] gap-5 p-8">
        {/* Header */}
        <Header />
        {children}
      </div>
    </CartProvider>
  );
}
