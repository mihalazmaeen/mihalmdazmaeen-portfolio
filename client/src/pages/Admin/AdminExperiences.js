import { Modal } from "antd";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button, message } from "antd";
import { ShowLoading, HideLoading, ReloadData } from "../../redux/rootSlice";
import axios from "axios";

function AdminExperiences() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [selectedItemorEdit, setSelectedItemorEdit] = React.useState(null);
  const { experience } = portfolioData;
  const [form] = Form.useForm();

  const onDelete = async (item) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/delete-experience", {
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
      let response;
      if (selectedItemorEdit) {
        response = await axios.post("/api/portfolio/update-experience", {
          ...values,
          _id: selectedItemorEdit._id,
        });
      } else {
        response = await axios.post("/api/portfolio/add-experience", values);
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

  useEffect(() => {
    if (selectedItemorEdit) {
      form.setFieldsValue(selectedItemorEdit);
    } else {
      form.resetFields();
    }
  }, [selectedItemorEdit, form]);

  const handleAdd = () => {
    setSelectedItemorEdit(null);
    form.resetFields();
    setShowAddEditModal(true);
  };

  const handleEdit = (experience) => {
    setSelectedItemorEdit(experience);
    setShowAddEditModal(true);
  };

  return (
    <div>
      <div className="flex justify-end">
        <button className="bg-primary text-white px-5 py-2" onClick={handleAdd}>
          Add Experience
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {experience.map((experience, index) => (
          <div key={index} className="shadow border p-5 border-gray-400">
            <h1 className="text-primary text-xl font-bold mb-2">
              {experience.company}
            </h1>
            <hr />
            <h1 className="mb-2">Designation: {experience.title}</h1>
            <h1 className="mb-2">Period: {experience.period}</h1>
            <h1 className="mb-2">{experience.description}</h1>
            <div className="flex justify-end gap-5 mt-2">
              <button
                className="bg-primary text-white px-5 py-2"
                onClick={() => handleEdit(experience)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-5 py-2"
                onClick={() => onDelete(experience)}
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
          title={selectedItemorEdit ? "Edit Experience" : "Add Experience"}
          footer={null}
          onCancel={() => {
            setShowAddEditModal(false);
            setSelectedItemorEdit(null);
            form.resetFields();
          }}
        >
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="company" label="Company">
              <Input placeholder="Company" />
            </Form.Item>
            <Form.Item name="title" label="Title">
              <Input placeholder="Title" />
            </Form.Item>
            <Form.Item name="period" label="Period">
              <Input placeholder="Period" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea placeholder="Description" />
            </Form.Item>
            <div className="flex justify-end">
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

export default AdminExperiences;
