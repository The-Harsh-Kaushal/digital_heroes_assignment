import { cn } from '../../utils/cn';

const badgeStyles = {
  new: 'bg-blue-50 text-blue-700 ring-blue-100',
  contacted: 'bg-amber-50 text-amber-700 ring-amber-100',
  closed: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
};

export const StatusBadge = ({ status }) => {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-3 py-1 text-xs font-black capitalize ring-1',
        badgeStyles[status] || 'bg-slate-100 text-slate-700 ring-slate-200',
      )}
    >
      {status}
    </span>
  );
};
