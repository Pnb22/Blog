import Link from "next/link";

async function getArtigos() {
  const data = await import("../data/artigos.json");
  return data.default;
}

export default async function Home() {
  const artigos = await getArtigos();

  return (
    <main>
      <h1>Blog de Viagens 🌍</h1>

      {artigos.map((artigo: any) => (
        <div key={artigo.slug}>
          <h2>{artigo.titulo}</h2>
          <p>{artigo.descricao}</p>

          <Link href={`/artigos/${artigo.slug}`}>
            Ler mais
          </Link>
        </div>
      ))}
    </main>
  );
}