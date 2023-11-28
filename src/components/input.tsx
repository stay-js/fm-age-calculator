import { forwardRef, useId } from 'react';
import { cn } from '~/utils/cn';

type Props = {
  label: string;
  placeholder: string;
  error?: string;
  isRootError: boolean;
};

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, placeholder, error, isRootError, ...props }, ref) => {
    const id = useId();

    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={id}
          className={cn(
            'text-smokey-grey text-sm font-bold uppercase tracking-widest',
            (error || isRootError) && 'text-light-red',
          )}
        >
          {label}
        </label>

        <input
          className={cn(
            'border-light-grey focus:outline-purple rounded-lg border bg-transparent p-3 text-base font-bold lg:p-4 lg:text-[32px]',
            (error || isRootError) && 'border-light-red',
          )}
          type="text"
          id={id}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />

        {error && <span className="text-light-red italic">{error}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';
