import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addEmployee, removeEmployee } from "./employeesSlice";

export const fetchCompanies = createAsyncThunk('companies/fetchCompanies', async () => {
    const response = await fetch('company.json')
    const data = response.json()
    return data
})

export const companiesSlice = createSlice({
    name: 'companies',
    initialState: {
        companies: [],
        selectedCompanyes: [],
        status: null,
        error: null
    },
    reducers: {
        addCompany: (state, action) => {
            state.companies.push(
                {
                    id: new Date().toISOString(),
                    name: action.payload.name,
                    amountEmployees: action.payload.amountEmployees,
                    address: action.payload.address
                }
            )
        },
        editCompany: (state, action) => {
            let editedCompany = state.companies.find((company) => company.id === action.payload.id)
            editedCompany[action.payload.field] = action.payload.value

        },
        removeCompany: (state, action) => {
            state.companies = state.companies.filter((company) => !action.payload.includes(company.id));
        },
        selectCompany: (state, action) => {
            state.selectedCompanyes = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompanies.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchCompanies.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.companies = action.payload
            })
            .addCase(fetchCompanies.rejected, state => {
                state.status = 'error'
            });
        builder
            .addCase(removeEmployee, (state, action) => {
                console.log(action.payload);
                action.payload.forEach((item) => {
                    let editedCompany = state.companies.find((company) => company.id === item.idCompany)
                    editedCompany.amountEmployees -= 1
                });
            })
            .addCase(addEmployee, (state, action) => {
                console.log(action.payload);
                let editedCompany = state.companies.find((company) => company.id === action.payload.idCompany)
                editedCompany.amountEmployees += 1
            })
    }
})

export const { addCompany, removeCompany, editCompany, selectCompany, editCurrentPage } = companiesSlice.actions

export default companiesSlice.reducer

export const selectCompanies = state => state.companies.companies
export const selectSelectedCompanies = state => state.companies.selectedCompanyes
