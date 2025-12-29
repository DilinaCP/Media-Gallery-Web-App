"use client"

import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    className = '',
    ...nativeProps
}) => {
    const baseStyles = 'px-4 py-2.5 font-semibold rounded-lg transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';
    const variantStyles = {
        primary: 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-purple-500/50',
        secondary: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-emerald-500/50',
        danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-red-500/50',
    };

    const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

    return (
        <button
            className={combinedStyles}
            {...nativeProps}
        >
            {children}
        </button>
    );
};

export default Button;