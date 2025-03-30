import type { Route } from "./+types/country";

export async function clientLoader({ params }: Route.LoaderArgs) {
    const countryName = params.countryName;

    const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    const data = await res.json();
    return data;
}

export default function Country({ loaderData }: Route.ComponentProps) {
    console.log(loaderData)
    return (
        <>
        {loaderData.map((country: any) => (
            <div className="flex gap-10 p-5">
                <div>
                    <img src={country.flags.png} alt="" />
                    <h1 className="text-xl font-bold">{country.name.common}</h1>
                    <h1 className="text-md">{country.name.official}</h1>
                    <h1>Capital: {country.capital}</h1>
                    <h1>Continent: {country.continents}</h1>
                    <h1>Population: {country.population.toLocaleString()}</h1>
                </div>
                <div>
                    <img src={country.coatOfArms.png} width={200} alt="" />
                    <h1>coatOfArms</h1>
                </div>
            </div>
        ))}
        </>
    );
}