import React from "react";
import { assets } from "../assets/assets";
import { ArrowRight, Calendar1Icon, ClockIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const navigate = useNavigate();

  return (
    <section className="relative flex items-center justify-start h-[100dvh] overflow-hidden pl-6 sm:pl-12 md:pl-20 lg:pl-36">
      {/* Background Image */}
      <img
        src="/backgroundImage.png"
        alt="Guardians background"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />

      {/* Softer overlay for contrast but visible background */}
      <div className="absolute inset-0 -z-10 bg-black/30" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex max-w-2xl flex-col gap-6 text-white"
      >
        <motion.img
          src={assets.marvelLogo}
          alt="Logo"
          className="h-10 sm:h-12 md:h-14"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />

        <motion.h1
          className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Guardians <br className="hidden sm:block" /> of the Galaxy
        </motion.h1>

        <motion.div
          className="flex flex-wrap items-center gap-4 text-sm text-gray-200 sm:text-base"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <span>Action&nbsp;|&nbsp;Adventure&nbsp;|&nbsp;Sci‑Fi</span>
          <span className="flex items-center gap-1">
            <Calendar1Icon className="h-4 w-4" /> 2018
          </span>
          <span className="flex items-center gap-1">
            <ClockIcon className="h-4 w-4" /> 2h&nbsp;8m
          </span>
        </motion.div>

        <motion.p
          className="max-w-prose text-sm text-gray-200 sm:text-base md:text-lg"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Marvel’s Guardians of the Galaxy follows a group of intergalactic
          misfits who band together to protect a powerful artifact from falling
          into the wrong hands, discovering the true meaning of family along the
          way.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/movies")}
          className="mt-2 inline-flex w-max items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
        >
          Explore Movies
          <ArrowRight className="h-5 w-5" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Header;
