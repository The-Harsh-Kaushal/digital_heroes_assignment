import { cn } from '../../utils/cn';

export const Skeleton = ({ className }) => {
  return (
    <div className={cn('animate-pulse rounded-2xl bg-slate-200', className)} />
  );
};
