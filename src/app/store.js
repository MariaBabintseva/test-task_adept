import { configureStore } from "@reduxjs/toolkit"
import companiesReducer from "./slices/companiesSlice"
import emploeesReducer from "./slices/employeesSlice"

export default configureStore({
    reducer: {
        companies: companiesReducer,
        employees: emploeesReducer
    }
})