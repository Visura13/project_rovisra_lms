import { useNavigate, useLocation, Link } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import jsPDF from "jspdf"
import "jspdf-autotable"

const Course = () => {
    const [course, setCourse] = useState('');
    const [url, setUrl] = useState('');
    const location = useLocation();

    const courseId = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchCourse = async () => {
            const response = await fetch(`/courses/${courseId}`, { 
                method: 'GET',
                
                headers: {
                'content-type': 'application/json',
            }
        } )
            const json = await response.json()
            let url = await json.image.url
            setCourse(json)
            setUrl(url)
            console.log(json)
            
        }

        fetchCourse()
        
    }, [])

    const day = (new Date(course.startday || '2023.01.01').toISOString().split('T')[0])
    const c1 = (course.content || '2023.01.01' ).split('.')[0]
    const c2 = (course.content || '2023.01.01' ).split('.')[1]
    const c3 = (course.content || '2023.01.01' ).split('.')[2]
    const c4 = (course.content || '2023.01.01' ).split('.')[3]
    const c5 = (course.content || '2023.01.01' ).split('.')[4]
    const c6 = (course.content || '2023.01.01' ).split('.')[5]
    const c7 = (course.content || '2023.01.01' ).split('.')[6]
    const c8 = (course.content || '2023.01.01' ).split('.')[7]
    const c9 = (course.content || '2023.01.01' ).split('.')[8]
    const c10 = (course.content || '2023.01.01' ).split('.')[9]


   
   

    const exportCourseDetails = () => {
        console.log("Export PDF")


        const unit = "pt";
        const size = "A3";
        const orientation = "portrait";
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        const title = "Student Details Report ";
        const headers = [["title", "price", "description", "content","duration","startday"]];

        const fed = [
            [
                course.title,
                course.price,
                course.description,
                course.content,
                course.duration,
                course.startday
            ]
        ];
        let content = {
            startY: 50,
            head: headers,
            body: fed
        };
        doc.setFontSize(20);
        doc.text(title, marginLeft, 40);
        require('jspdf-autotable');
        doc.autoTable(content);
        doc.save("CourseDetails-Report.pdf")
}


    return(
        <div>
            <div className="course-container">
            <img className="course-main-img" src={url}/>
            <h1 className="course-title">{course.title}</h1>
            
            
            <div className="course-desc">
            <p>{course.description}</p>
            <h5 className="margin-top">Content: </h5>
            <p>{course.content}</p>
            <h5 className="margin-top">Duration: {course.duration}</h5>
            <h5 className="margin-top">Starting day: {day}</h5>
            <h5 className="course-price ">Rs. {course.price}</h5>
            <div className="btn-flex-end margin-right margin margin-bottom">
                <button className="margin-right btn-padding">Add to cart</button>
                <button className="btn-padding">Buy now</button>
            </div>
            </div>
            <div className="course-report-btn">
            <button onClick={exportCourseDetails}>Generate Report</button>
            </div>
            </div>
        </div>
    
    )
}

export default Course