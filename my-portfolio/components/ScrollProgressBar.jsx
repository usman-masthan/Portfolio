"use client"

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show progress bar after scrolling down a bit
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left ${
        isVisible ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300`}
      style={{ scaleX: scrollYProgress }}
    />
  );
}