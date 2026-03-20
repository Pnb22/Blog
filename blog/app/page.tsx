import Link from "next/link";

async function getArtigos() {
  const data = await import("../data/artigos.json");
  return data.default;
}

export default async function Home() {
  const artigos = await getArtigos();

  return (
    <main className="max-w-5xl mx-auto p-4 md:p-8">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10">
        Blog de Viagens 🌍
      </h1>

      <div className="space-y-6">
        {artigos.map((artigo: any) => (
          <Link
            key={artigo.slug}
            href={`/artigos/${artigo.slug}`}
            className="block border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden"
          >
            <article className="p-0">
              {artigo.imagem && (
                <img
                  src={artigo.imagem}
                  alt={artigo.titulo}
                  className="w-full h-56 object-cover"
                />
              )}

              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{artigo.titulo}</h2>
                <p className="text-slate-600 mb-4">{artigo.descricao}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">{artigo.autor} • {new Date(artigo.data).toLocaleDateString('pt-BR')}</span>
                  <span className="text-blue-600 font-semibold hover:text-blue-800">Saiba mais →</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}