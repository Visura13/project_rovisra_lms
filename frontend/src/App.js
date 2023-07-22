import Register from './Register';
import Login from './Login';
import { Outlet, Route, Routes } from 'react-router-dom';
import RootLayout from './layouts/RootLayout'
import RequireAuth from './components/RequireAuth';
import EditorDashboard from './pages/EditorDashboard'
import AddCourse from './pages/AddCourse';
import ManageCourse from './pages/ManageCourses'
import Unauthorized from './pages/Unauthorized';
import  UpdateCourse from './pages/UpdateCourse';
import EditorProfile from './pages/EditorProfile';
import UpdateEditorProfile from './pages/UpdateEditorProfile';
import Course from './pages/Course';

function App() {

  return (
    <Routes>
        <Route path='/' element={<RootLayout/>} >
        <Route path='register' element={<Register/>} />
        <Route path='login' element={<Login/>} />
        <Route path='unauthorized' element={<Unauthorized/>} />

          <Route element={<RequireAuth allowedRoles={[3000]}/>}>

            <Route index element={<EditorDashboard/>} />
            <Route path='editorprofile' element={<EditorProfile/>} />
            <Route path='updateprofile/:id' element={<UpdateEditorProfile/>} />
            <Route path='addcourse' element={<AddCourse/>} />
            <Route path='managecourse' element={<ManageCourse/>} />
            <Route path='updatecourse/:id' element={<UpdateCourse/>} />
            <Route path='course/:id' element={<Course/>} />
            
            
          </Route>
        </Route>
    </Routes>
  );
}

export default App;