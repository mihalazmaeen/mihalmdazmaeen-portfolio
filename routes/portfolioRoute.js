const router = require("express").Router();
const multer = require("multer");
const User = require("../models/userModel")
const {
  Intro,
  About,
  Project,
  Education,
  Contact,
  Experience,
} = require("../models/portfolioModel");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Specify the destination folder for storing images
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep the original file name
  },
});

const upload = multer({ storage: storage });

router.get("/get-portfolio-data", async (req, res) => {
  try {
    const intros = await Intro.find();
    const abouts = await About.find();
    const projects = await Project.find();
    const experience = await Experience.find();
    const educations = await Education.find();
    const contacts = await Contact.find();

    res.status(200).send({
      intro: intros[0],
      about: abouts[0],
      project: projects,
      education: educations,
      experience: experience,
      contact: contacts[0],
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update Intro Section
router.post("/update-intro", async (req, res) => {
  try {
    const intro = await Intro.findByIdAndUpdate(
      { _id: req.body._id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).send({
      data: intro,
      success: true,
      message: "Intro updated successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
// Update About Section
router.post("/update-about", upload.single("image"), async (req, res) => {
  try {
    let updatedData = req.body;

    // Check if an image file was uploaded
    if (req.file) {
      updatedData.image = req.file.originalname; // Update the image field with the file name
    }

    const about = await About.findByIdAndUpdate(
      { _id: req.body._id },
      updatedData,
      { new: true }
    );

    res.status(200).send({
      data: about,
      success: true,
      message: "About Section updated successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
// Add Experience
router.post("/add-experience", async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience added successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
// Update Experience
router.post("/update-experience", async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      { _id: req.body._id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience updated successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
// Delete Experience
router.post("/delete-experience", async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete({
      _id: req.body._id,
    });
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add Project
router.post("/add-project", upload.single("image"), async (req, res) => {
  try {
    let newProjectData = req.body;
    console.log(newProjectData);

    // Check if an image file was uploaded
    if (req.file) {
      newProjectData.image = req.file.originalname; // Add the image field with the file name
    }

    const project = new Project(newProjectData);
    await project.save();

    res.status(200).send({
      data: project,
      success: true,
      message: "Project added successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update Project
router.post("/update-project", upload.single("image"), async (req, res) => {
  try {
    let updatedData = req.body;

    // Check if an image file was uploaded
    if (req.file) {
      updatedData.image = req.file.originalname; // Update the image field with the file name
    }

    const project = await Project.findByIdAndUpdate(
      { _id: req.body._id },
      updatedData,
      { new: true }
    );

    res.status(200).send({
      data: project,
      success: true,
      message: "Project updated successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete Project

router.post("/delete-project", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.body._id);

    if (!project) {
      return res.status(404).send({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).send({
      data: project,
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add Education
router.post("/add-education", async (req, res) => {
  try {
    const education = new Education(req.body);
    await education.save();
    res.status(200).send({
      data: education,
      success: true,
      message: "Education added successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
// Update Education
router.post("/update-education", async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(
      { _id: req.body._id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).send({
      data: education,
      success: true,
      message: "Education updated successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
// Delete Education
router.post("/delete-education", async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete({
      _id: req.body._id,
    });
    res.status(200).send({
      data: education,
      success: true,
      message: "Education deleted successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add contact
router.post("/add-contact", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(200).send({
      data: contact,
      success: true,
      message: "Contact added successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
// Update contact
router.post("/update-contact", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      { _id: req.body._id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).send({
      data: contact,
      success: true,
      message: "Education updated successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
// Delete contact
// router.post("/delete-contact", async (req, res) => {
//   try {
//     const contact = await Contact.findByIdAndDelete({
//       _id: req.body._id,
//     });
//     res.status(200).send({
//       data: contact,
//       success: true,
//       message: "Contact deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

router.post("/admin-login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    user.password="";
    if (user) {
      res.status(200).send({
        data: user,
        success: true,
        message: "Login successfully",
      });
    } else {
      res.status(401).send({
        success: false,
        message: "Login failed. Invalid username or password.",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "An error occurred during login. Please try again later.",
    });
  }
});

module.exports = router;
