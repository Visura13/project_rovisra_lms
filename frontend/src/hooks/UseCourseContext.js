import {CourseContext, CourseContextProvider} from '../context/CourseContext'
import {useContext} from 'react'

 export const UseCourseContext = () => {
    const context = useContext(CourseContext)

    if(!context){
        throw Error('useworkoutcontext must be used inside a coursecontextprovider')
    }

    return context
 }