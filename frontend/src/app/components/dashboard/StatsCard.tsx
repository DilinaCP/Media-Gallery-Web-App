type StatsCardProps = {
  title: string;
  value: string | number;
};

export default function StatsCard({ title, value }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
      <h3 className="text-gray-500 text-sm uppercase tracking-wide">
        {title}
      </h3>
      <span className="text-3xl font-bold text-gray-900">
        {value}
      </span>
    </div>
  );
}
