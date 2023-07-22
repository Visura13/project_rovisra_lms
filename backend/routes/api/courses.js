const express = require('express');
const router = express.Router();
const { 
    addCourse,
    getCourse,
    getCourses,
    deleteCourse,
    updateCourse
} = require('../../controllers/courseController');



router.get('/', getCourses)
    

router.get('/:id', getCourse)

router.post('/', addCourse)

router.patch('/:id', updateCourse)

router.delete('/:id', deleteCourse)
    

module.exports = router;