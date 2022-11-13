import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { removeCompany } from "./companiesSlice";

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
    const response = await fetch('employees.json')
    const data = response.json()
    return data
})

export const employeesSlice = createSlice({
    name: 'employees',
    initialState: {
        employees: [],
        selectedEmployees: [],
        status: null,
        error: null
    },
    reducers: {
        addEmployee: (state, action) => {
            state.employees.push(
                {
                    id: new Date().toISOString(),
                    surname: action.payload.surname,
                    name: action.payload.name,
                    idCompany: action.payload.idCompany,
                    position: action.payload.position
                }
            )

        },
        editEmployee: (state, action) => {
            console.log(action.payload);
            let editedEmployee = state.employees.find((employee) => employee.id === action.payload.id)
            editedEmployee[action.payload.field] = action.payload.value

        },
        removeEmployee: (state, action) => {
            console.log(action.payload)
            const payloadId = action.payload.map((item) => item.id)
            state.employees = state.employees.filter((employee) => !payloadId.includes(employee.id));
        },
        selectEmployee: (state, action) => {
            state.selectedEmployees = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.employees = action.payload;
            })
            .addCase(fetchEmployees.rejected, state => {
                state.status = 'error'
            });
        builder
            .addCase(removeCompany, (state, action) => {
                state.employees = state.employees.filter((employee) => !action.payload.includes(employee.idCompany));
            })
    }

})

export const { addEmployee, editEmployee, removeEmployee, selectEmployee } = employeesSlice.actions

export default employeesSlice.reducer

export const selectEmployees = state => state.employees.employees
export const selectSelectedEmployees = state => state.employees.selectedEmployees
