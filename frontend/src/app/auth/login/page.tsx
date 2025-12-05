"use client"

import React from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
        const router = useRouter();

        const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
            e.preventDefault();
            router.push('/pages/dashboard');
        }

    return (
        <>
            <div className='flex items-center justify-center min-h-screen'>
                <div className="box-border border p-6 rounded-lg bg-blue-200">
                    <div className="text-center text-lg font-bold">
                        <h1>Login Page</h1>
                    </div>
                    <form className="flex flex-col gap-4 mt-4 w-96 items-center">
                        <div>
                            <input
                                className="w-96 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 border bg-white" 
                                type="email" 
                                name="Email" 
                                placeholder="Enter Your Email"
                            />
                        </div>
                        <div>
                            <input 
                                className="w-96 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 border bg-white"
                                type="password" 
                                name="Password" 
                                placeholder="Enter Your Password"
                            />
                        </div>
                        <button
                            className="w-32 bg-blue-800 text-white px-4 py-2 rounded-lg cursor-pointer"
                            type ="submit"
                            onClick={handleSubmit}>
                                Submit
                        </button>
                    </form>
                        <button
                            className='cursor-pointer'
                            onClick={() => router.push('/auth/register')}>  
                                Don't have an account? Register  
                        </button>
                </div>
            </div>                                                 
        </>
    )
}