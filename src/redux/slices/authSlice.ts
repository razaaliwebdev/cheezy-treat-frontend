import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface User {
    _id: string
    name: string;
    email: string;
    role: string;
    isActive: boolean;
    phone: string;
    isVerified: boolean;
    orders: string[];
    address: string[];
    profileImage: string;
}

interface AuthState {
    user: User | null;
    // token: string | null;
}

const initialState: AuthState = {
    user: null
    // token: null
}

const authSlice = createSlice(
    {
        name: "auth",
        initialState,
        reducers: {
            setAuthData: (state, action: PayloadAction<{ user: User }>) => {
                state.user = action.payload.user;
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