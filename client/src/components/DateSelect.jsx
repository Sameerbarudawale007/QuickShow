import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const DateSelect = ({ dateTime, id }) => {
  const scrollRef = React.useRef(null);
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 150;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const sanitizeDate = (dateStr) => {
    const decoded = decodeURIComponent(dateStr);
    const cleaned = decoded.replace(' GM', ' GMT'); // Fix timezone typo if present
    const parsed = new Date(cleaned);
    return isNaN(parsed.getTime()) ? null : parsed;
  };

  const formatToISODateTime = (dateStr) => {
    const parsed = sanitizeDate(dateStr);
    return parsed ? parsed.toISOString() : null;
  };

  const onBookHandler = () => {
    if (!selected) {
      return toast('Please select a date and time');
    }
    const isoDateTime = formatToISODateTime(selected);
    if (!isoDateTime) {
      return toast('Invalid date-time selected');
    }
    // navigate(`/movies/${id}/${isoDateTime}`);
    navigate(`/movies/${id}/${selected}`);
    scrollTo(0, 0);
  };

  return (
    <section className="relative px-4 sm:px-10 md:px-16 lg:px-40 pt-28 pb-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-6xl mx-auto bg-gradient-to-br from-[#2b2b2b]/60 to-[#1c1c1c]/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg p-6 sm:p-10"
      >
        <h2 className="text-white text-xl font-semibold mb-6">Choose Date & Time</h2>

        <div className="flex items-center gap-3">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full hover:bg-white/10 transition text-white"
          >
            <ChevronLeftIcon size={24} />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory px-1"
          >
            {Object.keys(dateTime).map((dateStr, i) => {
              const parsedDate = sanitizeDate(dateStr);
              if (!parsedDate) return <div key={i}>Invalid date format</div>;

              return (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`min-w-[70px] shrink-0 snap-center border border-white/20 hover:border-red-500 bg-black/30 text-white rounded-lg py-2 px-3 text-center transition-all ${
                    selected === dateStr ? 'bg-primary text-white' : 'border-primary/70'
                  }`}
                  onClick={() => setSelected(dateStr)}
                >
                  <div className="text-md">{parsedDate.getDate()}</div>
                  <div className="text-xs">
                    {parsedDate.toLocaleString('en-US', { month: 'short' })}
                  </div>
                  <div className="text-[10px] text-white/70">
                    {parsedDate.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </div>
                </motion.button>
              );
            })}
          </div>

          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full hover:bg-white/10 transition text-white"
          >
            <ChevronRightIcon size={24} />
          </button>
        </div>

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