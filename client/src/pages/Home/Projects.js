import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { skillIconMapping, skillColorMapping } from "../../utils/skillIcons";
import "../../utils/Projects.css";

function Projects() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { project } = portfolioData;

  const { title, period, image, description, link, technologies } = project;

  return (
    <div>
      <SectionTitle title="Projects" />

      <div className="flex py-10 gap-10 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-2 border-[#30817d8c] w-full sm:w-full sm:overflow-x-hidden max-h-[calc(4*5rem)] overflow-y-auto">
          {project.map((project, index) => (
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
                {project.title}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-10 sm:flex-col">
          <img
            src={project[selectedItemIndex].image} // Use the image URL directly
            alt="Project"
            className="h-60 w-72"
          />
          <div className="flex flex-col gap-5">
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
                <div key={index} className="flex items-center animated-icon">
                  {skillIconMapping[tech.toLowerCase()] && (
                    <span
                      className="text-4xl mr-2"
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
  );
}

export default Projects;
