import {
	Breadcrumbs,
	Button,
	Input,
	Tooltip,
} from "@heroui/react";
import { Link, useLocation } from "@tanstack/react-router";
import {
	Bell,
	Menu,
	Moon,
	Search,
	Sun,
	X,
} from "lucide-react";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { Sidebar } from "./sidebar";
import { UserButton } from "@better-auth-ui/heroui";

interface AppLayoutProps {
	children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
	const location = useLocation();
	const { theme, setTheme } = useTheme();

	// State for sidebar collapse (desktop)
	const [isCollapsed, setIsCollapsed] = useState(false);
	// State for sidebar drawer (mobile)
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	// Hydration mounting check
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);

	// Generate breadcrumbs based on route
	const getBreadcrumbs = () => {
		const pathSegments = location.pathname.split("/").filter(Boolean);
		if (pathSegments.length === 0) return [{ label: "Home", href: "/" }];

		return pathSegments.map((segment, idx) => {
			const href = "/" + pathSegments.slice(0, idx + 1).join("/");
			const label = segment
				.split("-")
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(" ");

			return { label, href };
		});
	};

	const breadcrumbs = getBreadcrumbs();

	return (
		<div className="flex h-screen w-screen overflow-hidden bg-background text-foreground animate-fade-in">
			{/* Desktop Sidebar (hidden on mobile) */}
			<Sidebar
				isCollapsed={isCollapsed}
				setIsCollapsed={setIsCollapsed}
				className="hidden md:flex"
			/>

			{/* Mobile Sidebar Slide-out Drawer */}
			{isMobileOpen && (
				<div className="fixed inset-0 z-50 flex md:hidden">
					{/* Backdrop */}
					<div
						className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
						onClick={() => setIsMobileOpen(false)}
					/>

					{/* Drawer Panel */}
					<div className="relative flex flex-col w-[280px] h-full">
						{/* Close button inside drawer */}
						<Button
							isIconOnly
							size="sm"
							variant="ghost"
							className="absolute top-4 right-[-50px] z-50 text-foreground bg-content1 border border-default-100 shadow-md rounded-xl"
							onClick={() => setIsMobileOpen(false)}
							aria-label="Close menu"
						>
							<X className="size-4" />
						</Button>

						<Sidebar
							isCollapsed={false}
							setIsCollapsed={() => {}}
							className="h-full border-r border-default-100 shadow-2xl"
						/>
					</div>
				</div>
			)}

			{/* Right-Side Dashboard Body Wrapper */}
			<div className="flex-1 flex flex-col h-full overflow-hidden">
				{/* Sticky Top Header / Navbar */}
				<header className="sticky top-0 z-10 h-16 border-b border-default-100/50 bg-background/70 backdrop-blur-md flex items-center justify-between px-4 md:px-6">
					<div className="flex items-center gap-3">
						{/* Mobile Hamburger toggle */}
						<Button
							isIconOnly
							variant="ghost"
							className="flex md:hidden text-default-500 hover:text-foreground"
							onClick={() => setIsMobileOpen(true)}
							aria-label="Open menu"
						>
							<Menu className="size-5" />
						</Button>

						{/* Sidebar expand toggle button (only visible when collapsed on desktop) */}
						{isCollapsed && (
							<Button
								isIconOnly
								variant="ghost"
								size="sm"
								className="hidden md:flex text-default-500 hover:text-foreground"
								onClick={() => setIsCollapsed(false)}
								aria-label="Expand sidebar"
							>
								<Menu className="size-4" />
							</Button>
						)}

						{/* Breadcrumbs for Page Location */}
						<div className="hidden sm:block">
							<Breadcrumbs aria-label="Breadcrumbs">
								{breadcrumbs.map((crumb, idx) => (
									<Breadcrumbs.Item key={idx}>
										<Link
											to={crumb.href as any}
											className="no-underline text-default-500 hover:text-foreground font-medium text-xs"
										>
											{crumb.label}
										</Link>
									</Breadcrumbs.Item>
								))}
							</Breadcrumbs>
						</div>
					</div>

					{/* Top Navbar Actions (Right Side) */}
					<div className="flex items-center gap-2.5">
						{/* Search Bar Placeholder */}
						<div className="hidden md:flex relative items-center w-48 lg:w-64">
							<Search className="absolute left-3 size-3.5 text-default-400 pointer-events-none" />
							<Input
								className="pl-8 bg-default-50/50 hover:bg-default-100/50 focus-within:bg-default-100/50 border border-default-100 shadow-inner rounded-xl w-full text-xs py-1.5 outline-none"
								placeholder="Search console..."
								aria-label="Search console"
							/>
						</div>

						{/* Notification bell widget */}
						<Tooltip>
							<Tooltip.Trigger>
								<Button
									isIconOnly
									variant="ghost"
									className="text-default-500 hover:text-foreground relative rounded-full"
									aria-label="View notifications"
								>
									<Bell className="size-4" />
									<span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-danger animate-pulse" />
								</Button>
							</Tooltip.Trigger>
							<Tooltip.Content className="bg-content1 border border-default-100 px-2 py-1 rounded-md text-xs shadow-md">
								Notifications
							</Tooltip.Content>
						</Tooltip>

						{/* Theme Selector Toggle */}
						<Tooltip>
							<Tooltip.Trigger>
								<Button
									isIconOnly
									variant="ghost"
									className="text-default-500 hover:text-foreground rounded-full"
									onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
									aria-label="Toggle light and dark themes"
								>
									{mounted && theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
								</Button>
							</Tooltip.Trigger>
							<Tooltip.Content className="bg-content1 border border-default-100 px-2 py-1 rounded-md text-xs shadow-md">
								{theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
							</Tooltip.Content>
						</Tooltip>

						{/* User Quick Profile Icon */}
						 <UserButton size="icon" aria-label="User menu" />
					</div>
				</header>

				{/* Scrollable Main Content Layout */}
				<main className="flex-1 overflow-y-auto bg-default-50/20 p-4 md:p-6 lg:p-8">
					<div className="max-w-7xl mx-auto flex flex-col gap-6">
						{children}
					</div>
				</main>
			</div>
		</div>
	);
}
