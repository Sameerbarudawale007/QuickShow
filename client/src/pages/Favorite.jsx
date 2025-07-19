import React from 'react';
import { dummyShowsData } from '../assets/assets';
import MovieCard from '../components/MovieCard';
import BlurCircle from '../components/BlurCircle';
import { motion } from 'framer-motion';

// ✨ Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const Favorite = () => {
  // ───── Empty‑state ─────
  if (!dummyShowsData?.length)
    return (
      <section className="flex items-center justify-center min-h-[80vh] px-6 md:px-16 lg:px-40 xl:px-44">
        <h1 className="text-lg font-medium">No movies found</h1>
      </section>
    );

  // ───── Main grid ─────
  return (
    <section className="relative pt-32 pb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]">
      {/* Floating blur accents */}
      <BlurCircle top="150px" left="0px" />
      <BlurCircle bottom="50px" right="50px" />

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        className="text-xl md:text-2xl font-semibold mb-8"
      >
        Your Favorite Movies
      </motion.h1>

      {/* Card grid with stagger */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {dummyShowsData.map((movie, i) => (
          <motion.div key={i} variants={item}>
            <MovieCard movie={movie} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Favorite;
