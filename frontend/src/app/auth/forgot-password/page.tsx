"use client";

import { useState, type FormEvent } from "react";
import Button from "@/app/components/common/Button";

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSubmitted(true);
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-blue-300">
			<div className="box-border p-6 rounded-lg bg-white w-[28rem]">
				<div className="text-center text-lg font-bold">
					<h1>Forgot Password</h1>
				</div>
				<form
					className="flex flex-col gap-4 mt-4"
					onSubmit={handleSubmit}
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
					<Button type="submit" disabled={!email.trim()}>
						Send reset instructions
					</Button>
					{submitted && (
						<p className="text-sm text-gray-600">
							If this email exists, you will receive reset instructions shortly.
						</p>
					)}
				</form>
			</div>
		</div>
	);
};

export default ForgotPasswordPage;
