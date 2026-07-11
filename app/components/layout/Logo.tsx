import { Cross } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3 mb-8">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600 shadow-lg shadow-violet-900/40">

        <Cross className="h-7 w-7 text-white" strokeWidth={2.5} />

      </div>

      <div>

        <h1 className="text-xl font-bold text-yellow-400">
          Louvor Quadrangular
        </h1>

        <p className="text-xs text-zinc-400">
          Ministério de Louvor
        </p>

      </div>

    </div>
  );
}