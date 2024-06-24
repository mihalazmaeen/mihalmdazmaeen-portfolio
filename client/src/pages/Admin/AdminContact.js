import React from "react";
import { Form, Input, Row, Col } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import axios from "axios";
import { message } from "antd";

function AdminContact() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/update-contact", {
        ...values,
        _id: portfolioData?.contact?._id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: 1200,
        }}
        autoComplete="on"
        onFinish={onFinish}
        layout="vertical"
        initialValues={portfolioData?.contact}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input name!",
            },
          ]}
        >
          <Input placeholder="Welcome Name" />
        </Form.Item>

        <Form.Item
          name="age"
          label="Age"
          rules={[
            {
              required: true,
              message: "Please input age!",
            },
          ]}
        >
          <Input placeholder="Age" />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
              message: "Please input gender!",
            },
          ]}
        >
          <Input.TextArea placeholder="Gender" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please input email!",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="country"
          label="Country"
          rules={[
            {
              required: true,
              message: "Please input country!",
            },
          ]}
        >
          <Input placeholder="Country" />
        </Form.Item>

        <Form.Item
          name="mobile"
          label="Mobile"
          rules={[
            {
              required: true,
              message: "Please input mobile!",
            },
          ]}
        >
          <Input placeholder="Mobile" />
        </Form.Item>
        <div className="flex justify-end w-full">
          <button className="px-5 py-2 bg-primary text-white" type="submit">
            SAVE
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AdminContact;
