"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';

export default function RegisterPage() {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        router.push('/auth/login');
    }

    return (
        <>
            <div className='flex items-center justify-center min-h-screen bg-blue-300'>
                <div className="box-border  p-6 rounded-lg bg-white">
                    <div className="text-center text-lg font-bold">
                        <h1>Sign Up</h1>
                    </div>
                    <form className="flex flex-col gap-4 mt-4 w-96 items-center">
                        <div>
                            <input
                                className="w-96 px-4 py-2 rounded-lg border bg-white" 
                                type="email" 
                                name="Email" 
                                placeholder="Email"
                                required={true}
                            />
                        </div>
                        <div>
                            <input
                                className="w-96 px-4 py-2 rounded-lg border bg-white" 
                                type="password" 
                                name="Password" 
                                placeholder="Create Password"
                            />
                        </div>
                        <div>
                            <input 
                                className="w-96 px-4 py-2 rounded-lg border bg-white"
                                type="password" 
                                name="Password" 
                                placeholder="Confirm Password"
                            />
                        </div>
                        <button
                            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                            type ="submit"
                            onClick={handleSubmit}>
                                Sign Up
                        </button>
                        <p className="text-gray-500 text-sm">
                            Already have an account?
                            <button
                                type='button'
                                className="text-blue-600 ml-2 cursor-pointer"
                                onClick={() => router.push('/auth/login')}>
                                Login
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