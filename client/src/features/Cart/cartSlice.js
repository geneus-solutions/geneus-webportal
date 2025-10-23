import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'auth',
    initialState: {
        cartCount: 0,
        cart: null,
    },
    reducers: {
        Cart:(state, action) => {
            const {cart} = action.payload;
            state.cartCount = cart?.cart_items?.length;
            state.cart =cart;
        },
        emptyCart: (state, action) => {
            state.cartCount = 0;
            state.cart = null
        }
    }
});


export const {Cart, emptyCart} = cartSlice.actions;
export default cartSlice.reducer;

// export const {setCredentials, logOut} = authSlice.actions;
// export default authSlice.reducer;

// export const selectCurrentUser = state => state.auth.user;
// export const selectCurrentToken = state => state.auth.token;