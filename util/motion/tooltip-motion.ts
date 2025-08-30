import { Variants } from 'framer-motion'

const tooltipVariants: Variants = {
  initial: {
    opacity: 0,
    y: 12,
    scale: 0.95,
    rotate: -2,
    filter: 'blur(2px)',
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.28,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.95,
    rotate: -2,
    filter: 'blur(2px)',
    transition: {
      duration: 0.22,
      ease: 'easeInOut',
      delay: 0.15,
    },
  },
}

export const tooltipMotionProps = {
  variants: tooltipVariants,
  initial: 'initial',
  animate: 'enter',
  exit: 'exit',
}
