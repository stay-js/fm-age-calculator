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
            'text-sm font-bold uppercase tracking-widest text-smokey-grey',
            (error || isRootError) && 'text-light-red',
          )}
        >
          {label}
        </label>

        <input
          className={cn(
            'rounded-lg border border-light-grey bg-transparent p-3 text-base font-bold focus:outline-purple lg:p-4 lg:text-[32px]',
            (error || isRootError) && 'border-light-red',
          )}
          type="text"
          id={id}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />

        {error && <span className="italic text-light-red">{error}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';
