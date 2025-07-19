import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import BlurCircle from "../components/BlurCircle";
import { Heart, PlayCircleIcon, StarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import timeFormat from "../lib/timeFormat";
import DateSelect from "../components/DateSelect";
import MovieCard from "../components/MovieCard";
import { motion } from "framer-motion";

const MovieDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const navigate = useNavigate();
  const castScrollRef = useRef(null);

  // ────────────────────────────────────────────────────────────
  // Fetch movie data
  // ────────────────────────────────────────────────────────────
  const getShow = async () => {
    const match = dummyShowsData.find((s) => s.id === parseInt(id));
    if (match) {
      setShow({ movie: match, dateTime: dummyDateTimeData });
    }
  };

  useEffect(() => {
    getShow();
  }, [id]);

  // ────────────────────────────────────────────────────────────
  // Smooth‑scroll to date section
  // ────────────────────────────────────────────────────────────
  const scrollToDate = () => {
    // ensure DOM is rendered first
    requestAnimationFrame(() => {
      const dateSection = document.getElementById("dateSelect");
      if (dateSection) {
        dateSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  };

  // ────────────────────────────────────────────────────────────
  // Cast carousel helpers
  // ────────────────────────────────────────────────────────────
  const scrollCast = (dir) => {
    if (!castScrollRef.current) return;
    const amount = 150;
    castScrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  // ────────────────────────────────────────────────────────────
  // Render
  // ────────────────────────────────────────────────────────────
  return show ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="px-6 md:px-16 lg:px-40 pt-28 pb-20"
    >
      {/* ── Top section ─────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row gap-10 max-w-6xl mx-auto">
        <motion.img
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          src={show.movie.poster_path}
          alt="poster"
          className="max-md:mx-auto rounded-xl h-104 max-w-72 object-cover shadow-lg"
        />

        <div className="relative flex flex-col gap-4 text-white">
          <BlurCircle top="-100px" left="-100px" />
          <p className="text-primary text-sm">ENGLISH</p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight max-w-xl">
            {show.movie.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-300">
            <StarIcon className="w-5 h-5 text-primary fill-primary" />
            {show.movie.vote_average.toFixed(1)} User Rating
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            {show.movie.overview}
          </p>
          <p className="text-gray-400 text-sm">
            {timeFormat(show.movie.runtime)} • {show.movie.genres.map((g) => g.name).join(", ")} • {show.movie.release_date.split("-")[0]}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <button className="flex items-center gap-2 hover:text-primary transition cursor-pointer">
              <PlayCircleIcon className="w-5 h-5" /> Watch Trailer
            </button>
            <button id="dateSelect"
              onClick={scrollToDate}
              className="text-sm bg-primary hover:bg-primary/80 px-4 py-2 rounded-full text-white shadow-md cursor-pointer"
            >
              Buy Tickets
            </button>
            <button className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition cursor-pointer">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Cast carousel ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12"
      >
        <h2 className="text-lg font-semibold text-white mb-4">Your Favorite Cast</h2>
        <div className="relative">
          {/* arrows (show on mobile) */}
          <button
            onClick={() => scrollCast("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full backdrop-blur hover:bg-black/70 md:hidden"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollCast("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full backdrop-blur hover:bg-black/70 md:hidden"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>

          <div
            ref={castScrollRef}
            className="flex gap-4 overflow-x-auto no-scrollbar pb-4 scroll-smooth snap-x snap-mandatory"
          >
            {show.movie.casts.map((cast,idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center text-white shrink-0 snap-center"
              >
                <img
                  src={cast.profile_path}
                  alt={cast.name}
                  className="h-20 w-20 object-cover rounded-full border border-white/20 shadow"
                />
                <p className="text-xs mt-2 whitespace-nowrap max-w-[80px] overflow-hidden text-ellipsis">
                  {cast.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Date selection ─────────────────────────────────── */}
      <DateSelect dateTime={show.dateTime} id={id} />

      {/* ── Recommendations ───────────────────────────────── */}
      <div className="mt-16">
        <h2 className="text-lg font-semibold text-white mb-4">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {dummyShowsData.slice(0, 4).map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => {
              navigate("/movies");
              scrollTo(0, 0);
            }}
            className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/80 transition cursor-pointer"
          >
            Load More
          </button>
        </div>
      </div>
    </motion.div>
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center h-[80vh] text-white"
    >
      <motion.div
        className="text-center text-lg font-semibold"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
      >
        Loading movie details...
      </motion.div>
    </motion.div>
  );
};

export default MovieDetails;
