"use client"

import { useState } from "react";

export default function SkipLink() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <a
      href="#main-content"
      className={`
        fixed top-4 left-4 z-[200] bg-primary text-primary-foreground px-4 py-2 rounded-md
        transform transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50
        ${isFocused ? "translate-y-0" : "-translate-y-20"}
      `}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      Skip to main content
    </a>
  );
}