import React, { useEffect, useState } from "react";

const MonthNavigator = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    onDateChange(date);
  }, [date, onDateChange]);

  const goToPreviousMonth = () => {
    setDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1)
    );
  };

  const goToNextMonth = () => {
    setDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1)
    );
  };

  const formatDate = (date) => {
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  return (
    <div className="flex items-center justify-center bg-white px-8 py-4 mt-4 font-bold text-2xl">
      <button onClick={goToPreviousMonth} className=" mr-auto cursor-pointer">
        &larr; {/* Unicode character for left arrow */}
      </button>
      <div className=" font-bold text-xl">{formatDate(date)}</div>
      <button onClick={goToNextMonth} className="ml-auto cursor-pointer font-bold text-2xl">
        &rarr; {/* Unicode character for right arrow */}
      </button>
    </div>
  );
};

export default MonthNavigator;
