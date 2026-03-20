import { notFound } from "next/navigation";

async function getArtigos() {
  const data = await import("../../../data/artigos.json");
  return data.default;
}

export async function generateStaticParams() {
  const artigos = await getArtigos();

  return artigos.map((artigo: any) => ({
    slug: artigo.slug,
  }));
}

export async function generateMetadata({ params }: any) {
  const artigos = await getArtigos();
  const artigo = artigos.find((a: any) => a.slug === params.slug);

  return {
    title: artigo?.titulo,
    description: artigo?.descricao,
  };
}

export default async function Page({ params }: any) {
  const artigos = await getArtigos();
  const artigo = artigos.find((a: any) => a.slug === params.slug);

  if (!artigo) return notFound();

  return (
    <main>
      <h1>{artigo.titulo}</h1>
      <p>{artigo.conteudo}</p>
    </main>
  );
}