import { AuthProvider } from "@better-auth-ui/heroui";
import {
	apiKeyPlugin,
	deleteUserPlugin,
	multiSessionPlugin,
	passkeyPlugin,
	themePlugin,
} from "@better-auth-ui/heroui/plugins";
import { Toast } from "@heroui/react";
import { useNavigate } from "@tanstack/react-router";
import { ThemeProvider, useTheme } from "next-themes";
import type { ReactNode } from "react";
import { authClient } from "@/lib/auth-client";

export function Providers({ children }: { children: ReactNode }) {
	const navigate = useNavigate();

	return (
		<ThemeProvider defaultTheme="system" enableSystem disableTransitionOnChange>
			<AuthProvider
				authClient={authClient}
				redirectTo="/dashboard"
				socialProviders={["github"]}
				navigate={navigate}
				plugins={[
					apiKeyPlugin(),
					passkeyPlugin(),
					deleteUserPlugin(),
					themePlugin({ useTheme }),
					multiSessionPlugin(),
				]}
			>
				{children}

				<Toast.Provider />
			</AuthProvider>
		</ThemeProvider>
	);
}
