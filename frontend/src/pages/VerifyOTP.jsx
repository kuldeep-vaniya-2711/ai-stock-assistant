import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
    verifyOTP,
    resendOTP
} from "../services/auth";

function VerifyOTP() {

    const navigate = useNavigate();

    const name = localStorage.getItem("otpName");
    const email = localStorage.getItem("otpEmail");
    const password = localStorage.getItem("otpPassword");

    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(60);

    useEffect(() => {

        if (!email) {

            navigate("/register");

        }

    }, [email, navigate]);

    useEffect(() => {

        if (timer === 0) return;

        const interval = setInterval(() => {

            setTimer((prev) => prev - 1);

        }, 1000);

        return () => clearInterval(interval);

    }, [timer]);



    const handleVerify = async () => {

        try {

            const data = await verifyOTP(
                email,
                otp
            );

            alert(data.message);

            if (data.success) {

                localStorage.removeItem("otpName");
                localStorage.removeItem("otpEmail");
                localStorage.removeItem("otpPassword");

                navigate("/login");

            }

        }

        catch (error) {

            alert("OTP Verification Failed");

            console.log(error);

        }

    };



    const handleResend = async () => {

        if (timer > 0) return;

        try {

            const data = await resendOTP(

                name,

                email,

                password

            );

            alert(data.message);

            if (data.success) {

                setTimer(60);

            }

        }

        catch (error) {

            alert("Failed to resend OTP");

            console.log(error);

        }

    };



    return (

        <div className="min-h-screen flex justify-center items-center bg-slate-950">

            <div className="bg-slate-900 p-8 rounded-xl w-96">

                <h1 className="text-3xl font-bold text-white mb-6">

                    Verify OTP

                </h1>

                <p className="text-gray-400 mb-5">

                    OTP sent to

                    <br />

                    <span className="text-cyan-400">

                        {email}

                    </span>

                </p>

                <input

                    type="text"

                    placeholder="Enter 6 Digit OTP"

                    className="w-full p-3 rounded bg-slate-800 text-white mb-5"

                    value={otp}

                    onChange={(e) => setOtp(e.target.value)}

                />

                <button

                    onClick={handleVerify}

                    className="w-full bg-cyan-500 p-3 rounded font-bold"

                >

                    Verify OTP

                </button>

                <button

                    onClick={handleResend}

                    disabled={timer > 0}

                    className={`w-full mt-4 p-3 rounded font-bold ${timer > 0
                        ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                        : "bg-green-500 text-white"
                        }`}

                >

                    {

                        timer > 0

                            ? `Resend OTP in ${timer}s`

                            : "Resend OTP"

                    }

                </button>

            </div>

        </div>

    );

}

export default VerifyOTP;