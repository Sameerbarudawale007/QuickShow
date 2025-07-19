import React, { useState } from 'react';
import { dummyTrailers } from '../assets/assets';
import ReactPlayer from 'react-player';
import BlurCircle from './BlurCircle';
import { PlayCircleIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const Trailer = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 md:px-10 lg:px-16 xl:px-32">
      <p className="mx-auto max-w-4xl text-center text-lg font-medium text-gray-300">Trailers</p>

      <div className="relative mt-8">
        <BlurCircle top="-100px" right="-100px" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative mx-auto w-full overflow-hidden rounded-2xl"
        >
          <div className="aspect-video w-full max-w-5xl mx-auto">
            <ReactPlayer
              src={currentTrailer.videoUrl}
              controls
              width="100%"
              height="100%"
              className="react-player"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl"
      >
        {dummyTrailers.map((trailer) => (
          <motion.div
            key={trailer.image}
            whileHover={{ scale: 1.05 }}
            onClick={() => setCurrentTrailer(trailer)}
            className="relative cursor-pointer overflow-hidden rounded-xl transition duration-300"
          >
            <img
              src={trailer.image}
              alt="trailer"
              className="h-48 w-full object-cover brightness-75 sm:h-52 md:h-56 lg:h-60"
            />
            <PlayCircleIcon
              strokeWidth={1.6}
              className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-white md:h-10 md:w-10 lg:h-12 lg:w-12"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Trailer;
