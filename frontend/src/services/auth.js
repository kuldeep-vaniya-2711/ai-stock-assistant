import api from "./api";


// ----------------------------
// Login
// ----------------------------
export const login = async (email, password) => {

    const response = await api.post(
        "/auth/login",
        {
            email,
            password
        }
    );

    return response.data;

};


// ----------------------------
// Send OTP
// ----------------------------
export const sendOTP = async (
    name,
    email,
    password
) => {

    const response = await api.post(
        "/otp/send",
        {
            name,
            email,
            password
        }
    );

    return response.data;

};


// ----------------------------
// Verify OTP
// ----------------------------
export const verifyOTP = async (
    email,
    otp
) => {

    const response = await api.post(
        "/otp/verify",
        {
            email,
            otp
        }
    );

    return response.data;

};


// ----------------------------
// Resend OTP
// ----------------------------
export const resendOTP = async (
    name,
    email,
    password
) => {

    const response = await api.post(
        "/otp/resend",
        {
            name,
            email,
            password
        }
    );

    return response.data;

};


// ----------------------------
// Register (Optional)
// ----------------------------
export const register = async (
    name,
    email,
    password
) => {

    const response = await api.post(
        "/auth/register",
        {
            name,
            email,
            password
        }
    );

    return response.data;

};