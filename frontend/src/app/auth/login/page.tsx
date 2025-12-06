"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';

 const LoginForm = () =>{
        const router = useRouter();
        const [error, setError] = useState<{ email?: string; password?: string }>({});
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

        const handleChange = (e: any) => {
            const {name, value} = e.target;
            setFormData({
                ...formData,
                [name]: value,
            });
        };

        const handleSubmit = (e: any) => {
            e.preventDefault();
            const validationErrors = validationForm(formData);
            setError(validationErrors);

            if (Object.keys(validationErrors).length === 0){
                console.log('Form Data: ', formData)
                router.push('/pages/dashboard');
            }
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
                        <div>
                            <input 
                                className="w-96 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 border bg-white"
                                type="password" 
                                id='password'
                                name="password" 
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {error.password && <span className='text-red-500 text-sm mt-1'>{error.password}</span>}
                        </div>
                        <button className='text-blue-600 ml-2 cursor-pointer text-sm'>
                            Forgot Password?
                        </button>
                        <button
                            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                            type ="submit"
                            >
                                LogIn
                        </button>
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