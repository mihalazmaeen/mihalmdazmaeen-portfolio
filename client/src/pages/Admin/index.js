import React, { useEffect } from "react";
import Header from "../../components/Header";
import { Tabs, Button } from "antd";
import AdminIntro from "./AdminIntro";
import AdminAbout from "./AdminAbout";
import AdminExperiences from "./AdminExperiences";
import { useSelector } from "react-redux";
import AdminProjects from "./AdminProjects";
import AdminEducation from "./AdminEducation";
import AdminContact from "./AdminContact";
import { LogoutOutlined } from "@ant-design/icons";

function Admin() {
  const { portfolioData } = useSelector((state) => state.root);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/admin-login";
    }
  }, []);

    const onChange = (key) => {};

  const items = [
    {
      key: "1",
      label: "Intro",
      children: <AdminIntro />,
    },
    {
      key: "2",
      label: "About",
      children: <AdminAbout />,
    },
    {
      key: "3",
      label: "Experience",
      children: <AdminExperiences />,
    },
    {
      key: "4",
      label: "Projects",
      children: <AdminProjects />,
    },
    {
      key: "5",
      label: "Education",
      children: <AdminEducation />,
    },
    {
      key: "6",
      label: "Contact",
      children: <AdminContact />,
    },
  ];
  return (
    <div>
      <Header />
      <h1
        className="underline text-primary text-xl cursor-pointer"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/admin-login";
        }}
      >Logout</h1> 
      {portfolioData && (
        <div className="mt-5 p-5">
          <Tabs
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
            tabPosition="left"
          />
        </div>
      )}
    </div>
  );
}

export default Admin;
