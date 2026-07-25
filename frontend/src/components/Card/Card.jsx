import { cn } from '../../utils/cn';

export const Card = ({ children, className }) => {
  return (
    <div
      className={cn(
        'rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/70',
        className,
      )}
    >
      {children}
    </div>
  );
};
