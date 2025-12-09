"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import Button from '@/app/components/common/Button';

const SignupForm = () => {
    const router = useRouter();
    const [error, setError] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const validationForm = (data: any) => {
        let error: {email?: string; password?: string; confirmPassword?: string } = {};
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

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const validationErrors = validationForm(formData);
        setError(validationErrors);

        if (Object.keys(validationErrors).length === 0){
            console.log('Form Data: ', formData)
            router.push('/auth/login');
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
            <div className='flex items-center justify-center min-h-screen bg-blue-300'>
                <div className="box-border  p-6 rounded-lg bg-white">
                    <div className="text-center text-lg font-bold">
                        <h1>Sign Up</h1>
                    </div>
                    <form onSubmit={handleSubmit}
                    className="flex flex-col gap-4 mt-4 w-96 items-center">
                        <div>
                            <input
                                className="w-96 px-4 py-2 rounded-lg border bg-white" 
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
                                className="w-96 px-4 py-2 pr-10 rounded-lg border bg-white" 
                                type={showPassword ? "text" : "password"}
                                id='password'
                                name="password" 
                                placeholder="Create Password"
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
                        <div className='relative'>
                            <input 
                                className="w-96 px-4 py-2 pr-10 rounded-lg border bg-white"
                                type={showConfirmPassword ? "text" : "password"}
                                id='confirmPassword'
                                name='confirmPassword' 
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            <span
                                onClick={toggleConfirmPasswordVisibility}
                                className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500'
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                            {error.confirmPassword && <div className='text-red-500 text-sm mt-1'>{error.confirmPassword}</div>}
                        </div>
                            <Button
                                type='submit'
                                className='w-full'
                            >
                                Sign Up
                            </Button>
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

export default SignupForm;