import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const DateSelect = ({ dateTime, id }) => {
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 150;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const navigate = useNavigate();

  const [selected, setSelected] = useState(null);

  const onBookHandler = () => {
    if (!selected) {
      return toast('Please select a date');
    }
    navigate(`/movies/${id}/${selected}`);
    scrollTo(0, 0);
  };

  return (
    <section className="relative px-4 sm:px-10 md:px-16 lg:px-40 pt-28 pb-20 overflow-hidden">

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-6xl mx-auto bg-gradient-to-br from-[#2b2b2b]/60 to-[#1c1c1c]/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg p-6 sm:p-10"
      >
        <h2 className="text-white text-xl font-semibold mb-6">Choose Date</h2>

        {/* Date Row */}
        <div className="flex items-center gap-3">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full hover:bg-white/10 transition text-white"
          >
            <ChevronLeftIcon size={24} />
          </button>

          {/* Scrollable Date List */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory px-1"
          >
            {Object.keys(dateTime).map((date, i) => {
              const d = new Date(date);
              return (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`min-w-[70px] shrink-0 snap-center border border-white/20 hover:border-red-500 bg-black/30 text-white rounded-lg py-2 px-3 text-center transition-all ${selected === date ? 'bg-primary text-white' : 'border-primary/70'}`}
                  onClick={() => setSelected(date)}
                >
                  <div className="text-md">{d.getDate()}</div>
                  <div className="text-xs">{d.toLocaleString('en-US', { month: 'short' })}</div>
                </motion.button>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full hover:bg-white/10 transition text-white"
          >
            <ChevronRightIcon size={24} />
          </button>
        </div>

        {/* Book Now Button */}
        <motion.button
        onClick={onBookHandler}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 ml-auto block cursor-pointer bg-[#e50914] hover:bg-[#ff3c3c] text-white px-6 py-2 rounded-full font-medium transition"
        >
          Book Now
        </motion.button>
      </motion.div>
    </section>
  );
};

export default DateSelect;
