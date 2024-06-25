import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { ShowLoading, HideLoading, ReloadData } from "../../redux/rootSlice";
import axios from "axios";

function AdminProjects() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemorEdit, setSelectedItemorEdit] = useState(null);
  const { project } = portfolioData;
  const [form] = Form.useForm();

  const onDelete = async (item) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/delete-project", {
        _id: item._id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());

      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (key === "technologies") {
          const tempTechs = value.split(",").map((tech) => tech.trim());
          tempTechs.forEach((tech) => formData.append("technologies[]", tech));
        } else {
          formData.append(key, value);
        }
      });

      let response;
      if (selectedItemorEdit) {
        formData.append("_id", selectedItemorEdit._id);
        response = await axios.post("/api/portfolio/update-project", formData);
      } else {
        response = await axios.post("/api/portfolio/add-project", formData);
      }

      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        setShowAddEditModal(false);
        setSelectedItemorEdit(null);
        dispatch(ReloadData(true));
        form.resetFields();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const handleAdd = () => {
    setSelectedItemorEdit(null);
    form.resetFields();
    setShowAddEditModal(true);
  };

  const handleEdit = (project) => {
    setSelectedItemorEdit(project);
    form.setFieldsValue({
      ...project,
      technologies: project.technologies.join(", "),
    });
    setShowAddEditModal(true);
  };

  return (
    <div>
      <div className="flex justify-end">
        <button
          className="bg-primary text-white px-5 py-2 mb-3"
          onClick={handleAdd}
        >
          Add Project
        </button>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {project.map((project, index) => (
          <div key={index} className="shadow border p-5 border-gray-400">
            <h1 className="text-primary text-xl font-bold mb-2">
              {project.title}
            </h1>
            <hr />
            <img
              src={project.image} // Use the image URL directly
              alt="Project"
              className="h-40 w-60 text-center"
            />
            <h1 className="mb-2">Project Link: {project.link}</h1>
            <h1 className="mb-2">{project.description}</h1>
            <div className="mb-2">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="bg-blue-500 text-white px-2 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-5 mt-3">
              <button
                className="bg-primary text-white px-5 py-2"
                onClick={() => handleEdit(project)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-5 py-2"
                onClick={() => onDelete(project)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {showAddEditModal && (
        <Modal
          open={showAddEditModal}
          title={selectedItemorEdit ? "Edit Project" : "Add Project"}
          footer={null}
          onCancel={() => {
            setShowAddEditModal(false);
            setSelectedItemorEdit(null);
            form.resetFields();
          }}
        >
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="link" label="Link">
              <Input placeholder="Link" />
            </Form.Item>
            <Form.Item name="title" label="Title">
              <Input placeholder="Title" />
            </Form.Item>
            <Form.Item name="technologies" label="Technologies">
              <Input.TextArea placeholder="Technologies" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea placeholder="Description" />
            </Form.Item>
            <Form.Item name="image" label="Image URL">
              <Input placeholder="Image URL" />
            </Form.Item>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="border-primary text-primary px-5 py-2"
                onClick={() => {
                  setShowAddEditModal(false);
                  setSelectedItemorEdit(null);
                  form.resetFields();
                }}
              >
                Cancel
              </button>
              <button className="bg-primary text-white px-5 py-2" type="submit">
                {selectedItemorEdit ? "Update" : "Add"}
              </button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default AdminProjects;
