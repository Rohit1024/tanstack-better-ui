import type { ComponentPropsWithRef } from "react";

export function Logo(props: ComponentPropsWithRef<"svg">) {
	return (
		<svg
			className="size-5"
			fill="none"
			viewBox="0 0 60 45"
			xmlns="http://www.w3.org/2000/svg"
			aria-label="Tanstack Better-Auth"
			role="img"
			{...props}
		>
			{/* Left bar - Cyan */}
			<rect x="0" y="0" width="15" height="45" rx="3" fill="#06b6d4" />
			{/* Right bar - Purple */}
			<rect x="45" y="0" width="15" height="45" rx="3" fill="#8b5cf6" />
			{/* Top box - Amber */}
			<rect x="20" y="0" width="20" height="15" rx="2" fill="#f59e0b" />
			{/* Bottom box - Rose */}
			<rect x="20" y="30" width="20" height="15" rx="2" fill="#f43f5e" />
		</svg>
	);
}
