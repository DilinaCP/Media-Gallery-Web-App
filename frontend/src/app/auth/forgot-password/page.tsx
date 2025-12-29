"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/common/Button";
import api, { ApiError } from "@/app/lib/api";

const ForgotPasswordPage = () => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [step, setStep] = useState<"request" | "reset">("request");
	const [message, setMessage] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const extractMessage = (err: unknown) => {
		if (err instanceof ApiError) return err.message;
		if (err instanceof Error) return err.message;
		return "Something went wrong";
	};

	const handleRequest = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		setError(null);
		setMessage(null);

		try {
			await api.post<{ message: string }>("/auth/forgot-password", { email }, undefined, true);
			setStep("reset");
			setMessage("If the account exists, we sent a 6-digit code to your email.");
		} catch (err) {
			setError(extractMessage(err));
		} finally {
			setIsLoading(false);
		}
	};

	const handleReset = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		setError(null);
		setMessage(null);

		try {
			await api.post<{ message: string }>("/auth/reset-password", {
				email,
				otp,
				newPassword,
			}, undefined, true);
			setMessage("Password reset successful. Redirecting to login...");
			
			// Redirect to login page after 2 seconds
			setTimeout(() => {
				router.push("/auth/login");
			}, 2000);
		} catch (err) {
			setError(extractMessage(err));
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900 px-4">
			<div className="box-border p-8 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 shadow-2xl w-full max-w-md">
				<div className="text-center mb-6">
					<h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
						{step === "request" ? "Forgot Password" : "Reset Password"}
					</h1>
					<p className="text-slate-400 text-sm">
						{step === "request" 
							? "Enter your email to receive a reset code" 
							: "Enter the code and your new password"}
					</p>
				</div>
				<form
					className="flex flex-col gap-5 mt-6"
					onSubmit={step === "request" ? handleRequest : handleReset}
				>
					<div className="w-full">
						<label className="block text-sm font-semibold text-slate-300 mb-2">
							Email Address
						</label>
						<input
							className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 text-sm transition-all duration-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:bg-slate-700 hover:border-slate-500"
							type="email"
							name="email"
							placeholder="you@example.com"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							disabled={step === "reset"}
							required
						/>
					</div>

					{step === "reset" && (
						<>
							<div className="w-full">
								<label className="block text-sm font-semibold text-slate-300 mb-2">
									Verification Code
								</label>
								<input
									className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 text-sm transition-all duration-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:bg-slate-700 hover:border-slate-500 tracking-widest text-center text-lg font-semibold"
									type="text"
									name="otp"
									placeholder="000000"
									value={otp}
									onChange={(event) => setOtp(event.target.value)}
									pattern="\d{6}"
									maxLength={6}
									required
								/>
							</div>
							<div className="w-full">
								<label className="block text-sm font-semibold text-slate-300 mb-2">
									New Password
								</label>
								<input
									className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 text-sm transition-all duration-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:bg-slate-700 hover:border-slate-500"
									type="password"
									name="newPassword"
									placeholder="••••••••"
									value={newPassword}
									onChange={(event) => setNewPassword(event.target.value)}
									minLength={4}
									required
								/>
							</div>
						</>
					)}

					{message && (
						<div className="bg-green-500/10 border border-green-500/50 text-green-300 text-sm p-3 rounded-lg">
							{message}
						</div>
					)}
					{error && (
						<div className="bg-red-500/10 border border-red-500/50 text-red-300 text-sm p-3 rounded-lg">
							{error}
						</div>
					)}

					<Button
						type="submit"
						className="w-full mt-2"
						disabled={
							isLoading ||
							!email.trim() ||
							(step === "reset" && (!otp.trim() || !newPassword.trim()))
						}
					>
						{isLoading 
							? (step === "request" ? "Sending..." : "Resetting...") 
							: (step === "request" ? "Send Reset Code" : "Reset Password")}
					</Button>

					<p className="text-slate-400 text-sm text-center">
						Remember your password?
						<button
							type="button"
							className="text-purple-400 hover:text-purple-300 ml-2 cursor-pointer font-medium transition-colors"
							onClick={() => router.push('/auth/login')}
						>
							Sign In
						</button>
					</p>
				</form>
			</div>
		</div>
	);
};

export default ForgotPasswordPage;
