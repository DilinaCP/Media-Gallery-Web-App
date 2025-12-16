"use client"

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Button from '@/app/components/common/Button';

 const LoginForm = () => {
        const router = useRouter();
        const [error, setError] = useState<{ email?: string; password?: string }>({});
        const [apiError, setApiError] = useState('');
        const [isLoading, setIsLoading] = useState(false);
        const [showPassword, setShowPassword] = useState(false);
        const [formData, setFormData] = useState({
            email: '',
            password: '',
        });

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
                    setIsLoading(true);
                    const response = await fetch('http://localhost:4000/api/auth/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: formData.email,
                            password: formData.password,
                        }),
                    });

                    if (!response.ok) {
                        const errorBody = await response.json().catch(() => ({}));
                        const message = errorBody?.message || 'Login failed. Please try again.';
                        setApiError(message);
                        return;
                    }

                    const data = await response.json();
                    if (data?.token) {
                        localStorage.setItem('token', data.token);
                    }
                    if (data?.user) {
                        localStorage.setItem('user', JSON.stringify(data.user));
                    }

                    router.push('/dashboard');
                } catch (err) {
                    setApiError('Unable to reach the server. Please try again.');
                } finally {
                    setIsLoading(false);
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
                            className='text-blue-600 ml-2 cursor-pointer text-sm'>
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
                        <button 
                            className="w-96 cursor-pointer flex items-center justify-center gap-2" 
                            type="button">
                                <FcGoogle size={20} />
                                <span className='text-sm'>Login with Google</span>
                        </button>
                    </form>
                </div>
            </div>                                                 
        </>
    )
}

export default LoginForm;