import {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        user: null,
        message: '',
        variant: ''
    },
    reducers: {
        setLoading: (state,action) => {
            state.loading = action.payload
        },
        setUser: (state,action) => {
            state.user = action.payload
        },
        setMessage: (state,action) => {
            state.message = action.payload
        },
        setVariant: (state,action) => {
            state.variant = action.payload
        }
    }
})

export const {setLoading, setUser, setMessage, setVariant} = authSlice.actions
const reducers = authSlice.reducer
export default reducers