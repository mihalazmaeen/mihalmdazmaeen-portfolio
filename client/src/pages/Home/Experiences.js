import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";
import Typewriter from "typewriter-effect";

function Experiences() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { experience } = portfolioData;

  const { company, title, period, description } = experience;
  

  return (
    <div>
      <SectionTitle title={"Experience"} />
      <div className="flex py-10 gap-10 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-2 border-[#30817d8c] w-1/2 sm:flex-row sm:w-full sm:overflow-x-scroll">
          {experience.map((experience, index) => (
            <div
              key={index}
              onClick={() => setSelectedItemIndex(index)}
              className="cursor-pointer"
            >
              <h1
                className={`text-xl px-5
                ${
                  selectedItemIndex === index
                    ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[rgba(52,124,118,0.36)] py-3"
                    : "text-white"
                }`}
              >
                {experience.period}
              </h1>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-5 w-1/2">
          <h1 className="text-secondary text-xl">
            {experience[selectedItemIndex].title}
          </h1>
          <h1 className="text-tertiary text-xl">
            {experience[selectedItemIndex].company}
          </h1>
          <div className="text-white text-xl">
            <Typewriter
              options={{
                strings: experience[selectedItemIndex].description,
                autoStart: true,

                delay: 20,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Experiences;
