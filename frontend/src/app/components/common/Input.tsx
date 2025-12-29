import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-slate-700 mb-2 capitalize">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full px-4 py-2.5
              ${icon ? 'pl-10' : ''}
              bg-slate-50 border border-slate-300
              rounded-lg
              text-slate-900 placeholder-slate-500 text-sm
              transition-all duration-200
              focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:bg-white
              hover:border-slate-400
              disabled:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50
              ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
              ${className || ''}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-sm font-medium text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;