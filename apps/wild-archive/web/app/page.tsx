"use client";
import { useState } from "react";
import { ac } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [currentUser, setCurrentUser] = useState<
		typeof ac.$Infer.Session | null
	>(null);

	const signIn = async () => {
		const { data, error } = await ac.signIn.email(
			{
				email,
				password,
			},
			{
				onRequest: (ctx) => {
					//show loading
					console.log(ctx);
				},
				onSuccess: (ctx) => {
					//redirect to the dashboard
					console.log(ctx);
				},
				onError: (ctx) => {
					alert(ctx.error.message);
				},
			},
		);
		console.log(data, error);
		setCurrentUser(data);
	};

	return (
		<div>
			{currentUser ? (
				<div>
					<p>{currentUser.user.email}</p>
					<p>{currentUser.user.name}</p>
					<Button
						onClick={async () => {
							await ac.signOut();
							setCurrentUser(null);
						}}
					>
						Sign Out
					</Button>
				</div>
			) : (
				<>
					<Input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button onClick={signIn}>Sign In</Button>
				</>
			)}
		</div>
	);
}
