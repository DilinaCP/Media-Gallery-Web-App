import { LucideIcon } from 'lucide-react';

type StatsCardProps = {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary' | 'success';
};

export default function StatsCard({ 
  title, 
  value,
  icon: Icon,
  variant = 'primary'
}: StatsCardProps) {
  const gradients = {
    primary: 'from-purple-500 to-pink-500',
    secondary: 'from-blue-500 to-purple-500',
    success: 'from-emerald-500 to-teal-500'
  };

  const bgGradients = {
    primary: 'from-purple-50 to-pink-50',
    secondary: 'from-blue-50 to-purple-50',
    success: 'from-emerald-50 to-teal-50'
  };

  return (
    <div className={`bg-gradient-to-br ${bgGradients[variant]} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-white/50 group`}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-slate-600 text-sm uppercase tracking-widest font-semibold">
          {title}
        </h3>
        {Icon && (
          <div className={`p-3 rounded-lg bg-gradient-to-br ${gradients[variant]} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon size={20} />
          </div>
        )}
      </div>
      <span className={`text-4xl font-bold bg-gradient-to-r ${gradients[variant]} bg-clip-text text-transparent tracking-tight`}>
        {value}
      </span>
      <div className={`w-full h-1 rounded-full bg-gradient-to-r ${gradients[variant]} mt-4 shadow-lg`} />
    </div>
  );
}
