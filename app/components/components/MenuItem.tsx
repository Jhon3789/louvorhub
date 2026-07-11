import Link from "next/link";

type MenuItemProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
};

export default function MenuItem({
  href,
  icon,
  label,
  active = false,
}: MenuItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-300 ${
        active
          ? "bg-violet-600 text-white shadow-lg shadow-violet-900/40"
          : "bg-white/5 text-zinc-200 hover:bg-violet-600 hover:text-white hover:translate-x-1 hover:shadow-lg hover:shadow-violet-900/30"
      }`}
    >
      <span className="text-lg">{icon}</span>

      <span>{label}</span>
    </Link>
  );
}