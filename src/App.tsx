import React, { useState, useEffect } from "react";
import "./styles.css";

function calculateTimeLeft() {
  // const year = new Date("2022-07-31 00:00:00").getFullYear();
  const difference =
    +new Date("2022-07-31 00:00:00") - +new Date("2022-07-20 10:47:07");
  let timeLeft = {};
  console.log(difference);

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours:
        Math.floor((difference / (1000 * 60 * 60)) % 24) +
        Math.floor(Math.floor(difference / (1000 * 60 * 60 * 24)) * 60),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  return timeLeft;
}

export default function App() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const id = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  });

  const timerComponents = Object.keys(timeLeft).map((interval, index) => {
    if (!timeLeft[interval]) {
      return;
    }

    return (
      <span key={`key-${index}`}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  );
}
