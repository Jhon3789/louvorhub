"use client";

import LouvorCard from "./LouvorCard";

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
  louvores: Louvor[];
  onRemover: (id: number) => void;
};

export default function ListaLouvores({
  louvores,
  onRemover,
}: Props) {
  if (louvores.length === 0) {
    return (
      <div className="bg-zinc-800 rounded-xl p-6 text-center text-zinc-400">
        Nenhum louvor cadastrado.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {louvores.map((louvor) => (
        <LouvorCard
          key={louvor.id}
          louvor={louvor}
          onRemover={onRemover}
        />
      ))}
    </div>
  );
}