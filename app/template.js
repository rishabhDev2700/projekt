"use client"
import { motion } from "framer-motion"
export default function Template({ children }) {
    return (
        <motion.div animate={{ opacity: [0, 1] }} transition={{ duration: 0.5 }}>
            {children}
        </motion.div>)
}
