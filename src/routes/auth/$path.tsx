import { viewPaths } from "@better-auth-ui/core";
import { Auth } from "@better-auth-ui/heroui";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/logo";

export const Route = createFileRoute("/auth/$path")({
	beforeLoad({ params: { path } }) {
		if (!Object.values(viewPaths.auth).includes(path)) {
			throw notFound();
		}
	},
	component: AuthPage,
});

function AuthPage() {
	const { path } = Route.useParams();

	return (
		<div className="min-h-svh w-full grid grid-cols-1 md:grid-cols-2 bg-background">
			{/* Auth Form Container Side */}
			<div className="flex flex-col justify-between p-6 sm:p-10 md:p-16">
				{/* Top Header Row with Logo */}
				<header className="flex justify-between items-center w-full">
					<Link
						to="/"
						className="flex items-center gap-2 text-foreground no-underline hover:opacity-80 transition-opacity"
					>
						<Logo className="size-5 animate-pulse" />
						<span className="font-bold tracking-tight text-sm">
							Tanstack Better-Auth
						</span>
					</Link>

					<Link
						to="/"
						className="inline-flex items-center gap-1.5 text-xs text-default-500 hover:text-foreground no-underline font-medium border border-default-100 hover:bg-default-50 px-3 py-1.5 rounded-lg transition-colors"
					>
						<ArrowLeft className="size-3.5" />
						<span>Home</span>
					</Link>
				</header>

				{/* Centered Auth Box */}
				<div className="my-auto py-12 flex flex-col justify-center w-full max-w-[420px] mx-auto">
					<div className="mb-4">
						<h2 className="text-2xl font-bold tracking-tight">
							{path === "sign-in" ? "Welcome back" : "Get started today"}
						</h2>
						<p className="text-sm text-default-400 mt-1">
							{path === "sign-in"
								? "Enter your details below to access your account"
								: "Create an account to start building your auth flow"}
						</p>
					</div>

					<div className="w-full">
						<Auth path={path} />
					</div>
				</div>

				{/* Minimal Bottom Info */}
				<footer className="text-center text-xs text-default-400 w-full">
					Protected by industry standard encryption.
				</footer>
			</div>

			{/* Visual Cover Side (Desktop Only) */}
			<div className="hidden md:block relative overflow-hidden h-full w-full">
				{/* Background Image */}
				<img
					src="/auth_banner.png"
					alt="Secure Network Illustration"
					className="absolute inset-0 w-full h-full object-cover select-none"
				/>
				{/* Backdrop Overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/30 to-zinc-950/20 backdrop-blur-[2px]" />

				{/* Glassmorphic Value Card Overlay */}
				<div className="absolute inset-x-8 bottom-8 lg:inset-x-12 lg:bottom-12 p-6 lg:p-8 bg-zinc-950/40 backdrop-blur-lg border border-white/10 rounded-2xl flex flex-col justify-between gap-6 text-white max-w-2xl mx-auto shadow-2xl">
					<div className="flex flex-col gap-3">
						<h3 className="text-xl lg:text-2xl font-bold tracking-tight">
							The Next Generation of Authentication
						</h3>
						<p className="text-sm text-zinc-300 leading-relaxed font-light">
							Secure your applications with Passkeys, Multi-session setups, and
							robust security workflows out-of-the-box. Integrated natively with
							HeroUI for standard-compliant accessibility.
						</p>
					</div>

					<div className="border-t border-white/10 pt-4 flex flex-col gap-2">
						<div className="flex items-center gap-2 text-xs text-zinc-300">
							<CheckCircle2 className="size-4 text-cyan-400" />
							<span>Full passwordless support via Passkey (WebAuthn)</span>
						</div>
						<div className="flex items-center gap-2 text-xs text-zinc-300">
							<CheckCircle2 className="size-4 text-cyan-400" />
							<span>Secure, type-safe API key client generation</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
