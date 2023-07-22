import { useNavigate, useLocation, Link } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NAME_REGEX = /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const PHN_REGEX = /^\d{9}$/;
const ADDRESS_REGEX = /[A-Za-z0-9'.\-\s,]/

const UpdateEditorProfile = () => {
    const { auth, setAuth } = useContext(AuthContext);

    const userRef = useRef();
    const errRef = useRef();

    const [fullname, setFullName] = useState('');
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [phone, setPhone] = useState('');
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [address, setAddress] = useState('');
    const [validAddress, setValidAddress] = useState(false);
    const [addressFocus, setAddressFocus] = useState(false);
   
   // const [pwd, setPwd] = useState('');
    //const [validPwd, setValidPwd] = useState(false);
    //const [pwdFocus, setPwdFocus] = useState(false);

    //const [matchPwd, setMatchPwd] = useState('');
    //const [validMatch, setValidMatch] = useState(false);
    //const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(NAME_REGEX.test(fullname));
    }, [fullname])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPhone(PHN_REGEX.test(phone));
    }, [phone])

    useEffect(() => {
        setValidAddress(ADDRESS_REGEX.test(address));
    }, [address])

    useEffect(() => {
        setErrMsg('');
    },[fullname, email, phone])

    const location = useLocation();
    const navigate = useNavigate();

    const editorId = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchEditor = async () => {
           
            const response = await fetch(`/editors/${auth.user}`, { 
                method: 'GET',
                
                headers: {
                'content-type': 'application/json',
                "Authorization" : `Bearer ${auth.accessToken}`
            }
        } )
            const json = await response.json()
            setFullName(json.fullname)
            setEmail(json.email)
            setPhone(json.phone)
            setAddress(json.address)
            
            
        }

        fetchEditor()
        
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = NAME_REGEX.test(fullname);
        const v2 = EMAIL_REGEX.test(email);
        const v3 = PHN_REGEX.test(phone);
        const v4 = ADDRESS_REGEX.test(address);

        if ( (v1 || !fullname) && ( v2 ) && (v3 || !phone) && (v4 || !address)) {
            try {
                const editor = {fullname, email, phone, address}
                await axios.patch(`/editors/${editorId}`, editor, {
                    headers: {
                        'content-type': 'application/json',
                        "Authorization" : `Bearer ${auth.accessToken}`
                    }
                });
                setSuccess(true)
                navigate("/editorprofile");
    
            } catch (err) {
                if (!err?.response) {
                    setErrMsg('No Server Response');
                } else if (err.response?.status === 408) {
                    setErrMsg('Username is Taken');
                } else if (err.response?.status === 409) {
                    setErrMsg('Email is already in use');
                }else {
                    setErrMsg('Update Failed')
                }
                errRef.current.focus();
            }
        } else {
            setErrMsg('update failed')
        }
   
    };


    return(
        <div>
            {success ? (
                <section className="success">
                    <h1>Success!</h1>
                    <span className="line">
                            <Link to="/editorprofile">Go to profile</Link>
                        </span>
                </section>
            ) : (
                <section className="update-form-section">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Update Profile</h1>
                    <form onSubmit={handleSubmit} className="register-form">
                    <div class="mb-3">
                        <label class="form-label" htmlFor="username">
                            Fullname:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !fullname ? "hide" : "invalid"} />
                        </label>
                        <input
                            class="form-control"
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setFullName(e.target.value)}
                            value={fullname}
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setNameFocus(true)}
                            onBlur={() => setNameFocus(false)}
                        />
                        <p id="usernote" className={nameFocus && fullname && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Fullname must be <br />
                            4 to 75 characters.
                        </p>
                        </div>



                        <div class="mb-3">
                        <label class="form-label" htmlFor="email">
                            Email:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                        </label>
                        <input
                        class="form-control"
                        type="email"
                        id="email"
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="emailnote"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        />
                        <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Please enter valid email.
                        </p>
                        </div>



                        <div class="mb-3">
                        <label class="form-label" htmlFor="phone">
                            Phone:
                            <FontAwesomeIcon icon={faCheck} className={validPhone ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPhone || !phone ? "hide" : "invalid"} />
                            
                        </label>
                        <input
                            class="form-control"
                            type="number"
                            id="phone"
                            autoComplete="off"
                            onChange={(e) => setPhone(e.target.value)}
                            
                            value= {phone}
                            aria-invalid={validPhone ? "false" : "true"}
                            aria-describedby="phnnote"
                            onFocus={() => setPhoneFocus(false)}
                            onBlur={() => setPhoneFocus(false)}
                        />
                        <p id="phnnote" className={phoneFocus && phone && !validPhone ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Please enter valid phone number. 
                        </p>
                        </div>



                        <div class="mb-3">
                        <label class="form-label" htmlFor="phone">
                            Address:
                            <FontAwesomeIcon icon={faCheck} className={validAddress ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validAddress || !address ? "hide" : "invalid"} />
                            
                        </label>
                        <input
                            class="form-control"
                            type="text"
                            id="phone"
                            autoComplete="off"
                            onChange={(e) => setAddress(e.target.value)}
                            
                            value= {address}
                            aria-invalid={validAddress ? "false" : "true"}
                            aria-describedby="phnnote"
                            onFocus={() => setAddressFocus(false)}
                            onBlur={() => setAddressFocus(false)}
                        />
                        <p id="phnnote" className={addressFocus && address && !validAddress ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Please enter valid address. 
                        </p>
                        </div>
            

                        <div class="mb-3 btn-center">
                            <button className="btn" type="submit">Update</button>
                        </div>
                    </form>
                    
                </section>
                
            )}
            
        </div>
        
    )
}

export default UpdateEditorProfile