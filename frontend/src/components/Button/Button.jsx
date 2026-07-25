import { LoaderCircle } from 'lucide-react';
import { cloneElement, isValidElement } from 'react';
import { cn } from '../../utils/cn';

const variants = {
  primary:
    'bg-brand-600 text-white shadow-lg shadow-blue-200/70 hover:bg-brand-700',
  secondary:
    'border border-slate-200 bg-white text-slate-800 shadow-sm hover:border-brand-100 hover:bg-brand-50',
  ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
  danger: 'bg-red-600 text-white shadow-lg shadow-red-200/70 hover:bg-red-700',
};

const sizes = {
  sm: 'h-10 px-3 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
};

export const Button = ({
  asChild = false,
  children,
  className,
  disabled,
  fullWidth = false,
  icon: Icon,
  isLoading = false,
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...props
}) => {
  const buttonClassName = cn(
    'focus-ring inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className,
  );
  const content = (
    <>
      {isLoading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
      {!isLoading && Icon ? <Icon className="h-4 w-4" /> : null}
      {asChild && isValidElement(children) ? children.props.children : children}
    </>
  );

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ...props,
      'aria-disabled': disabled || isLoading ? true : undefined,
      className: cn(buttonClassName, children.props.className),
      children: content,
      onClick:
        disabled || isLoading
          ? (event) => {
              event.preventDefault();
            }
          : props.onClick || children.props.onClick,
    });
  }

  return (
    <button
      className={buttonClassName}
      disabled={disabled || isLoading}
      type={type}
      {...props}
    >
      {content}
    </button>
  );
};
