import { useState } from "react"
import axios from "../api/axios"
import { UseCourseContext } from "../hooks/UseCourseContext";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns'

const CourseDetails = ({course}) => {
    const {dispatch} = UseCourseContext()


    const deleteCourse = async () => {
        const resp = await fetch('/courses/' +  course._id, {
            method: 'DELETE'
        })
        const json = await resp.json()
        if(resp.ok){
            dispatch({type: 'DELETE_COURSE', payload: json})
        }
          
    }

    const date = (new Date(course.createdAt || '2023.01.01').toISOString().split('T')[0])

    return (
        <>
    
        <div class="card" >
            <img className="card-img-top" src={course.image.url}/>
            <div class="card-body">
                <h3 class="card-title"><u>{course.title}</u></h3>
                <p>{course.description}</p>
                <p><strong>Rs.{course.price}</strong></p>

                    
                        <button className="course-view" ><Link to={'/course/' + course._id} style={{ textDecoration: 'none', color: 'black'}}>VIEW MORE</Link></button>
                    
                        <button className="course-update-btn"><Link to={'/updatecourse/' + course._id} style={{ textDecoration: 'none', color: 'black'}}>Update</Link></button>
                        <button className="course-dlt-btn" onClick={deleteCourse}>Delete</button>
                    
                        <p className="course-createdAt">{date}</p>
                    </div>
            </div>
                    {/*
        <div class="container">
            <div class="row">
                <div class="col-sm">
                
                </div>
                <div class="col-sm">
                <div class="card" >
        <img className="card-img-top" src={course.image.url}/>
        <div class="card-body">
            <h5 class="card-title">{course.title}</h5>
            <p class="card-text">{course.description}</p>
            <p><strong>Rs.{course.price}</strong></p>
            <button className="update-btn"><Link to={'/updatecourse/' + course._id} style={{ textDecoration: 'none', color: 'black'}}>Update</Link></button>
            <button className="dlt-btn" onClick={deleteCourse}>Delete</button>
            <p className="course-createdAt">{date}</p>
        </div>
        </div>
                </div>
                <div class="col-sm">
                <div class="card" >
        <img className="card-img-top" src={course.image.url}/>
        <div class="card-body">
            <h5 class="card-title">{course.title}</h5>
            <p class="card-text">{course.description}</p>
            <p><strong>Rs.{course.price}</strong></p>
            <button className="update-btn"><Link to={'/updatecourse/' + course._id} style={{ textDecoration: 'none', color: 'black'}}>Update</Link></button>
            <button className="dlt-btn" onClick={deleteCourse}>Delete</button>
            <p className="course-createdAt">{date}</p>
        </div>
        </div>
                </div>
            </div>
            </div>
        
{/*
        <div className="course-details">
            <img className="course-img" src={course.image.url}/>
            <u><h3>{course.title}</h3></u>
            <p><strong>{course.description}</strong></p>
            <p><strong>Rs.{course.price}</strong></p>
            
            {}
            <button className="update-btn"><Link to={'/updatecourse/' + course._id} style={{ textDecoration: 'none', color: 'black'}}>Update</Link></button>
            <button className="dlt-btn" onClick={deleteCourse}>Delete</button>
            <p className="course-createdAt">{date}</p>
            
            
        </div>
    */}
        </>
    )
}

export default CourseDetails