import { LoaderCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

export const Loader = ({ className, label = 'Loading' }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-sm font-semibold text-slate-600',
        className,
      )}
    >
      <LoaderCircle className="h-4 w-4 animate-spin text-brand-600" />
      {label}
    </span>
  );
};
