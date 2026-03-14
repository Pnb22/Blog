import artigosData from "@/data/artigos.json"
import { notFound } from "next/navigation"

type Artigo = {
  slug: string
  titulo: string
  descricao: string
  autor: string
  data: string
  conteudo: string
}

const artigos = artigosData as unknown as Artigo[]

export async function generateStaticParams() {
  return artigos.map((artigo) => ({
    slug: artigo.slug
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const artigo = artigos.find((a) => a.slug === params.slug)

  return {
    title: artigo?.titulo,
    description: artigo?.descricao
  }
}

export default function Artigo({ params }: { params: { slug: string } }) {
  const artigo = artigos.find((a) => a.slug === params.slug)

  if (!artigo) {
    notFound()
  }

  return (
    <article>
      <h1>{artigo.titulo}</h1>
      <p>Autor: {artigo.autor}</p>
      <p>Data: {artigo.data}</p>
      <p>{artigo.conteudo}</p>
    </article>
  )
}