import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { MenuIcon, SearchIcon, XIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Movies", path: "/movies" },
  { label: "Theaters", path: "/theaters" },
  { label: "Releases", path: "/releases" },
  { label: "Favorite", path: "/favorite" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  /** underline animation */
  const Underline = ({ active }) => (
    <motion.span
      layoutId="underline"
      className="absolute left-0 -bottom-1 h-[2px] w-full rounded bg-primary"
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    />
  );

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
      className="fixed inset-x-0 top-0 z-50 text-white"
    >
      <div className="flex items-center justify-between px-6 md:px-12 lg:px-24 py-4">
        {/* Logo */}
        <Link to="/">
          <img src={assets.logo} alt="Logo" className="w-32 h-auto" />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-10 relative">
          {navLinks.map(({ label, path }) => {
            const active = pathname === path;
            return (
              <li key={path} className="relative">
                <Link
                  to={path}
                  className="font-medium"
                  onClick={() => scrollTo(0, 0)}
                >
                  <motion.span
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer"
                  >
                    {label}
                  </motion.span>
                </Link>
                {active && <Underline active />}
              </li>
            );
          })}
        </ul>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-6">
          <SearchIcon className="w-5 h-5 cursor-pointer hover:text-primary transition" />
          {!user ? (
            <motion.button
              onClick={openSignIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 cursor-pointer rounded-full bg-primary hover:bg-primary/80 transition font-medium"
            >
              Login
            </motion.button>
          ) : (
            <UserButton />
          )}
        </div>

        {/* Hamburger */}
        <MenuIcon
          onClick={() => setOpen(true)}
          className="md:hidden w-7 h-7 cursor-pointer"
        />
      </div>

      {/* Mobile Drawer */}
      <motion.aside
        initial={false}
        animate={open ? "open" : "closed"}
        variants={{
          open: { x: 0 },
          closed: { x: "-100%" },
        }}
        transition={{ type: "tween", duration: 0.25 }}
        className="fixed top-0 left-0 h-screen w-full bg-black/90 backdrop-blur flex flex-col items-center justify-center gap-8 text-2xl font-semibold md:hidden"
      >
        <XIcon
          onClick={() => setOpen(false)}
          className="absolute top-6 right-6 w-6 h-6 cursor-pointer"
        />
        {navLinks.map(({ label, path }) => (
          <motion.div
            key={path}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={path}
              onClick={() => {
                scrollTo(0, 0);
                setOpen(false);
              }}
              className="hover:text-primary transition"
            >
              {label}
            </Link>
          </motion.div>
        ))}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-6 py-2 bg-primary hover:bg-primary/80 rounded-full text-white transition"
        >
          Login
        </motion.button>
      </motion.aside>
    </motion.nav>
  );
};

export default Navbar;
