"use client"
import { motion } from "framer-motion"
export default function Template({ children }) {
    return (
        <motion.div initial={{ opacity: 0.2 }} animate={{ opacity: 100 }} transition={{ duration: 0.5 }}>
            {children}
        </motion.div>)
}
