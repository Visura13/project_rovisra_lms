import { useState, useEffect } from "react"
import { UseCourseContext } from "../hooks/UseCourseContext";
import axios from "../api/axios";
const {courses, dispatch} = UseCourseContext()

const SearchCourse = () => {
    const [search, setSearch] = useState('')
    const [data, setData] = useState('')

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await axios(`/courses?q=${search}`)
            setData(response.data)
            dispatch({type: 'GET_COURSES', payload: response})
            console.log(response)
        }
        fetchCourses()
    }, [search])

    return (
        <>
        <form className="search-course" onSubmit={(e) => e.preventDefault()}>
            <label>Search</label>
            <input
            type="text"
            placeholder="Search courses"
            //value={search}
            onChange={(e) => setSearch(e.target.value)}
            />

            
        </form>
        <table data={data}/>
        </>
    )
}

export default SearchCourse