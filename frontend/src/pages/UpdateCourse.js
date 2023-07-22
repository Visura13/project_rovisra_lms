import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const UpdateCourse = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');
    const [startday, setStartday] = useState('');
    const [error,setError] = useState(false)

    const location = useLocation();
    const navigate = useNavigate();

    const courseId = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchCourse = async () => {
            const response = await fetch(`/courses/${courseId}`, { 
                method: 'GET',
                
                headers: {
                'content-type': 'application/json',
            }
        } )
            const course = await response.json()
            setTitle(course.title)
            setDescription(course.description)
            setPrice(course.price)
            setContent(course.content)
            setDuration(course.duration)
            setStartday(course.startday)
            
            console.log(course)
            
        }

        fetchCourse()
        
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const course = {title, price, description, content, duration, startday}

        try {
            await axios.patch(`/courses/${courseId}`, course);
            navigate("/managecourse");

        } catch (err) {
        console.log(err);
        setError(true);
        }
    };

    return(
        <>
            <h3>update course</h3>
        <form className="course-form" onSubmit={handleSubmit}>

            <div class="mb-3">
            <label class="form-label">course name</label>
            <input 
                type="text"
                class="form-control" 
                id="exampleFormControlInput1"
                autoComplete="off"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                />
            </div>
        
            <select class="form-select" aria-label="Default select example">
                <option selected>Department</option>
                <option value="1">Business</option>
                <option value="2">IT</option>
                <option value="3">English</option>
            </select>
{/*
            <div class="form-check">
                <input type="radio" id="flexRadioDefault1" name="free"/>
                <label class="form-check-label" for="flexRadioDefault1">
                    Free
                </label>
                </div>
                <div class="form-check">
                <input type="radio"  id="flexRadioDefault2" name="paid"/>
                <label class="form-check-label" for="flexRadioDefault2">
                    Paid
                </label>
            </div>
*/}
    
            <div class="mb-3">
            <label class="form-label">Price</label>
            <input 
                type="number" 
                class="form-control" 
                id="exampleFormControlInput1"
                autoComplete="off"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                />
            </div>

            <div class="mb-3">
            <label class="form-label">course Description</label>
            <textarea 
                class="form-control" 
                id="exampleFormControlTextarea1" 
                rows="5"
                autoComplete="off"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                >

            </textarea>
            </div>

            <div class="mb-3">
            <label class="form-label">Course Content</label>
            <textarea 
            class="form-control" 
            id="exampleFormControlTextarea1" 
            rows="3"
            autoComplete="off"
            onChange={(e) => setContent(e.target.value)}
            value={content}
            >
            </textarea>
            </div>

            <div class="mb-3">
            <label class="form-label">Course Duration</label>
            <input 
            class="form-control" 
            autoComplete="off"
            onChange={(e) => setDuration(e.target.value)}
            value={duration}
            >
            </input>
            </div>

            <div class="mb-3">
            <label class="form-label">Course StartDay</label>
            <input 
            type="date"
            class="form-control" 
            autoComplete="off"
            onChange={(e) => setStartday(e.target.value)}
            value={startday}
            >
            </input>
            </div>

            <button type="submit" class="btn btn-primary">Update</button>
            {/*<p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>*/}

        </form>
        </>
        )
}

export default UpdateCourse