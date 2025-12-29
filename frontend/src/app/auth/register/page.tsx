"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Button from "@/app/components/common/Button";
import Input from "@/app/components/common/Input";
import { ApiError } from "@/app/lib/api";
import { useAuth } from "@/app/hooks/useAuth";

const SignupForm = () => {
    const router = useRouter();
    const { register: registerUser, isLoading, error: authError } = useAuth();
    const [error, setError] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string }>({});
    const [apiError, setApiError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    useEffect(() => {
        if (authError) setApiError(authError);
    }, [authError]);

    const validationForm = (data: any) => {
        let error: {name?: string; email?: string; password?: string; confirmPassword?: string } = {};
        if(!data.name.trim()){
            error.name = 'Name is required';
        }
        if(!data.email.trim()){
            error.email = 'Email is Invalid';
        } else if (!/\S+@\S+\.\S+/.test(data.email)){
            error.email = 'Email is Invalid';
        }
        if(!data.password){
            error.password = 'Password is required';
        } else if (data.password.length < 4){
            error.password = 'Password must be at least 4 characters'
        }
        if(!data.confirmPassword){
            error.confirmPassword = 'Confirming your password is required';
        } else if (data.confirmPassword !== data.password){
            error.confirmPassword = 'Passwords do not match';
        }
        return error;
    }

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setApiError('');
        const validationErrors = validationForm(formData);
        setError(validationErrors);

        if (Object.keys(validationErrors).length === 0){
            try {
                await registerUser({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                });
                router.push('/auth/login');
            } catch (err) {
                const message = err instanceof ApiError || err instanceof Error
                    ? err.message
                    : 'Unable to reach the server. Please try again.';
                setApiError(message);
            }
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    return (
        <>
            <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900'>
                <div className="box-border p-8 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 shadow-2xl w-full max-w-md">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">Create Account</h1>
                        <p className="text-slate-400 text-sm">Join our community today</p>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <Input
                            type="text"
                            id='name'
                            name="name"
                            label="Full Name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            error={error.name}
                        />

                        <Input
                            type="email" 
                            id='email'
                            name="email" 
                            label="Email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            error={error.email}
                        />

                        <div className="w-full">
                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Password
                            </label>
                            <div className='relative'>
                                <input
                                    className="
                                        w-full px-4 py-2.5 pr-10
                                        bg-slate-700/50 border border-slate-600
                                        rounded-lg
                                        text-slate-100 placeholder-slate-500 text-sm
                                        transition-all duration-200
                                        focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:bg-slate-700
                                        hover:border-slate-500
                                    " 
                                    type={showPassword ? "text" : "password"}
                                    id='password'
                                    name="password" 
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-300 transition-colors'
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {error.password && <p className='text-red-400 text-sm mt-1.5 font-medium'>{error.password}</p>}
                        </div>

                        <div className="w-full">
                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Confirm Password
                            </label>
                            <div className='relative'>
                                <input 
                                    className="
                                        w-full px-4 py-2.5 pr-10
                                        bg-slate-700/50 border border-slate-600
                                        rounded-lg
                                        text-slate-100 placeholder-slate-500 text-sm
                                        transition-all duration-200
                                        focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:bg-slate-700
                                        hover:border-slate-500
                                    "
                                    type={showConfirmPassword ? "text" : "password"}
                                    id='confirmPassword'
                                    name='confirmPassword' 
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-300 transition-colors'
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {error.confirmPassword && <p className='text-red-400 text-sm mt-1.5 font-medium'>{error.confirmPassword}</p>}
                        </div>

                        {apiError && <div className='bg-red-500/10 border border-red-500/50 text-red-300 text-sm p-3 rounded-lg'>{apiError}</div>}

                        <Button
                            type='submit'
                            className='w-full mt-2'
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing Up...' : 'Create Account'}
                        </Button>

                        <p className="text-slate-400 text-sm text-center">
                            Already have an account?
                            <button
                                type='button'
                                className="text-purple-400 hover:text-purple-300 ml-2 cursor-pointer font-medium transition-colors"
                                onClick={() => router.push('/auth/login')}>
                                Sign In
                            </button>
                        </p>
                    </form>
                </div>
            </div>                                                 
        </>
    )
}

export default SignupForm;