import { Link } from "react-router";
import { useLoaderData } from "react-router";
import { useState, useEffect } from "react";

export async function countriesLoader() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();
  return data;
}

export default function Countries() {
  const loaderData = useLoaderData() as any[] || [];

  useEffect(() => {
    console.log(loaderData, 'loaderData inside Countries');
  }, [loaderData]);

  const [search, setSearch] = useState<string>("");
  const [continent, setContinents] = useState<string>("");

  const filteredCountries = loaderData.filter((country: any) => {
    const matchesSearch = !search || country.name.common.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  }).filter((country: any) => (continent ? country.region === continent : true));

  // filtered to get the unique continents
  const continents = Array.from(
    new Set(loaderData.map((country: any) => country.region).filter(Boolean))
  );

  return (
    <div className="p-4">
      <h1 className="text-md">Filters</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <input 
          type="text" 
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-slate-400 py-2 px-3 text-base rounded-md h-10"
        />
        <select
          value={continent}
          onChange={(e) => setContinents(e.target.value)}
          className="border border-slate-400 py-2 px-3 text-base rounded-md h-10"
        >
          <option value="">All Continents</option>
          {continents.map((region: any) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      <h1 className="text-xl font-bold mt-4">Countries</h1>
      
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredCountries.sort((a: any, b: any) => a.name.common.localeCompare(b.name.common))
          .map((country: any) => (
            <li key={country.cca3} className="border border-slate-500 rounded-md shadow py-2 px-3 cursor-pointer hover:shadow-lg transition">
              <Link to={country.name.common}>
                <h1 className="font-bold text-green-600">{country.name.common}</h1>
                <div>
                  <p className="text-sm">Region: {country.region}</p>
                  <p className="text-sm">Population: {country.population.toLocaleString()}</p>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}