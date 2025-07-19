import React from "react";
import { StarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import timeFormat from "../lib/timeFormat";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="w-full flex flex-col justify-between overflow-hidden rounded-2xl bg-gray-800 p-3 shadow-sm"
    >
      {/* Poster */}
      <motion.img
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        onClick={() => {
          navigate(`/movies/${movie.id}`);
          scrollTo({ top: 0, behavior: "smooth" });
        }}
        src={movie.backdrop_path}
        alt={movie.title}
        className="h-52 w-full cursor-pointer rounded-lg object-cover object-right-bottom sm:h-60 md:h-64"
      />

      {/* Title */}
      <p className="mt-3 line-clamp-2 font-medium text-gray-300">{movie.title}</p>

      {/* Meta */}
      <p className="mt-1 text-sm text-gray-400">
        {new Date(movie.release_date).getFullYear()} · {movie.genres.slice(0, 2).map((g) => g.name).join(" | ")} · {timeFormat(movie.runtime)}
      </p>

      {/* Footer */}
      <div className="mt-4 mb-2 flex items-center justify-between gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            navigate(`/movies/${movie.id}`);
            scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/80"
        >
          Buy Tickets
        </motion.button>
        <p className="flex items-center gap-1 text-sm text-gray-400">
          <StarIcon className="h-4 w-4 text-yellow-400" /> {movie.vote_average.toFixed(1)} / 10
        </p>
      </div>
    </motion.div>
  );
};

export default MovieCard;
