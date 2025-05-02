import { ImageResponse } from "next/og";
import colors from "tailwindcss/colors";
import { api } from "@/data/api";
import { Product } from "@/data/types/product";
import { env } from "@/env";

export const runtime = "edge";
export const alt = "Imagem do Produto";
export const contentType = "image/png";

async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 15, // 15 minutes
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return await response.json();
}

export default async function OgImage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    // Acesso assíncrono aos params conforme Next.js 15+
    const { slug } = await params;
    const product = await getProduct(slug);
    const productImageURL = new URL(product.image, env.APP_URL).toString();

    return new ImageResponse(
      (
        <div
          style={{
            background: colors.zinc[950],
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Usando img padrão em vez de next/image para OG */}
          <img
            src={productImageURL}
            alt={product.title}
            style={{ width: "100%" }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
        // Opções adicionais disponíveis no novo modelo:
        emoji: "twemoji",
        headers: {
          "Cache-Control": "public, max-age=3600",
        },
      }
    );
  } catch (error) {
    // Fallback para caso de erro
    return new ImageResponse(
      (
        <div
          style={{
            background: colors.zinc[950],
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 48,
            fontWeight: "bold",
          }}
        >
          Produto não encontrado
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }
}
