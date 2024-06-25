import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import axios from "axios";

function AdminAbout() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const [imagePreview, setImagePreview] = React.useState("");

  useEffect(() => {
    // Set the initial image preview URL if there's an existing image
    if (portfolioData?.about?.image) {
      setImagePreview(portfolioData.about.image);
    }
  }, [portfolioData]);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());

      const formData = { ...values }; // Create an object from form values

      // Convert skills string to array
      if (values.skills) {
        formData.skills = values.skills.split(",").map((skill) => skill.trim());
      }

      // Handle _id separately (assuming you have logic to retrieve it)
      const aboutId = portfolioData?.about?._id; // Retrieve the _id from your state
      if (aboutId) {
        formData._id = aboutId;
      }

      const response = await axios.post(
        "/api/portfolio/update-about",
        formData
      );

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

  const handleImagePreviewChange = (e) => {
    setImagePreview(e.target.value);
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: 1200 }}
        autoComplete="on"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          ...portfolioData?.about,
          skills: portfolioData?.about?.skills.join(", "),
          image: portfolioData?.about?.image,
        }}
      >
        <Form.Item
          name="aboutIntro"
          label="Description"
          rules={[{ required: true, message: "Please input description!" }]}
        >
          <Input.TextArea placeholder="Description" />
        </Form.Item>
        <Form.Item
          name="skillTitle"
          label="Skill Title"
          rules={[{ required: true, message: "Please input Skill Title!" }]}
        >
          <Input placeholder="Skill Title" />
        </Form.Item>
        <Form.Item
          name="skills"
          label="Skills"
          rules={[{ required: true, message: "Please input skills!" }]}
        >
          <Input.TextArea placeholder="Skills" />
        </Form.Item>
        <Form.Item
          name="image"
          label="Image URL"
          rules={[{ required: true, message: "Please input image URL!" }]}
        >
          <Input placeholder="Image URL" onChange={handleImagePreviewChange} />
        </Form.Item>
        {imagePreview && (
          <div style={{ marginTop: 10 }}>
            <img src={imagePreview} alt="Preview" style={{ width: 200 }} />
          </div>
        )}
        <div className="flex justify-end w-full">
          <Button type="primary" htmlType="submit">
            SAVE
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AdminAbout;
