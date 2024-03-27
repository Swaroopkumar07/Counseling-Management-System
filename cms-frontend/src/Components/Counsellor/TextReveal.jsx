import React, { useState, useEffect } from 'react';

const TextReveal = ({ index, interval }) => {
  const [visibleLetters, setVisibleLetters] = useState(0);
  const text = [
    "Empowerment Awaits: Your Guidance Can Shape Student Destinies!",
    "Be the Beacon: Illuminate Student Paths with Your Compassionate Insight!",
    "Your Wisdom, Their Future: Dive In and Make a Difference Today!",
    "Unlock Potential: Your Counseling Holds the Key to Student Success!",
    "Inspire, Empathize, Transform: Your Counseling Can Spark Student Growth!",
    "Make Every Moment Count: Your Guidance Can Change Lives!",
    "Your Voice, Their Strength: Let Your Counseling Echo with Hope and Empowerment!",
    "From Counselor to Champion: Your Support Can Shape Brighter Tomorrows!",
    "Guide with Grace: Your Counseling Touches Hearts and Shapes Futures!",
    "Every Interaction Matters: Your Counseling Can Be the Turning Point for Students in Need!"
  ]
  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLetters((prevCount) => {
        // Incrementally reveal each letter
        if (prevCount < text[index].length) {
          return prevCount + 1;
        } else {
          clearInterval(timer); // Stop the timer when all letters are revealed
          return prevCount;
        }
      });
    }, interval);

    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(timer);
  }, [text[index], interval]);

  return (
    <span style={{width:"100%",fontWeight:'500',fontSize:'1.1rem',textAlign:'center'}}>
      {text[index].slice(0, visibleLetters)} {/* Display only the visible letters */}
    </span>
  );
};

export default TextReveal;
