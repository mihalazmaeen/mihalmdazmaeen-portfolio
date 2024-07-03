import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { skillIconMapping, skillColorMapping } from "../../utils/skillIcons";
import "../../utils/Projects.css"; // Keep this for animation

function Projects() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { project } = portfolioData;

  return (
    <div>
      <SectionTitle title="Projects" />
      <div className="flex py-10 gap-10 sm:flex-col">
        <div className="flex flex-col gap-10 w-1/4 sm:w-full sm:overflow-x-hidden max-h-[calc(4*5rem)] overflow-y-auto border-l-2 border-[#30817d8c]">
          {project.map((project, index) => (
            <div
              key={index}
              onClick={() => setSelectedItemIndex(index)}
              className="cursor-pointer"
            >
              <h1
                className={`text-xl px-5 ${
                  selectedItemIndex === index
                    ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[rgba(52,124,118,0.36)] py-3"
                    : "text-white"
                }`}
              >
                {project.title}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex flex-col w-3/4 gap-10 sm:w-full">
          <div className="flex gap-5">
            <div className="flex items-center justify-center w-1/3 h-72">
              <img
                src={project[selectedItemIndex].image}
                alt="Project"
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="flex flex-col gap-5 w-2/3 p-4 bg-gray-900 rounded-lg shadow-lg">
              <h1 className="text-secondary text-xl">
                {project[selectedItemIndex].title}
              </h1>
              <Link
                className="text-white"
                to={`${project[selectedItemIndex].link}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project[selectedItemIndex].link}
              </Link>
              <p className="text-white text-xl">
                {project[selectedItemIndex].description}
              </p>
              <div className="flex gap-3">
                {project[selectedItemIndex].technologies.map((tech, index) => (
                  <div key={index} className="flex items-center icon-container">
                    {skillIconMapping[tech.toLowerCase()] && (
                      <span
                        className="text-4xl mr-2 animated-icon"
                        style={{ color: skillColorMapping[tech.toLowerCase()] }}
                      >
                        {skillIconMapping[tech.toLowerCase()]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
