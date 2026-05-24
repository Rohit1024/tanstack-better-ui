import { UserButton } from "@better-auth-ui/heroui";
import { Link } from "@heroui/react";
import { Logo } from "./logo";

export function Header() {
	return (
		<header className="sticky top-0 z-10 bg-background border-b">
			<div className="py-3 px-4 md:px-6 mx-auto justify-between flex items-center">
				<Link href="/" className="flex items-center gap-2.5 no-underline" aria-label="Tanstack Better-Auth Home">
					<Logo />

					<h1 className="text-base font-bold tracking-tight text-foreground">
						Tanstack Better-Auth
					</h1>
				</Link>

				<UserButton size="icon" aria-label="User menu" />
			</div>
		</header>
	);
}
