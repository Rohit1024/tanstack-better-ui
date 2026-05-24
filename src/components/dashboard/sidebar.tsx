import {
	Button,
	Input,
	Kbd,
	ScrollShadow,
	Tooltip,
} from "@heroui/react";
import { Link, useLocation } from "@tanstack/react-router";
import {
	ChevronLeft,
	Database,
	FolderGit2,
	KeyRound,
	LayoutDashboard,
	Search,
	ShieldCheck,
	UserCog,
	Users,
} from "lucide-react";
import { useState } from "react";
import { Logo } from "../logo";
import { UserButton } from "@better-auth-ui/heroui";

interface SidebarProps {
	isCollapsed: boolean;
	setIsCollapsed: (collapsed: boolean) => void;
	className?: string;
}

interface MenuItem {
	label: string;
	icon: any;
	to: any;
	params?: { path: string };
	badge?: string;
}

interface MenuSection {
	title: string;
	items: MenuItem[];
}

export function Sidebar({ isCollapsed, setIsCollapsed, className = "" }: SidebarProps) {
	const location = useLocation();
	const [searchQuery, setSearchQuery] = useState("");

	const menuSections: MenuSection[] = [
		{
			title: "Overview",
			items: [
				{
					label: "Dashboard",
					icon: LayoutDashboard,
					to: "/dashboard" as any,
				},
				{
					label: "Projects",
					icon: FolderGit2,
					to: "/dashboard" as any,
					badge: "New",
				},
			],
		},
		{
			title: "Account & Security",
			items: [
				{
					label: "Account Details",
					icon: UserCog,
					to: "/settings/$path" as any,
					params: { path: "account" },
				},
				{
					label: "API Keys",
					icon: KeyRound,
					to: "/settings/$path" as any,
					params: { path: "api-keys" },
				},
				{
					label: "Active Sessions",
					icon: ShieldCheck,
					to: "/settings/$path" as any,
					params: { path: "sessions" },
				},
			],
		},
		{
			title: "Organization",
			items: [
				{
					label: "Team Members",
					icon: Users,
					to: "/settings/$path" as any,
					params: { path: "account" },
				},
				{
					label: "Database Config",
					icon: Database,
					to: "/settings/$path" as any,
					params: { path: "account" },
				},
			],
		},
	];

	return (
		<aside
			className={`relative z-20 flex flex-col h-screen bg-content1/40 backdrop-blur-xl border-r border-default-100/60 transition-all duration-300 ease-in-out select-none ${
				isCollapsed ? "w-[72px]" : "w-[280px]"
			} ${className}`}
		>
			{/* Top Branding Header */}
			<div className="flex items-center justify-between h-16 px-4 border-b border-default-100/50">
				<Link
					to="/"
					className="flex items-center gap-3 no-underline transition-transform duration-200 hover:scale-[1.02]"
				>
					<div className="flex items-center justify-center size-9 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 shadow-inner">
						<Logo className="size-5" />
					</div>
					{!isCollapsed && (
						<div className="flex flex-col">
							<span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 leading-none">
								Better UI
							</span>
							<span className="text-[10px] text-default-400 font-semibold mt-0.5 leading-none">
								v1.6 Platform
							</span>
						</div>
					)}
				</Link>

				{/* Desktop Collapse Toggle Button */}
				{!isCollapsed && (
					<Button
						isIconOnly
						size="sm"
						variant="ghost"
						className="hidden md:flex text-default-400 hover:text-foreground"
						onClick={() => setIsCollapsed(true)}
						aria-label="Collapse sidebar"
					>
						<ChevronLeft className="size-4" />
					</Button>
				)}
			</div>

			{/* Search Input Section */}
			{!isCollapsed ? (
				<div className="px-4 py-3 relative flex items-center">
					<Search className="absolute left-7 size-4 text-default-400 pointer-events-none" />
					<Input
						className="pl-8 pr-12 bg-default-50/50 hover:bg-default-100/50 focus-within:bg-default-100/50 border border-default-100 shadow-inner rounded-xl w-full text-xs py-1.5 outline-none"
						placeholder="Quick Search..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						aria-label="Quick Search"
					/>
					<div className="absolute right-7 flex items-center">
						<Kbd>⌘K</Kbd>
					</div>
				</div>
			) : (
				<div className="flex justify-center py-4">
					<Tooltip>
						<Tooltip.Trigger>
							<Button
								isIconOnly
								size="sm"
								variant="ghost"
								className="bg-default-50/50 border border-default-100"
								aria-label="Quick Search"
							>
								<Search className="size-4 text-default-400" />
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content className="bg-content1 border border-default-100 px-2 py-1 rounded-md text-xs shadow-md">
							Search (⌘K)
						</Tooltip.Content>
					</Tooltip>
				</div>
			)}

			{/* Main Scrollable Navigation Links */}
			<ScrollShadow className="flex-1 px-3 py-2">
				<div className="flex flex-col gap-6">
					{menuSections.map((section, idx) => {
						const filteredItems = section.items.filter((item) =>
							item.label.toLowerCase().includes(searchQuery.toLowerCase())
						);

						if (filteredItems.length === 0) return null;

						return (
							<div key={idx} className="flex flex-col gap-1.5">
								{!isCollapsed && (
									<span className="px-3 text-[10px] font-bold uppercase tracking-wider text-default-400/80">
										{section.title}
									</span>
								)}
								<div className="flex flex-col gap-0.5">
									{filteredItems.map((item, itemIdx) => {
										const Icon = item.icon;
										const isActive =
											location.pathname === item.to ||
											(item.params &&
												location.pathname.includes(item.params.path));
										const linkElement = (
											<Link
												to={item.to}
												params={item.params as any}
												className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 no-underline group select-none ${
													isActive
														? "bg-primary text-primary-foreground shadow-md shadow-primary-500/10"
														: "text-default-500 hover:text-foreground hover:bg-default-50/70"
												}`}
												aria-label={item.label}
											>
												<Icon
													className={`size-4 shrink-0 transition-transform group-hover:scale-105 duration-200 ${
														isActive ? "text-primary-foreground" : "text-default-400 group-hover:text-foreground"
													}`}
												/>
												{!isCollapsed && (
													<span className="grow leading-none">
														{item.label}
													</span>
												)}
												{!isCollapsed && item.badge && (
													<span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-secondary/20 text-secondary border border-secondary-100/10">
														{item.badge}
													</span>
												)}
											</Link>
										);

										if (isCollapsed) {
											return (
												<Tooltip key={itemIdx}>
													<Tooltip.Trigger>
														{linkElement}
													</Tooltip.Trigger>
													<Tooltip.Content className="bg-content1 border border-default-100 px-2 py-1 rounded-md text-xs shadow-md">
														{item.label}
													</Tooltip.Content>
												</Tooltip>
											);
										}

										return <div key={itemIdx}>{linkElement}</div>;
									})}
								</div>
							</div>
						);
					})}
				</div>
			</ScrollShadow>

			<div className={`p-3 border-t border-default-100/50 bg-default-50/10 flex transition-all duration-300 ${isCollapsed ? "justify-center" : "justify-start"}`}>
				<UserButton size={isCollapsed ? "icon" : undefined} aria-label="User menu" />
			</div>
		</aside>
	);
}
