import {useState, useEffect } from "react";
import CourseDetails from "../components/CourseDetails";
import { UseCourseContext } from "../hooks/UseCourseContext";
//import SearchCourse from "../components/SearchCourse";

const ManageCourse = () => {
    
    const {courses, dispatch} = UseCourseContext()
    const [errMsg, setErrMsg] = useState('')

    const [search, setSearch] = useState('')
    const [data, setData] = useState('')
/*
    useEffect(() => {
        const fetchCourses = async () => {
            const response = await axios(`/courses?q=${search}`)
            setData(response.data)
            dispatch({type: 'GET_COURSES', payload: response})
            console.log(response)
        }
        fetchCourses()
    }, [search])
*/

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch(`/courses?q=${search}`)
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'GET_COURSES', payload: json})
            } else{
                setErrMsg("Invalid Entry");
            }
        }
        if (search.length === 0 || search.length > 2) {
            fetchCourses()
        }

    }, [search])

    return(
        <><div className="courses-h1">
        <h1>Our Academic Programs</h1>
        </div>
        <div className="manage-course">
            <input 
            className="course-search" 
            type="text" 
            placeholder="search"
            onChange={(e) => setSearch(e.target.value)}
            />

            {courses && courses.map((course) => (
                <div >
                
                <CourseDetails className="grid-container" key={course._id} course={course } />
                </div>
            ))}

        </div>
        </>
        )
}

export default ManageCourse