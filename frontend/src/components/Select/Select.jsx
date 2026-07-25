import { cn } from '../../utils/cn';

export const Select = ({
  className,
  error,
  id,
  label,
  options,
  placeholder,
  ...props
}) => {
  return (
    <label className="block" htmlFor={id}>
      {label ? (
        <span className="mb-2 block text-sm font-semibold text-slate-700">
          {label}
        </span>
      ) : null}
      <select
        className={cn(
          'focus-ring h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 shadow-sm transition hover:border-slate-300',
          error && 'border-red-300 focus-visible:ring-red-500',
          className,
        )}
        id={id}
        {...props}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => {
          const value = typeof option === 'string' ? option : option.value;
          const labelText = typeof option === 'string' ? option : option.label;

          return (
            <option key={value} value={value}>
              {labelText}
            </option>
          );
        })}
      </select>
      {error ? <span className="mt-2 block text-sm text-red-600">{error}</span> : null}
    </label>
  );
};
