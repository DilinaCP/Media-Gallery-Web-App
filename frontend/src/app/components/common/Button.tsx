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
    const baseStyles = 'px-4 py-2 font-semibold rounded shadow-md cursor-pointer';
    const variantStyles = {
        primary: 'bg-blue-500 hover:bg-blue-700 text-white',
        secondary: 'bg-green-500 hover:bg-green-700 text-white',
        danger: 'bg-red-500 hover:bg-red-700 text-white',
    };
    
    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            {...nativeProps} 
        >
            {children}
        </button>
    );
}

export default Button;


