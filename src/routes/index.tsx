import { Avatar, Button, Card, CardContent, Chip } from "@heroui/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowRight,
	CheckCircle2,
	Fingerprint,
	Globe,
	KeyRound,
	Laptop,
	Layers,
	Shield,
	Smartphone,
	Terminal,
} from "lucide-react";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/")({ component: App });

function App() {
	const { data: sessionState, isPending } = authClient.useSession();
	const user = sessionState?.user;

	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<div className="relative overflow-hidden grow pb-20">
			{/* Background glowing decorations */}
			<div className="absolute top-[-10%] left-[5%] -z-10 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 blur-[80px] sm:blur-[120px] pointer-events-none" />
			<div className="absolute bottom-[20%] right-[5%] -z-10 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-gradient-to-tr from-purple-500/10 to-pink-500/10 blur-[80px] sm:blur-[120px] pointer-events-none" />

			{/* Hero Section */}
			<section className="max-w-7xl mx-auto px-4 pt-20 pb-12 sm:pb-16 text-center">
				<Chip
					variant="soft"
					color="accent"
					className="mb-6 border border-accent-100/30 px-3 py-1 font-semibold text-xs animate-pulse"
					aria-label="Platform version status info"
				>
					<span className="flex items-center gap-1.5">
						<Shield className="size-3" />
						v1.6 Ready — Powered by Better Auth & HeroUI
					</span>
				</Chip>

				<h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.1] text-foreground">
					Modern Authentication. <br />
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-500 to-indigo-500">
						Beautifully Executed.
					</span>
				</h1>

				<p className="mt-6 text-base sm:text-lg text-default-500 max-w-2xl mx-auto leading-relaxed">
					Experience a beautiful user experience powered by TanStack Start,
					HeroUI, and Better Auth. Completely secure, type-safe, and styled with
					premium micro-interactions.
				</p>

				<div className="mt-10 flex flex-wrap justify-center gap-4">
					{!mounted || isPending ? (
						<Button size="lg" variant="ghost" aria-label="Loading Session">
							Loading Session...
						</Button>
					) : user ? (
						<div className="flex flex-col sm:flex-row gap-4 items-center">
							<Link
								to="/dashboard"
								params={{ path: "dashboard" }}
								className="no-underline"
							>
								<Button
									variant="primary"
									size="lg"
									className="font-medium shadow-lg shadow-primary-500/20 flex items-center gap-2"
									aria-label="Go to Dashboard"
								>
									<span>Go to Dashboard</span>
									<ArrowRight className="size-4" />
								</Button>
							</Link>
						</div>
					) : (
						<>
							<Link
								to="/auth/$path"
								params={{ path: "sign-up" }}
								className="no-underline"
							>
								<Button
									variant="primary"
									size="lg"
									className="font-medium shadow-lg shadow-primary-500/20 transition-transform duration-300 hover:scale-105 flex items-center gap-2"
									aria-label="Get Started"
								>
									<span>Get Started</span>
									<ArrowRight className="size-4" />
								</Button>
							</Link>
							<Link
								to="/auth/$path"
								params={{ path: "sign-in" }}
								className="no-underline"
							>
								<Button
									variant="outline"
									size="lg"
									className="font-medium border-default-200 hover:bg-default-50 transition-colors duration-300"
									aria-label="Sign In"
								>
									Sign In
								</Button>
							</Link>
						</>
					)}
				</div>
			</section>

			{/* Interactive Feature Demo Dashboard Mockup */}
			<section className="max-w-5xl mx-auto px-4 py-8">
				<Card className="border border-default-100/50 bg-content1/40 backdrop-blur-md shadow-2xl relative overflow-hidden">
					{/* Header area of Mockup */}
					<div className="border-b border-default-100 px-6 py-4 flex items-center justify-between bg-content1/60">
						<div className="flex gap-1.5">
							<span className="w-3 h-3 rounded-full bg-danger/70" />
							<span className="w-3 h-3 rounded-full bg-warning/70" />
							<span className="w-3 h-3 rounded-full bg-success/70" />
						</div>
						<div className="text-xs font-mono text-default-400 bg-background/50 px-3 py-1 rounded-md border border-default-100">
							tanstack-better-auth / active-dashboard
						</div>
						<div className="flex items-center gap-2">
							<span className="w-2 h-2 rounded-full bg-success animate-ping" />
							<span className="text-xs font-semibold text-success">
								Sleek Console
							</span>
						</div>
					</div>

					{/* 50/50 Balanced Grid */}
					<CardContent className="p-6 md:p-8 grid md:grid-cols-2 gap-8 bg-gradient-to-b from-transparent to-content1/20 items-stretch">
						{/* Left Column: Active User & Sessions List */}
						<div className="flex flex-col gap-5 border-r border-default-100/40 pr-0 md:pr-4">
							<div className="flex flex-col gap-2">
								<span className="text-xs font-bold uppercase tracking-wider text-default-400">
									Account Overview
								</span>
								<div className="p-4 rounded-xl border border-default-100/60 bg-content2/30 flex items-center justify-between gap-3">
									{user ? (
										<div className="flex items-center gap-3">
											<Avatar className="bg-primary text-white size-10" aria-label="User profile avatar">
												{user.image ? (
													<Avatar.Image src={user.image} alt={user.name || "Avatar"} />
												) : (
													<Avatar.Fallback>{user.name?.charAt(0).toUpperCase() || "U"}</Avatar.Fallback>
												)}
											</Avatar>
											<div className="flex flex-col">
												<span className="text-sm font-semibold text-foreground leading-tight">
													{user.name}
												</span>
												<span className="text-xs text-default-400 mt-0.5">
													{user.email}
												</span>
											</div>
										</div>
									) : (
										<div className="flex items-center gap-3">
											<Avatar className="bg-default-200 text-default-500 size-10" aria-label="Anonymous Developer Avatar">
												<Avatar.Fallback>AD</Avatar.Fallback>
											</Avatar>
											<div className="flex flex-col">
												<span className="text-sm font-semibold text-foreground leading-tight">
													Anonymous Developer
												</span>
												<span className="text-xs text-default-400 mt-0.5">
													Sign in to preview active session
												</span>
											</div>
										</div>
									)}
									<Chip
										size="sm"
										color={user ? "success" : "default"}
										variant="soft"
										className="font-semibold text-xs"
										aria-label="Active status"
									>
										{user ? "Active" : "Guest"}
									</Chip>
								</div>
							</div>

							<div className="flex flex-col gap-2 grow">
								<span className="text-xs font-bold uppercase tracking-wider text-default-400">
									Active Devices
								</span>
								<div className="flex flex-col gap-2.5 grow justify-center">
									{/* Session 1 */}
									<div className="flex items-center justify-between p-3 rounded-xl border border-default-100/50 bg-content2/10">
										<div className="flex items-center gap-3">
											<div className="size-8 rounded-lg bg-success/10 flex items-center justify-center text-success border border-success/20">
												<Laptop className="size-4" />
											</div>
											<div className="flex flex-col">
												<span className="text-xs font-semibold">
													macOS • Chrome Browser
												</span>
												<span className="text-xxs text-default-400">
													Silicon Valley, USA
												</span>
											</div>
										</div>
										<Chip
											size="sm"
											color="success"
											variant="soft"
											className="text-xxs font-medium"
											aria-label="Current session indicator"
										>
											Current
										</Chip>
									</div>

									{/* Session 2 */}
									<div className="flex items-center justify-between p-3 rounded-xl border border-default-100/50 bg-content2/10 opacity-70">
										<div className="flex items-center gap-3">
											<div className="size-8 rounded-lg bg-default-100 flex items-center justify-center text-default-500 border border-default-200">
												<Smartphone className="size-4" />
											</div>
											<div className="flex flex-col">
												<span className="text-xs font-semibold">
													iPhone 15 Pro • Safari
												</span>
												<span className="text-xxs text-default-400">
													3 hours ago
												</span>
											</div>
										</div>
										<span className="text-xxs font-semibold text-default-400 mr-2">
											Inactive
										</span>
									</div>
								</div>
							</div>
						</div>

						{/* Right Column: Setup console & checklist status */}
						<div className="flex flex-col gap-5 pl-0 md:pl-4">
							<div className="flex flex-col gap-2">
								<span className="text-xs font-bold uppercase tracking-wider text-default-400">
									Quick Integration
								</span>
								<div className="bg-default-50/50 border border-default-100 font-mono text-xs w-full text-foreground p-3.5 rounded-xl flex items-center justify-between select-all shadow-inner">
									<div className="flex items-center gap-2">
										<Terminal className="size-4 text-primary" />
										<span>bun add better-auth @better-auth-ui/heroui</span>
									</div>
									<span className="text-xxs uppercase tracking-wider text-default-400 font-bold px-1.5 py-0.5 rounded border border-default-200 bg-content2/30">
										CLI
									</span>
								</div>
							</div>

							<div className="flex flex-col gap-2 grow">
								<span className="text-xs font-bold uppercase tracking-wider text-default-400">
									Security Infrastructure
								</span>
								<div className="p-4 rounded-xl border border-default-100/60 bg-content2/20 flex flex-col gap-3.5 font-mono text-xs text-default-500 justify-center grow">
									<div className="flex justify-between items-center">
										<span className="flex items-center gap-2 text-default-600">
											<CheckCircle2 className="size-3.5 text-success" />{" "}
											Database
										</span>
										<span className="text-default-400 font-bold">
											Drizzle ORM
										</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="flex items-center gap-2 text-default-600">
											<CheckCircle2 className="size-3.5 text-success" /> Session
											Engine
										</span>
										<span className="text-default-400 font-bold">
											Encrypted Cookies
										</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="flex items-center gap-2 text-default-600">
											<CheckCircle2 className="size-3.5 text-success" />{" "}
											Multi-Session
										</span>
										<span className="text-default-400 font-bold">
											Supported
										</span>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</section>

			{/* Core Features Grid Section */}
			<section className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
				<div className="text-center mb-16">
					<h2 className="text-3xl font-extrabold text-foreground">
						Complete Authentication Suite
					</h2>
					<p className="text-default-400 mt-3 text-sm sm:text-base max-w-xl mx-auto">
						Everything you need for user management, styled beautifully with
						native accessibility.
					</p>
				</div>

				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{/* Card 1 */}
					<Card className="bg-content1/30 border border-default-100 hover:border-cyan-500/40 hover:shadow-cyan-500/5 hover:shadow-xl transition-all duration-300">
						<CardContent className="p-6 flex flex-col gap-4">
							<div className="size-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
								<Fingerprint className="size-5" />
							</div>
							<h3 className="font-bold text-lg">Passkey & WebAuthn</h3>
							<p className="text-sm text-default-500 leading-relaxed">
								Allow secure biometric login using Apple FaceID, Google TouchID,
								or Windows Hello with a single click.
							</p>
						</CardContent>
					</Card>

					{/* Card 2 */}
					<Card className="bg-content1/30 border border-default-100 hover:border-indigo-500/40 hover:shadow-indigo-500/5 hover:shadow-xl transition-all duration-300">
						<CardContent className="p-6 flex flex-col gap-4">
							<div className="size-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
								<Layers className="size-5" />
							</div>
							<h3 className="font-bold text-lg">Multi-Session Handling</h3>
							<p className="text-sm text-default-500 leading-relaxed">
								Enable users to see and manage their active sessions from
								different browsers, with easy remote logout.
							</p>
						</CardContent>
					</Card>

					{/* Card 3 */}
					<Card className="bg-content1/30 border border-default-100 hover:border-teal-500/40 hover:shadow-teal-500/5 hover:shadow-xl transition-all duration-300">
						<CardContent className="p-6 flex flex-col gap-4">
							<div className="size-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20">
								<KeyRound className="size-5" />
							</div>
							<h3 className="font-bold text-lg">Developer API Keys</h3>
							<p className="text-sm text-default-500 leading-relaxed">
								Generate, label, edit, and revoke high-performance client API
								keys for integrating third-party tools.
							</p>
						</CardContent>
					</Card>

					{/* Card 4 */}
					<Card className="bg-content1/30 border border-default-100 hover:border-pink-500/40 hover:shadow-pink-500/5 hover:shadow-xl transition-all duration-300">
						<CardContent className="p-6 flex flex-col gap-4">
							<div className="size-10 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400 border border-pink-500/20">
								<Terminal className="size-5" />
							</div>
							<h3 className="font-bold text-lg">Type-Safe Routing</h3>
							<p className="text-sm text-default-500 leading-relaxed">
								Powered by TanStack Router. Fully typed links, routing
								parameters, and load hooks that resolve at compile time.
							</p>
						</CardContent>
					</Card>

					{/* Card 5 */}
					<Card className="bg-content1/30 border border-default-100 hover:border-purple-500/40 hover:shadow-purple-500/5 hover:shadow-xl transition-all duration-300">
						<CardContent className="p-6 flex flex-col gap-4">
							<div className="size-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
								<Globe className="size-5" />
							</div>
							<h3 className="font-bold text-lg">Cross-Framework Ready</h3>
							<p className="text-sm text-default-500 leading-relaxed">
								Deploy with Next.js or TanStack Start. Database integrations
								with Drizzle adapter and PostgreSQL out-of-the-box.
							</p>
						</CardContent>
					</Card>

					{/* Card 6 */}
					<Card className="bg-content1/30 border border-default-100 hover:border-orange-500/40 hover:shadow-orange-500/5 hover:shadow-xl transition-all duration-300">
						<CardContent className="p-6 flex flex-col gap-4">
							<div className="size-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20">
								<Shield className="size-5" />
							</div>
							<h3 className="font-bold text-lg">Highly Customisable</h3>
							<p className="text-sm text-default-500 leading-relaxed">
								Extend schemas easily and override defaults. Integrates
								flawlessly with next-themes dark mode settings.
							</p>
						</CardContent>
					</Card>
				</div>
			</section>
		</div>
	);
}
