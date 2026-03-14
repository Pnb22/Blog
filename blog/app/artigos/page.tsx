import Link from "next/link"
import artigos from "@/data/artigos.json"

export default function Home() {
  return (
    <main>
      <h1>Blog</h1>

      {artigos.map((artigo) => (
        <div key={artigo.slug}>
          <h2>{artigo.title}</h2>
          <p>{artigo.description}</p>

          <Link href={`/artigo/${artigo.slug}`}>
            Ler artigo
          </Link>
        </div>
      ))}
    </main>
  )
}