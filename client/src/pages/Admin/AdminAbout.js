import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import axios from "axios";

function AdminAbout() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    // Set the initial image preview URL if there's an existing image
    if (portfolioData?.about?.image) {
      setImagePreview(
        `http://localhost:5000/uploads/${portfolioData.about.image}`
      );
    }
  }, [portfolioData]);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());

      const formData = new FormData(); // Create a FormData object

      // Add form fields from values object (excluding _id)
      Object.entries(values).forEach(([key, value]) => {
        if (key === "skills") {
          // Convert skills string to array
          const tempSkills = value.split(",").map((skill) => skill.trim());
          tempSkills.forEach((skill) => formData.append("skills[]", skill));
        } else if (key !== "_id") {
          // Don't include _id in the FormData
          formData.append(key, value);
        }
      });

      // If imageFile exists, add it to the FormData
      if (imageFile) {
        formData.append("image", imageFile);
      }

      // Handle _id separately (assuming you have logic to retrieve it)
      const aboutId = portfolioData?.about?._id; // Retrieve the _id from your state
      if (aboutId) {
        formData.append("_id", aboutId);
      }

      const response = await axios.post(
        "/api/portfolio/update-about",
        formData, // Pass the FormData directly
        { headers: { "Content-Type": "multipart/form-data" } } // Set headers for FormData
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file); // Set the selected image file
    setImagePreview(URL.createObjectURL(file)); // Create a preview URL for the selected image
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
        <Form.Item label="Upload Image">
          <input type="file" onChange={handleImageChange} accept="image/*" />
          {imagePreview && (
            <div style={{ marginTop: 10 }}>
              <img src={imagePreview} alt="Preview" style={{ width: 200 }} />
            </div>
          )}
        </Form.Item>
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
