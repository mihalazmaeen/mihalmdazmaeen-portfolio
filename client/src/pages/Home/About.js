import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";
import {skillIconMapping, skillColorMapping} from "../../utils/skillIcons";

function About() {
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { about } = portfolioData;

  const { aboutIntro, skillTitle, skills, image } = about;

  return (
    <div>
      <SectionTitle title="About" />
      <div className="flex w-full items-center sm:flex-col">
        <div className="h-[70vh] w-1/2 sm:w-full mb-3">
          <img
            src={image} // Directly use the URL stored in the image variable
            alt="mihal"
            height={400}
            width={300}
            style={{ background: "transparent" }}
          />
        </div>

        <div className="flex flex-col gap-5 w-1/2 sm:w-full">
          <p className="text-white">{aboutIntro || ""}</p>
        </div>
      </div>
      <div className="py-5">
        <h1 className="text-white text-xl">{skillTitle || ""}</h1>
        <div className="flex flex-wrap gap-10 mt-5">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="border border-white py-3 px-5 flex items-center"
            >
              {skillIconMapping[skill.toLowerCase()] ? (
                <span
                  className="text-2xl mr-2"
                  style={{ color: skillColorMapping[skill.toLowerCase()] }}
                >
                  {skillIconMapping[skill.toLowerCase()]}
                </span>
              ) : (
                <div className="w-6 h-6 rounded-full bg-gray-400 mr-2"></div>
              )}
              <h1 className="text-tertiary">{skill}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
