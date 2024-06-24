import React from "react";
import SectionTitle from "../../components/SectionTitle";

import { useSelector } from "react-redux";

function Academics() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { education } = portfolioData;

  const { stage, level, institution, graduated } = education;

  return (
    <div>
      <SectionTitle title={"Education"} />
      <div className="flex py-10 gap-10 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-2 border-[#30817d8c] w-1/3 sm:flex-row sm:w-full sm:overflow-x-scroll">
          {education.map((edu, index) => (
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
                {edu.stage}
              </h1>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="text-secondary text-xl">
            {education[selectedItemIndex].institution}
          </h1>
          <h1 className="text-tertiary text-xl">
            {education[selectedItemIndex].level}
          </h1>
          <p className="text-white">
            Date of Completion: {education[selectedItemIndex].graduated}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Academics;
