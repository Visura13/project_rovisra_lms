import { createContext, useReducer } from "react"

export const CourseContext = createContext()

export const CourseReduecer = (state, action) => {
    switch(action.type){
        case 'GET_COURSES': 
            return {
                courses: action.payload
            }
        case 'CREATE_COURSE': 
        return {
                courses: [action.payload, ...state.courses]
        }
        case 'DELETE_COURSE': 
        return {
                courses: state.courses.filter((c) => c._id !== action.payload._id)
        }
        default:
            return state
    }
}

export const CourseContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(CourseReduecer, {
        courses: null
    })

    return (
        <CourseContext.Provider value={{...state, dispatch}}>
            {children}
        </CourseContext.Provider>

    )
}