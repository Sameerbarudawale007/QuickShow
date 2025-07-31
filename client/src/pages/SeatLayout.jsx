import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import isoTimeFormat from "../lib/isoTimeFormat";
import BlurCircle from "../components/BlurCircle";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const SeatLayout = () => {
  const groupRows = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"],
  ];

  const { id, date } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const navigate = useNavigate();
  const { axios, getToken, user } = useAppContext();
  const [occupiedSeats, setOccupiedSeats] = useState([]);

  const sanitizeDate = (dateStr) => {
    if (!dateStr) return null;
    const decoded = decodeURIComponent(dateStr).replace(" GM", " GMT");
    const parsed = new Date(decoded);
    return isNaN(parsed.getTime()) ? null : parsed;
  };

  const parsedDate = sanitizeDate(date);

  useEffect(() => {
    const getShow = async () => {
      try {
        const { data } = await axios.get(`/api/show/${id}`);
        if (data.success) {
          setShow(data);
        }
      } catch (error) {
        console.error("Error fetching show:", error);
      }
    };
    getShow();
  }, [id]);

  const getOccupiedSeats = async () => {
    try {
      const { data } = await axios.get(
        `/api/booking/seats/${selectedTime.showId}`
      );
      if (data.success) {
        setOccupiedSeats(data.occupiedSeats);
      } else {
        toast.error(data.message || "Failed to fetch occupied seats");
      }
    } catch (error) {
      console.error("Error fetching occupied seats:", error);
    }
  };

  const handleSeatClick = (seatId) => {
    if (!selectedTime) return toast("Please select time first");
    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5)
      return toast("You can only select up to 5 seats");
    if (occupiedSeats.includes(seatId))
      return toast("This seat is already taken");

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  // const bookTickets = async () => {
  //   try {
  //     if (!user) return toast.error("Please login to book tickets");
  //     if (!selectedTime || selectedSeats.length === 0) {
  //       return toast.error("Please select time and seats to book");
  //     }

  //     const { data } = await axios.post(
  //       "/api/booking/create",
  //       { user: user._id, showId: selectedTime.showId, selectedSeats },
  //       {
  //         headers: { Authorization: `Bearer ${getToken()}` },
  //       }
  //     );
  //     if (data.success) {
  //       toast.success("Tickets booked successfully");
  //       navigate("/my-bookings");
  //     } else {
  //       toast.error(data.message || "Failed to book tickets");
  //     }
  //   } catch (error) {
  //     console.error("Error booking tickets:", error);
  //     toast.error("Failed to book tickets");
  //   }
  // };

const bookTickets = async () => {
  try {
    if (!user) return toast.error("Please login to book tickets");
    if (!selectedTime || selectedSeats.length === 0) {
      return toast.error("Please select time and seats to book");
    }

    const token = await getToken(); // important!

    const { data } = await axios.post(
      "/api/booking/create",
      { user: user._id, showId: selectedTime.showId, selectedSeats },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (data.success) {
      toast.success("Tickets booked successfully");
      navigate("/my-bookings");
    } else {
      toast.error(data.message || "Failed to book tickets");
    }
  } catch (error) {
    console.error("Error booking tickets:", error);
    toast.error("Failed to book tickets");
  }
};




  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;
          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              className={`h-8 w-8 rounded border border-primary/60 cursor-pointer ${
                selectedSeats.includes(seatId) && "bg-primary text-white"
              } ${occupiedSeats.includes(seatId) && "opacity-50"}`}
            >
              {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );

  useEffect(() => {
    if (selectedTime) {
      getOccupiedSeats();
    }
  }, [selectedTime]);

  return show ? (
    <div className="flex flex-col md:flex-row md:px-16 lg:px-40 px-6 py-30">
      {/* Time Selection Panel */}
      <div className="w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30">
        <p className="text-lg font-semibold px-6">Available Timing</p>
        <div className="mt-5 space-y-1 px-4">
          {(show.dateTime?.[date] || []).map((timeObj, index) => {
            const parsedDate = new Date(
              timeObj.time.replace(" GM", " GMT")
            );
            return (
              <div
                key={index}
                onClick={() => setSelectedTime(timeObj)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer transition-colors ${
                  selectedTime?.time === timeObj.time
                    ? "bg-primary text-white"
                    : "hover:bg-primary/20 text-white/80"
                }`}
              >
                <ClockIcon className="w-4 h-4" />
                <p className="text-sm font-medium">
                  {parsedDate.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Seat Selection */}
      <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="0px" right="0px" />
        <h1 className="text-2xl font-semibold mb-4">Select Your Seat</h1>
        {selectedTime && (
          <p className="text-md text-gray-200 mb-4">
            Selected Time:{" "}
            <span className="text-white font-medium">
              {isoTimeFormat(selectedTime.time)}
            </span>
          </p>
        )}
        <img src={assets.screenImage} alt="screen" />
        <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>
        <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
            {groupRows[0].map((row) => renderSeats(row))}
          </div>
          <div className="grid grid-cols-2 gap-11">
            {groupRows.slice(1).map((group, idx) => (
              <div key={idx}>{group.map((row) => renderSeats(row))}</div>
            ))}
          </div>
        </div>
        <button
          onClick={bookTickets}
          className="flex items-center gap-2 mt-6 bg-primary text-white py-2 px-4 rounded-md cursor-pointer"
        >
          Proceed to Checkout
          <ArrowRightIcon strokeWidth={3} className="w-4 h-4" />
        </button>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default SeatLayout;