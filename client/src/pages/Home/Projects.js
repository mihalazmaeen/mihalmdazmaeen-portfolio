import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { skillIconMapping, skillColorMapping } from "../../utils/skillIcons";
import { motion } from "framer-motion";
import "../../utils/Projects.css"; // Keep this for animation

function Projects() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { project } = portfolioData;

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

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
          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ duration: 0.5 }}
            key={selectedItemIndex}
          >
            <div className="flex gap-5">
              <div className="flex items-center justify-center w-1/3 h-72">
                <motion.img
                  src={project[selectedItemIndex].image}
                  alt="Project"
                  className="max-w-full max-h-full object-contain"
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                  transition={{ duration: 0.5, delay: 0.1 }}
                />
              </div>
              <div className="flex flex-col gap-5 w-2/3 p-4 bg-gray-900 rounded-lg shadow-lg">
                <motion.h1
                  className="text-secondary text-xl"
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {project[selectedItemIndex].title}
                </motion.h1>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Link
                    className=" text-tertiary hover:underline"
                    to={`${project[selectedItemIndex].link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project[selectedItemIndex].link}
                  </Link>
                </motion.div>
                <motion.p
                  className="text-white text-xl"
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {project[selectedItemIndex].description}
                </motion.p>
                <motion.div
                  className="flex gap-3"
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {project[selectedItemIndex].technologies.map(
                    (tech, index) => (
                      <div
                        key={index}
                        className="flex items-center icon-container"
                      >
                        {skillIconMapping[tech.toLowerCase()] && (
                          <span
                            className="text-4xl mr-2 animated-icon"
                            style={{
                              color: skillColorMapping[tech.toLowerCase()],
                            }}
                          >
                            {skillIconMapping[tech.toLowerCase()]}
                          </span>
                        )}
                      </div>
                    )
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
