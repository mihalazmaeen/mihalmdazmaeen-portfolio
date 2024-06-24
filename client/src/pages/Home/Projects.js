import React from "react";
import SectionTitle from "../../components/SectionTitle";

import { useSelector } from "react-redux";

function Projects() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { project } = portfolioData;

  const { title, period, image, description, link, technologies } = project;
  return (
    <div>
      <SectionTitle title="Projects" />

      <div className="flex py-10 gap-10 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-2 border-[#30817d8c] w-1/3 sm:flex-row sm:w-full sm:overflow-x-scroll">
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
            src={`http://localhost:5000/uploads/${project[selectedItemIndex].image}`}
            alt="Project"
            className="h-60 w-72"
          />
          <div className="flex flex-col gap-5">
            <h1 className="text-secondary text-xl">
              {project[selectedItemIndex].title}
            </h1>
            <p className="text-white">{project[selectedItemIndex].link}</p>
            <p className="text-white text-xl">
              {project[selectedItemIndex].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
