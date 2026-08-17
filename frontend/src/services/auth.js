import api from "./api";


// ----------------------------
// Login
// ----------------------------
export async function login(

  email,

  password

) {

  const { data } = await api.post(

    "/auth/login",

    {

      email,

      password

    }

  );

  return data;

}


// ----------------------------
// Send OTP
// ----------------------------
export async function sendOTP(

  name,

  email,

  password

) {

  const { data } = await api.post(

    "/otp/send",

    {

      name,

      email,

      password

    }

  );

  return data;

}


// ----------------------------
// Verify OTP
// ----------------------------
export async function verifyOTP(

  email,

  otp

) {

  const { data } = await api.post(

    "/otp/verify",

    {

      email,

      otp

    }

  );

  return data;

}


// ----------------------------
// Resend OTP
// ----------------------------
export async function resendOTP(

  name,

  email,

  password

) {

  const { data } = await api.post(

    "/otp/resend",

    {

      name,

      email,

      password

    }

  );

  return data;

}


// ----------------------------
// Direct Register (Optional)
// ----------------------------
export async function register(

  name,

  email,

  password

) {

  const { data } = await api.post(

    "/auth/register",

    {

      name,

      email,

      password

    }

  );

  return data;

}