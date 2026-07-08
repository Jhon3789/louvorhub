"use client";

type Louvor = {
  id: number;
  nome: string;
  artista: string;
  tom: string;
  link: string;
  cifra: string;
  letra: string;
};

type Props = {
  louvor: Louvor;
  onRemover: (id: number) => void;
};

export default function LouvorCard({
  louvor,
  onRemover,
}: Props) {
  return (
    <div className="bg-zinc-800 rounded-xl p-6 shadow">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            🎵 {louvor.nome}
          </h2>

          <p className="text-zinc-400 mt-1">
            🎤 {louvor.artista}
          </p>

          <p className="text-zinc-400">
            🎼 Tom: {louvor.tom}
          </p>

        </div>

        <button
          onClick={() => onRemover(louvor.id)}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
        >
          Remover
        </button>

      </div>

      {louvor.link && (
        <div className="mt-4">
          <a
            href={louvor.link}
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 underline"
          >
            ▶ Abrir no YouTube
          </a>
        </div>
      )}

      <div className="mt-6">

        <h3 className="font-bold text-lg">
          📝 Letra
        </h3>

        <p className="whitespace-pre-line text-zinc-300 mt-2">
          {louvor.letra}
        </p>

      </div>

      <div className="mt-6">

        <h3 className="font-bold text-lg">
          🎸 Cifra
        </h3>

        <p className="whitespace-pre-line text-zinc-300 mt-2">
          {louvor.cifra}
        </p>

      </div>

    </div>
  );
}