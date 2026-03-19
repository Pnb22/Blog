import styles from "./artigo.module.css";
import { notFound } from "next/navigation";

async function getArtigos() {
  const data = await import("../../data/artigos.json");
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

export default async function Artigo({ params }: any) {
  const artigos = await getArtigos();
  const artigo = artigos.find((a: any) => a.slug === params.slug);

  if (!artigo) return notFound();

  return (
    <main className={styles.container}>
      <h1>{artigo.titulo}</h1>

      <p><strong>Autor:</strong> {artigo.autor}</p>
      <p><strong>Data:</strong> {artigo.data}</p>

      <div className={styles.content}>
        <p>{artigo.conteudo}</p>

        <img
          src="https://source.unsplash.com/400x300/?paris"
          alt="imagem viagem"
          className={styles.image}
        />
      </div>
    </main>
  );
}