const mongoose = require("mongoose");

const introSchema = new mongoose.Schema({
  welcomeText: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const aboutSchema = new mongoose.Schema({
  aboutIntro: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  skillTitle: {
    type: String,
    required: true,
  },
  skills: {
    type: Array,
    required: true,
  },
});

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const projectsSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  technologies: {
    type: Array,
    required: true,
  },
});

const educationSchema = new mongoose.Schema({
  stage: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
  graduated: {
    type: String,
    required: true,
  },
});

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
});

module.exports = {
  Intro: mongoose.model("intros", introSchema),
  About: mongoose.model("abouts", aboutSchema),
  Experience: mongoose.model("experiences", experienceSchema),
  Project: mongoose.model("projects", projectsSchema),
  Education: mongoose.model("education", educationSchema),
  Contact: mongoose.model("contacts", contactSchema),
};
