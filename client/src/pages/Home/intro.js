import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Typewriter from "typewriter-effect";

function Intro() {
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { intro } = portfolioData;
  const {
    firstName,
    lastName,
    designation,
    description,
    middleName,
    welcomeText,
  } = intro;

  return (
    <div className="h-[80vh] bg-primary flex flex-col items-start justify-center gap-8 py-10">
      <h1 className="text-white">
        <Typewriter
          options={{
            strings: welcomeText,
            autoStart: true,
            delay: 20,
          }}
        />
      </h1>
      <h1 className="text-7xl sm:text-3xl text-secondary font-semibold">
        <Typewriter
          options={{
            strings: firstName + " " + middleName + " " + lastName,
            autoStart: true,
            delay: 40,
          }}
        />
      </h1>
      <h1 className="text-6xl sm:text-2xl text-white font-semibold">
        <Typewriter
          options={{
            strings: designation,
            autoStart: true,

            delay: 90,
          }}
        />
      </h1>
      <p className="text-white">
        <Typewriter
          options={{
            strings: description,
            autoStart: true,

            delay: 80,
          }}
        />
      </p>
      <a
        href="https://drive.google.com/file/d/1FeDCQDqULFkGWSvZiOJE6baJWTmJ1CAA/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="relative inline-block"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500 rounded-lg blur-md animate-borderAnimation"></div>
        <button className="relative border-2 border-tertiary text-tertiary px-10 py-5 sm:px-5 sm:py-3 bg-primary rounded-lg">
          My Resume
        </button>
      </a>
    </div>
  );
}

export default Intro;
