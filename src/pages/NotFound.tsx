import { Link } from "react-router";

export default function NotFound(){
    return (
        <div className="w-full h-[100svh] flex justify-center items-center">
            <div className="flex flex-col items-center">
                <h1 className="mb-5 text-6xl">❌ 404 - Page Not Found</h1>
                <Link 
                    to="/" 
                    className="mr-4 bg-slate-100 border border-slate-200 py-3 px-4 rounded-sm
                    hover:border-[#646cff] transition-all duration-300 ease-in-out"
                >   Go Back to Home
                </Link>
            </div>
            
        </div>
    );
}