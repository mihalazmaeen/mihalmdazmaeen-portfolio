import {
  FaPhp,
  FaJs,
  FaLaravel,
  FaVuejs,
  FaReact,
  FaNode,
  FaHtml5,
  FaCss3,
  FaDatabase,
  FaSync,
} from "react-icons/fa";
import { DiJqueryLogo } from "react-icons/di";
import { SiMysql } from "react-icons/si";

const skillIconMapping = {
  php: <FaPhp />,
  javascript: <FaJs />,
  laravel: <FaLaravel />,
  vuejs: <FaVuejs />,
  reactjs: <FaReact />,
  nodejs: <FaNode />,
  html: <FaHtml5 />,
  css: <FaCss3 />,
  jquery: <DiJqueryLogo />,
  ajax: <FaSync />,
  sql: <FaDatabase />,
  mysql: <SiMysql />,
  mssql: <FaDatabase />,
};

const skillColorMapping = {
  php: "#777BB4",
  javascript: "#F7DF1E",
  laravel: "#FF2D20",
  vuejs: "#4FC08D",
  reactjs: "#61DAFB",
  nodejs: "#339933",
  html: "#E34F26",
  css: "#1572B6",
  jquery: "#0769AD",
  ajax: "#FF8800",
  mysql: "#ffffff",
  mssql: "#CC2927",
  sql: "#336791",
};

export { skillIconMapping, skillColorMapping };
