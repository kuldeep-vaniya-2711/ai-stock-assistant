import { getCurrentUser } from "../utils/auth";

export default function DownloadReportButton() {

  const user = getCurrentUser();

  const download = () => {

    if (!user?.email) {

      alert("Please login first.");

      return;

    }

    window.open(

      `http://127.0.0.1:8000/report/${user.email}`,

      "_blank"

    );

  };

  return (

    <button

      onClick={download}

      className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 px-5 sm:px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg"

    >

      📄 Download Portfolio Report

    </button>

  );

}