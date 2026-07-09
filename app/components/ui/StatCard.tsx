type StatCardProps = {
  title: string;
  value: number | string;
  icon: string;
  subtitle?: string;
};

export default function StatCard({
  title,
  value,
  icon,
  subtitle,
}: StatCardProps) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10">
      <div className="flex items-center justify-between">
        <div className="text-4xl">{icon}</div>

        <div className="text-right">
          <p className="text-3xl font-bold">{value}</p>
        </div>
      </div>

      <h3 className="mt-5 text-lg font-semibold">
        {title}
      </h3>

      {subtitle && (
        <p className="mt-1 text-sm text-zinc-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}