import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//     // fullname: '',
//     // size: 0,
//     // toppings: [false, false, false, false, false],
//     sizeFilter: 'All'
// }

export const slice = createSlice({
    name: 'pizzaSlice',
    initialState: {
        sizeFilter: 'All',
        fullName: '',
        size: '',
        toppings: []
    },
    // initialState: initialState,
    reducers: {
        filterBySize(state, action) {
            state.sizeFilter = action.payload
        },
        toggleTopping(state, action) {
            state.toppings = [ ...state.toppings, action.payload ]
        }
    }
})

export default slice.reducer

export const { filterBySize,toggleTopping } = slice.actions