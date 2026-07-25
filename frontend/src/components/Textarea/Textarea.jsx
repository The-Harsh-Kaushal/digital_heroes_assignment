import { cn } from '../../utils/cn';

export const Textarea = ({ className, error, id, label, ...props }) => {
  return (
    <label className="block" htmlFor={id}>
      {label ? (
        <span className="mb-2 block text-sm font-semibold text-slate-700">
          {label}
        </span>
      ) : null}
      <textarea
        className={cn(
          'focus-ring min-h-32 w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 hover:border-slate-300',
          error && 'border-red-300 focus-visible:ring-red-500',
          className,
        )}
        id={id}
        {...props}
      />
      {error ? <span className="mt-2 block text-sm text-red-600">{error}</span> : null}
    </label>
  );
};
