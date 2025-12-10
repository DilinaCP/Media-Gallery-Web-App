type StatsCardProps = {
  title: string;
  value: string | number;
};

export default function StatsCard({ title, value }: StatsCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col gap-3 border border-gray-100">
      <h3 className="text-gray-500 text-xs uppercase tracking-widest font-medium">
        {title}
      </h3>
      <span className="text-3xl font-extrabold text-gray-900 tracking-tight">
        {value}
      </span>
      <div className="w-full h-1 rounded-full bg-linear-to-r from-indigo-500 to-purple-500 opacity-70" />
    </div>
  );
}
