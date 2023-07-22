
const ProfileDetails = ({editor}) => {
    return(
        <div className="profile-details">

            <u><h3>{editor.username}</h3></u>
            <p><strong>{editor.email}</strong></p>
            
            <button >Update</button>
            <button >Delete</button>
            
            
        </div>
    )
}

export default ProfileDetails