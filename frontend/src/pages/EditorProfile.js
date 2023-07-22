import ProfileDetails from "../components/ProfileDetails"
import { useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";

const EditorProfile = () => {
    const [editor, setEditor] = useState('');
    const [img, setImg] = useState(null);
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchEditor = async () => {
            //const editor = {user, email, pwd }
            const response = await fetch(`/editors/${auth.user}`, { 
                method: 'GET',
                
                headers: {
                'content-type': 'application/json',
                "Authorization" : `Bearer ${auth.accessToken}`
            }
        } )
            const json = await response.json()
            setEditor(json)
            console.log(json)
            
        }

        fetchEditor()
        
    }, [])

    const deleteEditor = async () => {
        const res = await fetch('/editors/' +  editor._id, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                "Authorization" : `Bearer ${auth.accessToken}`
            }
        })
        const json = await res.json()
        if(res.ok){
            console.log(json)
            navigate('/register')
            //dispatch({type: 'DELETE_COURSE', payload: json})
        }
          
    } 

    const logout = async () => {
        setAuth({});
        navigate('/login');
    }

    return(
        
            <div class="profile-container rounded bg-white mt-6 mb-5">
                
            <div class="row">
                
                
                <div class="col-md-5 border-right">
                    <div class="p-3 py-5">
                    
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h4 class="text-right">Profile Settings</h4>
                            
                        </div>

                        <div class="row mt-2">
                        <div class="col-md-12"><label class="labels">Username</label>
                            <input 
                                type="text" 
                                class="form-control"
                                placeholder="user name" 
                                value={editor.username} />
                                </div>
                        </div>


                        <div class="row mt-3">
                            <div class="col-md-12"><label class="labels">Fullname</label>
                            <input 
                                type="text" 
                                class="form-control" 
                                placeholder="full name"
                                value={editor.fullname} />
                                </div>
                        </div>


                        <div class="row mt-3">
                        <div class="col-md-12"><label class="labels">Email</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            placeholder="email"
                            value={editor.email}/>
                        </div>


                        <div class="row mt-4">
                            <div class="col-md-12"><label class="labels">Mobile Number</label>
                            <input 
                            type="text" 
                            class="form-control" 
                            placeholder="phone number"
                            value={editor.phone}/>
                            </div>
                        </div>


                        <div class="row mt-4">
                            <div class="col-md-12"><label class="labels">Address</label>
                            <input 
                            type="text" 
                            class="form-control" 
                            placeholder="address"
                            value={editor.address}/>
                            </div>
                        </div>

                        <div class="row mt-4">
                            <div className="editor-btn-center">
                            <button class="profile-update-btn" type="button"><Link to={'/updateprofile/' + editor._id} style={{ textDecoration: 'none', color: 'black'}}>Edit Profile</Link></button>
                            <button class="profile-dlt-btn" type="button" onClick={deleteEditor}>Delete Profile</button>
                            </div>
                        </div>

                        </div>
                        
                        
                    </div>
                </div>
                <button className="editor-sign-out-btn" onClick={logout}>Sign Out</button>
                
            </div>
        </div>
            
    )
}

export default EditorProfile