import { api } from "@/data/api";
import { Product } from "@/data/types/product";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return await response.json();
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    // Agora precisamos usar await com params
    const { slug } = await params;
    const product = await getProduct(slug);

    return {
      title: product.title,
      description: product.description,
      openGraph: {
        images: [product.image],
      },
    };
  } catch {
    return {
      title: "Produto não encontrado",
      description: "Descrição não disponível",
    };
  }
}

export async function generateStaticParams() {
  const response = await api("/products/featured");

  if (!response.ok) {
    return [];
  }

  const products: Product[] = await response.json();

  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    // Acesso assíncrono aos params
    const { slug } = await params;
    const product = await getProduct(slug);

    return (
      <div className="relative grid max-h-[860px] grid-cols-3">
        <div className="col-span-2 rounded-lg overflow-hidden flex justify-center items-end">
          <Image
            src={product.image}
            alt={product.title}
            width={920}
            height={920}
            quality={100}
            priority
          />
        </div>

        <div className="flex flex-col justify-center px-12">
          <h1 className="text-3xl font-bold leading-relaxed">
            {product.title}
          </h1>

          <p className="mt-2 leading-relaxed text-zinc-400">
            {product.description}
          </p>

          <div className="mt-8 flex items-center gap-3">
            <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>

            <span className="text-sm text-zinc-400">
              ou em até 12x de{" "}
              <span className="text-emerald-600 font-semibold">
                {(product.price / 12).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>{" "}
              sem juros
            </span>
          </div>

          <div className="mt-8 space-y-4">
            <span className="block font-semibold">Tamanhos</span>

            <div className="flex gap-2">
              {["P", "M", "G", "GG"].map((size) => (
                <button
                  key={size}
                  type="button"
                  className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold hover:bg-zinc-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <AddToCartButton productId={product.id} />
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
