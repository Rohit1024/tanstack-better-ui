import { Link } from "@heroui/react";
import { ExternalLink, Github } from "lucide-react";
import { Logo } from "./logo";

export function Footer() {
	return (
		<footer className="border-t border-default-100 bg-background/50 backdrop-blur-md">
			<div className="max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row justify-between items-center gap-6">
				{/* Brand Section */}
				<div className="flex flex-col items-center md:items-start gap-2">
					<Link
						href="/"
						className="flex items-center gap-2 text-foreground no-underline hover:opacity-80 transition-opacity"
					>
						<Logo className="size-4" />
						<span className="font-bold tracking-tight text-sm text-foreground">
							Tanstack Better-Auth
						</span>
					</Link>
					<p className="text-xs text-default-400 text-center md:text-left">
						A premium authentication template built with TanStack & HeroUI.
					</p>
				</div>

				{/* Links Section */}
				<div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium text-default-500">
					<Link
						href="https://github.com"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1.5 text-default-500 hover:text-foreground no-underline"
					>
						<Github className="size-3.5" />
						<span>GitHub</span>
					</Link>
					<Link
						href="https://better-auth.com"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1 text-default-500 hover:text-foreground no-underline"
					>
						<span>Docs</span>
						<ExternalLink className="size-3" />
					</Link>
					<Link
						href="/settings/account"
						className="text-default-500 hover:text-foreground no-underline"
					>
						Account
					</Link>
					<Link
						href="#"
						className="text-default-500 hover:text-foreground no-underline"
					>
						Privacy
					</Link>
					<Link
						href="#"
						className="text-default-500 hover:text-foreground no-underline"
					>
						Terms
					</Link>
				</div>

				{/* Copyright */}
				<div className="text-center md:text-right">
					<p className="text-xs text-default-400">
						&copy; {new Date().getFullYear()} Better Auth UI. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
