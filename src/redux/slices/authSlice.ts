import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Address {
    addressLine: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

interface User {
    _id: string
    name: string;
    email: string;
    role: string;
    isActive: boolean;
    phone: string;
    isVerified: boolean;
    orders: Address[];
    address: string[];
    profileImage: string;
}

interface AuthState {
    user: User | null;
    // token: string | null;
}


const storeUser = localStorage.getItem("user");
const initialState: AuthState = {
    user: storeUser ? JSON.stringify(storeUser) : null
    // token: null
}

const authSlice = createSlice(
    {
        name: "auth",
        initialState,
        reducers: {
            setAuthData: (state, action: PayloadAction<{ user: User }>) => {
                state.user = action.payload.user;
                localStorage.setItem("user", JSON.stringify(action.payload.user))
                // state.token = action.payload.token;
            },

            clearAuthData: (state) => {
                state.user = null;
                // state.token = null;
            },
            // Update User profile
            updateUser: (state, action: PayloadAction<User>) => {
                if (state.user) {
                    state.user = { ...state.user, ...action.payload }
                }
            }
        }
    }
)

export const { setAuthData, clearAuthData, updateUser } = authSlice.actions;

export default authSlice.reducer;