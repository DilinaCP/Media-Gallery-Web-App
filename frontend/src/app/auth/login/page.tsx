"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import Button from "@/app/components/common/Button";
import Input from "@/app/components/common/Input";
import api, { ApiError } from "@/app/lib/api";
import { saveAuth, type AuthUser } from "@/app/lib/auth";
import { useAuth } from "@/app/hooks/useAuth";
import { GoogleLogin } from "@react-oauth/google";

 const LoginForm = () => {
        const router = useRouter();
        const { login, isLoading, error: authError } = useAuth();
        const [error, setError] = useState<{ email?: string; password?: string }>({});
        const [apiError, setApiError] = useState('');
        const [showPassword, setShowPassword] = useState(false);
        const [formData, setFormData] = useState({
            email: '',
            password: '',
        });

        useEffect(() => {
            if (authError) setApiError(authError);
        }, [authError]);

        const validationForm = (data:any) => {
            let error: { email?: string; password?: string } = {};
            if(!data.email.trim()){
                error.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(data.email)){
                error.email = 'Email is Invalid';
            }
            if(!data.password){
                error.password = 'Password is required';
            } else if (data.password.length < 4){
                error.password = 'Password must be at least 4 characters'
            }
            return error;
        };

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            const {name, value} = e.target;
            setFormData({
                ...formData,
                [name]: value,
            });
        };

        const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setApiError('');
            const validationErrors = validationForm(formData);
            setError(validationErrors);

            if (Object.keys(validationErrors).length === 0){
                try {
                    await login({ email: formData.email, password: formData.password });
                    router.push('/dashboard');
                } catch (err) {
                    const message = err instanceof ApiError || err instanceof Error
                        ? err.message
                        : 'Unable to reach the server. Please try again.';
                    setApiError(message);
                }
            }
        };

        const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        };

    return (
        <>
            <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900'>
                <div className="box-border p-8 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 shadow-2xl w-full max-w-md">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">Welcome Back</h1>
                        <p className="text-slate-400 text-sm">Sign in to your account</p>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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

                        {apiError && <div className='bg-red-500/10 border border-red-500/50 text-red-300 text-sm p-3 rounded-lg'>{apiError}</div>}

                        <button 
                            type='button'
                            className='text-purple-400 hover:text-purple-300 cursor-pointer text-sm font-medium transition-colors text-right'
                            onClick={() => router.push('/auth/forgot-password')}>
                                Forgot Password?
                        </button>

                        <Button
                            type='submit'
                            className='w-full mt-2'
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging In...' : 'Sign In'}
                        </Button>

                        <div className="relative my-2">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-600"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-slate-900 text-slate-400">or continue with</span>
                            </div>
                        </div>

                        <div className="w-full flex justify-center">
                            <GoogleLogin
                                onSuccess={async (res) => {
                                    try {
                                        const data = await api.post<{ token: string; user: AuthUser }>(
                                            "/auth/google",
                                            { credential: res.credential }
                                        );

                                        if (!data.token || !data.user) {
                                            throw new Error("Invalid Google login response");
                                        }

                                        saveAuth(data.user, data.token);
                                        router.push('/dashboard');
                                    } catch (error) {
                                        console.error("Google login error:", error);
                                        const message = error instanceof ApiError || error instanceof Error
                                            ? error.message
                                            : "Google authentication failed. Please try again.";
                                        setApiError(message);
                                    }
                                }}
                                onError={() => {
                                    console.log("Login Failed");
                                    setApiError("Google authentication failed. Please try again.");
                                }}
                            />
                        </div>

                        <p className="text-slate-400 text-sm text-center">
                            Don't have an account?
                            <button
                                type='button'
                                className="text-purple-400 hover:text-purple-300 ml-2 cursor-pointer font-medium transition-colors"
                                onClick={() => router.push('/auth/register')}>
                                Register
                            </button>
                        </p>
                    </form>
                </div>
            </div>                                                 
        </>
    )
}

export default LoginForm;