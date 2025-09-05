"use client";

import { motion } from "framer-motion";

const letters = ["w", "e", "i", ".", "l", "i", "\u00A0", "?"];

export default function AboutPage() {
	return (
		<>
			<motion.div
				className="font-rightous flex flex-col text-center justify-center items-center text-7xl sm:text-9xl cursor-default uppercase"
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
			>
				<motion.span
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
				>
					who's
				</motion.span>

				<div className="flex gap-1">
					{letters.map((char, i) => (
						<motion.span
							key={i}
							initial={{ opacity: 0, y: 30, scale: 0.8 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							transition={{
								delay: 0.5 + i * 0.1,
								duration: 0.5,
								type: "spring",
								stiffness: 300,
							}}
						>
							{char}
						</motion.span>
					))}
				</div>
			</motion.div>
		</>
	);
}
