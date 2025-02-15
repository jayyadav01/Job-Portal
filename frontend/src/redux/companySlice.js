import { createSlice } from '@reduxjs/toolkit';

const comapanySlice = createSlice({
    name: 'company',
    initialState: {
        singleCompany: null,
        companies: [],
        // searchCompanyByText: ''
    },
    reducers: {
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload
        },
        setCompanies: (state, action) => {
            state.companies = action.payload
        },
        // setSearchQueryCompanyByText: (state, action) => {
        //     state.searchCompanyByText = action.payload
        // }
    }
})

export const {setSingleCompany, setCompanies} = comapanySlice.actions
export default comapanySlice.reducer