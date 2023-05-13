"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import logo from "../../public/logo.svg";
import { useSelectedLayoutSegment } from "next/navigation";

const links = [
  { text: "Home", href: "/" },
  { text: "Contact", href: "contact" },
  { text: "UI design", href: "ui-design" },
];

export default function Nav() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const segment = useSelectedLayoutSegment();

  useEffect(() => {
    setIsDark(
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }, []);

  function handleToggleTheme() {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.toggle("dark");
    } else {
      document.documentElement.classList.toggle("dark");
    }

    if (isDark) {
      setIsDark(false);
      localStorage.theme = "light";
    } else {
      setIsDark(true);
      localStorage.theme = "dark";
    }
  }

  function activeLink(slug: string) {
    if (slug === segment || (slug === "/" && segment == null)) {
      return "font-bold bg-slate-300 dark:bg-slate-800";
    }
  }

  return (
    <nav className="flex justify-between text-slate-800 dark:text-slate-200">
      <Link href="/">
        <Image src={logo} alt="Home" className="w-10" />
      </Link>
      <ul className="hidden md:flex md:gap-4">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className={`${activeLink(
                link.href
              )} hover:bg-slate-300 dark:hover:bg-slate-800 px-4 py-2 rounded-lg transition`}
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex gap-5 md:gap-0">
        <button aria-label="Toggle dark mode" onClick={handleToggleTheme}>
          {isDark ? <Sun /> : <Moon />}
        </button>
        <button
          aria-label="Menu"
          className="text-primary-800 dark:text-primary-300"
          onClick={() => setIsMenuOpened(!isMenuOpened)}
        >
          <Menu />
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpened && (
          <motion.div
            className="absolute w-full top-20 left-0 flex flex-col gap-8 py-12 items-center opacity-0 text-2xl bg-slate-100 dark:bg-slate-900"
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {links.map((link, i) => {
              return (
                <motion.li
                  key={i}
                  className="list-none"
                  onClick={() => setIsMenuOpened(false)}
                  style={{ translateX: 50 }}
                  animate={{ translateX: 0 }}
                  transition={{ delay: i / 20 }}
                >
                  <Link href={link.href}>{link.text}</Link>
                </motion.li>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Menu() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 md:hidden"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

function Sun() {
  return (
    <svg
      height={24}
      width={24}
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

function Moon() {
  return (
    <svg
      height={24}
      width={24}
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );
}
