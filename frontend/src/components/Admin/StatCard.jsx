import { cn } from '../../utils/cn';

export const StatCard = ({ icon: Icon, label, value, tone = 'blue' }) => {
  const tones = {
    blue: 'bg-blue-50 text-blue-700',
    amber: 'bg-amber-50 text-amber-700',
    emerald: 'bg-emerald-50 text-emerald-700',
    slate: 'bg-slate-100 text-slate-700',
  };

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/70">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-black text-slate-950">{value}</p>
        </div>
        <div className={cn('grid h-12 w-12 place-items-center rounded-2xl', tones[tone])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};
