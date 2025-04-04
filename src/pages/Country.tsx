import { Link, useLoaderData } from "react-router";
import { MoveLeft } from 'lucide-react';

export async function countryLoader({ params }: { params: { countryName?: string } }) {
    const countryName = params.countryName;
    
    if (!countryName) {
        throw new Response("Country not found", { status: 404 });
    }
    
    const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
    
    if (!res.ok) {
        throw new Response("Country data not found", { status: res.status });
    }
    
    return res.json();
}

export default function Country() {
    const countryData = useLoaderData() as any[];
    
    return (
        <>
            {countryData.length > 0 ? (
                <div className="p-5">
                    <Link to="/countries" className="border border-slate-400 hover:shadow-lg transition p-2 inline-flex items-center rounded-full">
                        <MoveLeft className="text-slate-500 w-6 h-6" />
                    </Link>

                    <div className="flex flex-col md:flex-row gap-10 mt-10">
                        <div>
                            <img src={countryData[0].flags.png} alt="" />
                            <h1 className="text-xl font-bold">{countryData[0].name.common}</h1>
                            <h1 className="text-md">{countryData[0].name.official}</h1>
                            <h1>Capital: {countryData[0].capital}</h1>
                            <h1>Continent: {countryData[0].continents}</h1>
                            <h1>Population: {countryData[0].population.toLocaleString()}</h1>
                        </div>
                        <div>
                            <img src={countryData[0].coatOfArms.png} width={200} alt="" />
                            <h1>coatOfArms</h1>
                        </div>
                    </div>
                </div>
                
            ) : (
                <p>Loading...</p>
            )}
        </>
      );
}

export function CountryError() {
    return (
        <div className="w-full h-[100svh] flex justify-center items-center">
            <div className="flex flex-col text-center items-center">
                <h1 className="mb-5 text-6xl">❌ 404 - Country Not Found or Not Existing at All</h1>
                <Link 
                    to="/countries" 
                    className="mr-4 bg-slate-100 border border-slate-200 py-3 px-4 rounded-sm
                    hover:border-[#646cff] transition-all duration-300 ease-in-out"
                >   Go Back to Countries
                </Link>
            </div>
        </div>
    );
}
