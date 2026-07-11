type UserCardProps = {
  email: string;
  nivel: string;
};

export default function UserCard({ email, nivel }: UserCardProps) {
  return (
    <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-4">

      <p className="truncate text-sm text-zinc-300">
        📧 {email}
      </p>

      <div className="mt-3">

        <span className="rounded-full bg-violet-600/20 px-3 py-1 text-xs font-medium text-violet-300">

          {nivel === "admin" ? "👑 Administrador" : "👤 Membro"}

        </span>

      </div>

    </div>
  );
}