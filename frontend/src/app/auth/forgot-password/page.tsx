"use client";

import { useState, type FormEvent } from "react";
import Button from "@/app/components/common/Button";
import api, { ApiError } from "@/app/lib/api";

const ForgotPasswordPage = () => {
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
			await api.post<{ message: string }>("/auth/forgot-password", { email });
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
			});
			setMessage("Password reset successful. You can now log in with your new password.");
		} catch (err) {
			setError(extractMessage(err));
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-blue-300 px-4">
			<div className="box-border p-6 rounded-lg bg-white w-full max-w-md shadow-md">
				<div className="text-center text-lg font-bold">
					<h1>Forgot Password</h1>
				</div>
				<form
					className="flex flex-col gap-4 mt-4"
					onSubmit={step === "request" ? handleRequest : handleReset}
				>
					<input
						className="w-full px-4 py-2 rounded-lg border bg-white"
						type="email"
						name="email"
						placeholder="Enter your account email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						required
					/>

					{step === "reset" && (
						<>
							<input
								className="w-full px-4 py-2 rounded-lg border bg-white"
								type="text"
								name="otp"
								placeholder="Enter the 6-digit code"
								value={otp}
								onChange={(event) => setOtp(event.target.value)}
								pattern="\d{6}"
								required
							/>
							<input
								className="w-full px-4 py-2 rounded-lg border bg-white"
								type="password"
								name="newPassword"
								placeholder="New password"
								value={newPassword}
								onChange={(event) => setNewPassword(event.target.value)}
								minLength={8}
								required
							/>
						</>
					)}

					<Button
						type="submit"
						disabled={
							isLoading ||
							!email.trim() ||
							(step === "reset" && (!otp.trim() || !newPassword.trim()))
						}
					>
						{step === "request" ? "Send code" : "Reset password"}
					</Button>

					{message && <p className="text-sm text-green-700">{message}</p>}
					{error && <p className="text-sm text-red-600">{error}</p>}
				</form>
			</div>
		</div>
	);
};

export default ForgotPasswordPage;
