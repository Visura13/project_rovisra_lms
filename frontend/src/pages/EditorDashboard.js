import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const EditorDashboard = () => {

    return (
        <>
        <div className="dashboard-banner">
            <h1>Welcome To Editor Dashboard</h1>
            </div>
            <br />
            <div className="editor-nav">
                <Link className="links" to="addcourse"><button className="btn btn-primary add-course-button">Add new course</button></Link>
                <br/>
                <Link className="links" to="managecourse"><button className="btn btn-primary add-course-button">Current courses</button></Link>
                
            </div>
         
         </>
        
        
    )
}

export default EditorDashboard