import { useState, useEffect } from "react";
import axios from '../api/axios';
import { UseCourseContext } from "../hooks/UseCourseContext";
import { useDispatch, useSelector } from "react-redux";
import { courseCreate } from "../slices/CourseSlice";

const CourseForm = () => {

    const dispatch = useDispatch();
    //const { createStatus } = useSelector((state) => state.course);
    const [title, setTitle] = useState('');
    const [department, setDepartment] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');
    const [startday, setStartday] = useState('');
    const [image, setImage] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const handleImgUpload = (e) => {
        const file = e.target.files[0];
        console.log(file)
    
        TransformFileData(file);
      };
    
      const TransformFileData = (file) => {
        const reader = new FileReader();
    
        if (file) {
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            setImage(reader.result);
          };
        } else {
          setImage("");
        }
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        dispatch(
          courseCreate({
            title,
            price,
            description,
            duration,
            startday,
            content,
            image
          })
        );
            setTitle('');
            setDepartment('');
            setPrice('');
            setDescription('');
            setDuration('');
            setStartday('');
            setContent('');
            setErrMsg('');
      };

      /*
    const handleSubmit = async (e) => {
        e.preventDefault();
        const course = {title, price, description, content, image}
       
        try {
            const response = await axios.post('/courses',
                JSON.stringify(course),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            console.log(JSON.stringify(response))
            dispatch({type: 'CREATE_COURSE', payload: response})
            setTitle('');
            setDepartment('');
            setPrice('');
            setDescription('');
            setContent('');
            setImage('');
            setErrMsg('');

        } catch (err) {
             
            setErrMsg('No Server Response');
            
        }
    }
    */

    /*
    const handleSubmit = async (e) => {
        e.preventDefault();
        const course = {title, price, description, Content}
    
        const response = await fetch('/courses', {
            method: 'POST',
            body: JSON.stringify(course),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json()

        if(response.ok){
            setTitle('');
            setDepartment('');
            setPrice('');
            setDescription('');
            setContent('');
            setErrMsg('');
        } else{
            setErrMsg(json.error)
        }
            
         
        
    }
 */

    return(
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
                required/>
            </div>
        
            <select class="form-select" aria-label="Default select example">
                <option selected>Faculty</option>
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
                required/>
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
                required>

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
            required></textarea>
            </div>

            <div class="mb-3">
            <label class="form-label">Course Duration</label>
            <input 
            class="form-control" 
            autoComplete="off"
            onChange={(e) => setDuration(e.target.value)}
            value={duration}></input>
            </div>

            <div class="mb-3">
            <label class="form-label">Course StartDay</label>
            <input 
            type="date"
            class="form-control" 
            autoComplete="off"
            onChange={(e) => setStartday(e.target.value)}
            value={startday}></input>
            </div>

            <div class="mb-3">
            <label class="form-label">Upload Image</label>
            <input 
            type="file"
            accept="image/*"
            class="form-control" 
            onChange={handleImgUpload}
            required
            />
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
            <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        </form>
        )
}

export default CourseForm;