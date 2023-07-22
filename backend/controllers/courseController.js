const Course = require('../model/Course');
const mongoose = require('mongoose');
const cloudinary = require("../config/cloudinary");

//get all courses
/*
const getCourses = async (req, res) => {

    try {
        const courses = await Course.find({}).sort({createdAt: -1})
        res.status(200).json(courses)
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
*/

const getCourses = async (req, res) => {

    try {
        const {q}  = req.query || '';
        
        const courses = await Course.find({title: {$regex: q, $options: 'i'}}).sort({createdAt: -1})
        res.status(200).json(courses)
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// get one course
const getCourse = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'not a valid id'})
    }

    try {
        const course = await Course.findById(id)
        res.status(200).json(course)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const addCourse = async (req, res) => {
    const{title, price, description, duration, startday, content, image} = req.body
  
    try {
      if (image) {
        const uploadedResponse = await cloudinary.uploader.upload(image, {
          upload_preset: "courseImg",
        });
  
        if (uploadedResponse) {
            const course = await Course.create({title, price, description, duration, startday, content, image: uploadedResponse})
            res.status(200).json(course)
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };

  /*
//create course
const addCourse = async (req, res) => {
    const{title, price, description, content, image} = req.body

    try {
        const course = await Course.create({title, price, description, content, image})
        res.status(200).json(course)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
*/

//delete course 
const deleteCourse = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'not a valid id'})
    }

    try {
        const course = await Course.findByIdAndDelete({_id: id})
        res.status(200).json(course)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//update course
const updateCourse = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'not a valid id'})
    }

    try {
        const course = await Course.findByIdAndUpdate({_id: id}, {
            ...req.body
        })
        res.status(200).json(course)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    addCourse,
    getCourse,
    getCourses,
    deleteCourse,
    updateCourse
}