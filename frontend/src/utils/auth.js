import { jwtDecode } from "jwt-decode";


// ----------------------------------
// Get Current Logged-in User
// ----------------------------------

export const getCurrentUser = () => {

  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {

    const decoded = jwtDecode(token);

    // Check JWT expiry
    if (decoded.exp) {

      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {

        localStorage.removeItem("token");

        return null;
      }
    }

    return decoded;

  } catch (error) {

    console.error("Invalid JWT token:", error);

    localStorage.removeItem("token");

    return null;
  }

};


// ----------------------------------
// Check Login Status
// ----------------------------------

export const isAuthenticated = () => {

  return getCurrentUser() !== null;

};


// ----------------------------------
// Logout
// ----------------------------------

export const logoutUser = () => {

  localStorage.removeItem("token");

};