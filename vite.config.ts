import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

const config = defineConfig({
	server: {
		port: 3000,
	},
	resolve: {
		tsconfigPaths: true,
	},
	ssr: {
		noExternal: ["@gravity-ui/icons", "@better-auth-ui/heroui"],
		external: ["kysely", "@better-auth/kysely-adapter"],
	},
	plugins: [
		devtools(),
		nitro({ rollupConfig: { external: [/^@sentry\//, "kysely", "@better-auth/kysely-adapter"] } }),
		tailwindcss(),
		tanstackStart(),
		viteReact(),
	],
});

export default config;
