import { cn } from '../../utils/cn';

export const Input = ({
  className,
  error,
  icon: Icon,
  id,
  label,
  type = 'text',
  ...props
}) => {
  return (
    <label className="block" htmlFor={id}>
      {label ? (
        <span className="mb-2 block text-sm font-semibold text-slate-700">
          {label}
        </span>
      ) : null}
      <span className="relative block">
        {Icon ? (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        ) : null}
        <input
          className={cn(
            'focus-ring h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 hover:border-slate-300',
            Icon && 'pl-10',
            error && 'border-red-300 focus-visible:ring-red-500',
            className,
          )}
          id={id}
          type={type}
          {...props}
        />
      </span>
      {error ? <span className="mt-2 block text-sm text-red-600">{error}</span> : null}
    </label>
  );
};
