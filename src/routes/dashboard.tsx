import { ensureSession as ensureSessionClient } from "@better-auth-ui/react";
import { ensureSession as ensureSessionServer } from "@better-auth-ui/react/server";
import {
	Avatar,
	Button,
	Card,
	CardContent,
	CardHeader,
	Chip,
	ProgressBar,
	Table,
} from "@heroui/react";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import {
	Activity,
	ArrowUpRight,
	Cpu,
	Fingerprint,
	Key,
	Plus,
	ShieldCheck,
	Sparkles,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { AppLayout } from "@/components/dashboard/app-layout";

export const Route = createFileRoute("/dashboard")({
	async beforeLoad({ context, location }: { context: any; location: any }) {
		const ensureSession = createIsomorphicFn()
			.server(() =>
				ensureSessionServer(context.queryClient, auth, { headers: getRequestHeaders() })
			)
			.client(() => ensureSessionClient(context.queryClient, authClient));

		const session = await ensureSession();

		if (!session) {
			throw redirect({
				to: "/auth/$path",
				params: { path: "sign-in" },
				search: { redirectTo: location.href },
			});
		}

		return { session };
	},
	component: Dashboard,
});

function Dashboard() {
	const { data: sessionState } = authClient.useSession();
	const user = sessionState?.user;

	// Mock statistics for the dashboard console
	const stats = [
		{
			title: "Total API Calls",
			value: "148,924",
			trend: "+18.2%",
			isPositive: true,
			description: "last 30 days usage",
			icon: Activity,
			color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
		},
		{
			title: "Active Sessions",
			value: "3",
			trend: "Stable",
			isPositive: true,
			description: "across 2 devices",
			icon: ShieldCheck,
			color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
		},
		{
			title: "Passkey Sign-ins",
			value: "84%",
			trend: "+4.5%",
			isPositive: true,
			description: "of all user logins",
			icon: Fingerprint,
			color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
		},
		{
			title: "Active Developer Keys",
			value: "12",
			trend: "+2 new",
			isPositive: true,
			description: "generated this week",
			icon: Key,
			color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
		},
	];

	// Mock audit log/activities
	const activities = [
		{
			id: "1",
			event: "Generated API Key",
			details: "Created 'production-k8s-client' token",
			user: user?.name || "System Admin",
			time: "10 mins ago",
			status: "success",
		},
		{
			id: "2",
			event: "Passkey Login",
			details: "Authenticated via Apple TouchID",
			user: user?.name || "System Admin",
			time: "2 hours ago",
			status: "success",
		},
		{
			id: "3",
			event: "Revoked Session",
			details: "Logged out remote Safari browser",
			user: user?.name || "System Admin",
			time: "1 day ago",
			status: "warning",
		},
		{
			id: "4",
			event: "Schema Migration",
			details: "Drizzle push: modified user table constraints",
			user: "CI/CD Pipeline",
			time: "2 days ago",
			status: "success",
		},
	];

	return (
		<AppLayout>
			{/* Dashboard Welcome Header Row */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 md:p-6 bg-content1/40 backdrop-blur-md border border-default-100 rounded-2xl animate-fade-in">
				<div className="flex items-center gap-4">
					<Avatar className="size-14 bg-gradient-to-tr from-cyan-500 to-indigo-500 shadow-md border border-cyan-500/20">
						{user?.image ? (
							<Avatar.Image src={user.image} alt={user.name || "Avatar"} />
						) : (
							<Avatar.Fallback>{user?.name?.charAt(0).toUpperCase() || "U"}</Avatar.Fallback>
						)}
					</Avatar>
					<div className="flex flex-col">
						<div className="flex items-center gap-2">
							<h1 className="text-xl md:text-2xl font-black tracking-tight text-foreground">
								Welcome back, {user?.name || "Developer"}!
							</h1>
							<Chip
								variant="soft"
								color="success"
								size="sm"
								className="font-bold border border-success-100/10"
							>
								<span className="flex items-center gap-1.5 text-[10px] uppercase">
									<Sparkles className="size-3" />
									Pro Console
								</span>
							</Chip>
						</div>
						<p className="text-xs md:text-sm text-default-500 mt-0.5 leading-none">
							Manage your session integrations, access tokens, and security audits here.
						</p>
					</div>
				</div>

				<div className="flex items-center gap-2.5">
					<Link to="/settings/$path" params={{ path: "api-keys" }} className="no-underline">
						<Button
							variant="primary"
							size="sm"
							className="font-semibold shadow-md shadow-primary-500/15 text-white"
						>
							<Plus className="size-4 mr-1.5" />
							New API Key
						</Button>
					</Link>
					<Link to="/settings/$path" params={{ path: "account" }} className="no-underline">
						<Button
							variant="outline"
							size="sm"
							className="font-semibold border-default-200 hover:bg-default-50/70"
						>
							Edit Profile
						</Button>
					</Link>
				</div>
			</div>

			{/* Key Statistics Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
				{stats.map((stat, idx) => {
					const Icon = stat.icon;
					return (
						<Card
							key={idx}
							className="bg-content1/30 border border-default-100/50 backdrop-blur-md hover:border-primary-500/30 hover:scale-[1.01] transition-all duration-200"
						>
							<CardContent className="p-4 md:p-5 flex flex-col gap-3">
								<div className="flex items-center justify-between">
									<span className="text-xs font-bold uppercase tracking-wider text-default-400">
										{stat.title}
									</span>
									<div className={`p-2 rounded-xl border ${stat.color} shrink-0`}>
										<Icon className="size-4.5" />
									</div>
								</div>
								<div className="flex items-baseline gap-2">
									<span className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
										{stat.value}
									</span>
									<span className="text-xs font-bold text-success font-mono">
										{stat.trend}
									</span>
								</div>
								<div className="flex justify-between items-center text-[10px] text-default-400 font-semibold border-t border-default-100/30 pt-2 mt-1">
									<span>{stat.description}</span>
									<ArrowUpRight className="size-3 text-default-300" />
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>

			{/* Lower Sections Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Audit Log Table */}
				<Card className="lg:col-span-2 bg-content1/30 border border-default-100/50 backdrop-blur-md">
					<CardHeader className="flex items-center justify-between px-5 py-4 border-b border-default-100/30">
						<div className="flex flex-col">
							<h3 className="font-bold text-sm text-foreground">
								Security Event Audits
							</h3>
							<p className="text-[11px] text-default-400 font-medium">
								Real-time authentication log records
							</p>
						</div>
						<Button
							size="sm"
							variant="ghost"
							className="text-xs font-semibold text-default-500 hover:text-foreground"
						>
							View Full Audit Log
						</Button>
					</CardHeader>
					<CardContent className="p-0 overflow-hidden">
						<Table aria-label="Recent Activities Table" className="w-full">
							<Table.ScrollContainer className="w-full">
								<Table.Content aria-label="Recent Activities Table">
									<Table.Header>
										<Table.Column isRowHeader className="bg-transparent border-b border-default-100/30 text-default-400 text-xxs font-bold uppercase py-3 px-5 text-left">
											Event
										</Table.Column>
										<Table.Column className="bg-transparent border-b border-default-100/30 text-default-400 text-xxs font-bold uppercase py-3 px-5 text-left">
											Metadata details
										</Table.Column>
										<Table.Column className="bg-transparent border-b border-default-100/30 text-default-400 text-xxs font-bold uppercase py-3 px-5 text-left">
											Triggered by
										</Table.Column>
										<Table.Column className="bg-transparent border-b border-default-100/30 text-default-400 text-xxs font-bold uppercase py-3 px-5 text-left">
											Timestamp
										</Table.Column>
										<Table.Column className="bg-transparent border-b border-default-100/30 text-default-400 text-xxs font-bold uppercase py-3 px-5 text-right">
											Status
										</Table.Column>
									</Table.Header>
									<Table.Body>
										{activities.map((act) => (
											<Table.Row
												key={act.id}
												className="border-b border-default-100/20 hover:bg-default-50/20 transition-colors"
											>
												<Table.Cell className="py-3.5 px-5 font-semibold text-xs text-foreground">
													{act.event}
												</Table.Cell>
												<Table.Cell className="py-3.5 px-5 text-xs text-default-500">
													{act.details}
												</Table.Cell>
												<Table.Cell className="py-3.5 px-5 text-xs font-medium text-default-500">
													{act.user}
												</Table.Cell>
												<Table.Cell className="py-3.5 px-5 text-xs text-default-400">
													{act.time}
												</Table.Cell>
												<Table.Cell className="py-3.5 px-5 text-right">
													<Chip
														size="sm"
														variant="soft"
														color={act.status === "success" ? "success" : "warning"}
														className="font-bold text-[10px] py-0 px-2"
													>
														{act.status}
													</Chip>
												</Table.Cell>
											</Table.Row>
										))}
									</Table.Body>
								</Table.Content>
							</Table.ScrollContainer>
						</Table>
					</CardContent>
				</Card>

				{/* System & Security Status Panel */}
				<div className="flex flex-col gap-6">
					{/* System Resource Widget */}
					<Card className="bg-content1/30 border border-default-100/50 backdrop-blur-md">
						<CardHeader className="flex items-center gap-3 px-5 py-4 border-b border-default-100/30">
							<div className="p-2 rounded-xl bg-primary/10 border border-primary/20 text-primary">
								<Cpu className="size-4" />
							</div>
							<div className="flex flex-col">
								<h3 className="font-bold text-sm text-foreground">
									Console Health & Resources
								</h3>
								<p className="text-[11px] text-default-400 font-medium">
									Active service container limits
								</p>
							</div>
						</CardHeader>
						<CardContent className="p-5 flex flex-col gap-4">
							<div className="flex flex-col gap-1.5">
								<div className="flex justify-between items-center text-xs font-semibold">
									<span>API Rate Limits</span>
									<span className="text-default-400">42% (420 req/s)</span>
								</div>
								<ProgressBar value={42} className="w-full" aria-label="API Rate Limits">
									<ProgressBar.Track className="w-full h-1.5 bg-default-100 dark:bg-default-50/55 rounded-full overflow-hidden">
										<ProgressBar.Fill className="h-full bg-primary transition-all duration-300" style={{ width: "42%" }} />
									</ProgressBar.Track>
								</ProgressBar>
							</div>

							<div className="flex flex-col gap-1.5">
								<div className="flex justify-between items-center text-xs font-semibold">
									<span>Token Encryption Load</span>
									<span className="text-default-400">18% utilization</span>
								</div>
								<ProgressBar value={18} className="w-full" aria-label="Token Encryption Load">
									<ProgressBar.Track className="w-full h-1.5 bg-default-100 dark:bg-default-50/55 rounded-full overflow-hidden">
										<ProgressBar.Fill className="h-full bg-success transition-all duration-300" style={{ width: "18%" }} />
									</ProgressBar.Track>
								</ProgressBar>
							</div>

							<div className="flex flex-col gap-1.5">
								<div className="flex justify-between items-center text-xs font-semibold">
									<span>Database Query Pools</span>
									<span className="text-default-400">82% capacity</span>
								</div>
								<ProgressBar value={82} className="w-full" aria-label="Database Query Pools">
									<ProgressBar.Track className="w-full h-1.5 bg-default-100 dark:bg-default-50/55 rounded-full overflow-hidden">
										<ProgressBar.Fill className="h-full bg-warning transition-all duration-300" style={{ width: "82%" }} />
									</ProgressBar.Track>
								</ProgressBar>
							</div>
						</CardContent>
					</Card>

					{/* Fast Security Check Widget */}
					<Card className="bg-content1/30 border border-default-100/50 backdrop-blur-md overflow-hidden relative">
						<div className="absolute top-[-20%] right-[-10%] -z-10 size-24 rounded-full bg-success-500/10 blur-xl pointer-events-none" />
						<CardContent className="p-5 flex flex-col gap-3.5 items-center text-center">
							<div className="size-11 rounded-full bg-success-500/10 border border-success-500/20 text-success flex items-center justify-center shadow-sm">
								<ShieldCheck className="size-5.5" />
							</div>
							<div className="flex flex-col gap-1">
								<span className="text-sm font-bold text-foreground">
									Better-Auth Protocol Active
								</span>
								<p className="text-[11px] text-default-400 leading-normal max-w-[220px]">
									All user cookies are cryptographically signed, sessions indexed, and database connections encrypted.
								</p>
							</div>
							<Link to="/settings/$path" params={{ path: "security" }} className="no-underline w-full">
								<Button
									variant="ghost"
									size="sm"
									className="font-bold text-xs mt-1 w-full text-success hover:bg-success/15 border border-success/20 bg-success/5"
								>
									Review Security Settings
								</Button>
							</Link>
						</CardContent>
					</Card>
				</div>
			</div>
		</AppLayout>
	);
}
