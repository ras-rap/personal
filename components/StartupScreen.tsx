import { useEffect } from "react";
import { motion } from "framer-motion";

export default function StartupScreen({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2000); // 2 seconds delay
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="h-screen w-screen bg-midnightBlack flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-white text-4xl font-bold mb-4"
      >
        Ras OS
      </motion.div>
      <motion.div
        className="w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
      />
    </div>
  );
}
