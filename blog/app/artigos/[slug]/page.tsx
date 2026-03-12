import artigos from "../../../data/artigos.json"

export async function generateStaticParams() {
  return artigos.map((artigo) => ({
    slug: artigo.slug
  }))
}

export async function generateMetadata({ params }) {
  const artigo = artigos.find((a) => a.slug === params.slug)

  return {
    title: artigo?.titulo,
    description: artigo?.descricao
  }
}

export default function Artigo({ params }) {

  const artigo = artigos.find(
    (a) => a.slug === params.slug
  )

  return (
    <article>
      <h1>{artigo?.titulo}</h1>
      <p>Autor: {artigo?.autor}</p>
      <p>Data: {artigo?.data}</p>

      <p>{artigo?.conteudo}</p>
    </article>
  )
}