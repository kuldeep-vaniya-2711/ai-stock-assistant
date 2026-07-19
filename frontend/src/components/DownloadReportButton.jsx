import { getCurrentUser } from "../utils/auth";

export default function DownloadReportButton(){

    const user=getCurrentUser();

    const download=()=>{

        window.open(

            `http://127.0.0.1:8000/report/${user.email}`,

            "_blank"

        );

    }

    return(

        <button

            onClick={download}

            className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-bold"

        >

            📄 Download Portfolio Report

        </button>

    )

}