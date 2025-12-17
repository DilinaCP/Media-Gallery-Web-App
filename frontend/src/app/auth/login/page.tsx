"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "@/app/components/common/Button";
import { ApiError } from "@/app/lib/api";
import { useAuth } from "@/app/hooks/useAuth";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

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
            <div className='flex items-center justify-center min-h-screen bg-blue-300'>
                <div className="box-border p-6 rounded-lg bg-white">
                    <div className="text-center text-lg font-bold">
                        <h1>Login</h1>
                    </div>
                    <form onSubmit={handleSubmit}
                        className="flex flex-col gap-4 mt-4 w-96 items-center">
                        <div>
                            <input
                                className="w-96 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 border bg-white" 
                                type="email" 
                                id='email'
                                name="email" 
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {error.email && <span className='text-red-500 text-sm mt-1'>{error.email}</span>}
                        </div>
                        <div className='relative'>
                            <input 
                                className="w-96 px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-1 border bg-white"
                                type={showPassword ? "text" : "password"}
                                id='password'
                                name="password" 
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <span
                                onClick={togglePasswordVisibility}
                                className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500'
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                            {error.password && <div className='text-red-500 text-sm mt-1'>{error.password}</div>}
                        </div>
                        {apiError && <div className='text-red-500 text-sm w-full text-center'>{apiError}</div>}
                        <button 
                            type='button'
                            className='text-blue-600 ml-2 cursor-pointer text-sm'
                            onClick={() => router.push('/auth/forgot-password')}>
                                Forgot Password?
                        </button>
                        <div className='w-full justify-center'>
                            <Button
                                type='submit'
                                className='w-full'
                                disabled={isLoading}
                            >
                                {isLoading ? 'Logging In...' : 'LogIn'}
                            </Button>
                        </div>
                        <p className="text-gray-500 text-sm">
                            Don't have an account?
                            <button
                            type='button'
                                className="text-blue-600 ml-2 cursor-pointer"
                                onClick={() => router.push('/auth/register')}>
                                Register
                            </button>
                        </p>
                        <hr className='border- overflow-visible w-full'/>
                        <GoogleLogin
                            onSuccess={async (res) => {
                                try {
                                    const { data } = await axios.post(
                                        "http://localhost:4000/api/auth/google",
                                        { credential: res.credential }
                                    );

                                    const user = {
                                        id: data._id,
                                        name: data.name,
                                        email: data.email,
                                        role: data.role || 'user',
                                    };
                                    
                                    localStorage.setItem("token", data.token);
                                    localStorage.setItem("user", JSON.stringify(user));

                                    router.push('/dashboard');
                                } catch (error) {
                                    console.error("Google login error:", error);
                                    setApiError("Google authentication failed. Please try again.");
                                }
                            }}
                            onError={() => {
                                console.log("Login Failed");
                                setApiError("Google authentication failed. Please try again.");
                            }}
                        />
                    </form>
                </div>
            </div>                                                 
        </>
    )
}

export default LoginForm;