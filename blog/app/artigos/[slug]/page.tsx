import Link from "next/link";
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

  const formatDate = new Date(artigo.data).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <main className="max-w-5xl mx-auto p-4 md:p-8">
      <article className="border border-slate-200 rounded-2xl p-6 shadow-sm bg-white">
        <h1 className="text-4xl font-bold mb-4">{artigo.titulo}</h1>

        <div className="mb-6 text-slate-600 text-sm sm:text-base">
          <span className="font-medium">Autor:</span> {artigo.autor}
          <span className="mx-2">|</span>
          <span className="font-medium">Data:</span> {formatDate}
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_320px] items-start">
          <div className="text-slate-700 leading-relaxed text-base sm:text-lg">
            <p>{artigo.conteudo}</p>
          </div>

          {artigo.imagem && (
            <img
              src={artigo.imagem}
              alt={artigo.titulo}
              className="w-full h-[220px] object-cover rounded-xl border border-slate-200"
            />
          )}
        </div>

        <div className="mt-6">
          <Link href="/" className="text-blue-600 font-semibold hover:text-blue-800">
            ← Voltar para o blog
          </Link>
        </div>
      </article>
    </main>
  );
}