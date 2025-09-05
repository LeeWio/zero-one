import {
	Fira_Code as FontMono,
	Inter as FontSans,
	Righteous,
} from "next/font/google";

export const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const fontMono = FontMono({
	subsets: ["latin"],
	variable: "--font-mono",
});

export const fontRighteous = Righteous({
	subsets: ["latin"],
	variable: "--font-righteous",
	weight: "400",
});
