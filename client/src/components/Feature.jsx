import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BlurCircle from "./BlurCircle";
import MovieCard from "./MovieCard";
import { useAppContext } from "../context/AppContext";

const Feature = () => {
  const navigate = useNavigate();
  const { shows } = useAppContext();

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <section className="relative mx-auto max-w-full overflow-hidden px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32">
      {/* Decorative blur */}
      <BlurCircle top="10" right="-80px" />

      {/* Heading */}
      <div className="flex items-center justify-between pt-20 pb-10">
        <p className="text-lg font-medium text-gray-300">Now Showing</p>
        <motion.button
          whileHover={{ x: 4 }}
          onClick={() => navigate("/movies")}
          className="group flex items-center gap-1 text-sm text-gray-300"
        >
          View All
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </div>

      {/* Movie grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {shows.slice(0, 4).map((show) => (
          <motion.div key={show._id} variants={item}>
            <MovieCard movie={show.movie} />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-20 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            navigate("/movies");
            scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="rounded-md bg-primary px-10 py-3 text-sm font-medium text-white transition-colors hover:bg-primary/80"
        >
          Show More
        </motion.button>
      </div>
    </section>
  );
};

export default Feature;
