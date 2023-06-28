"use client"
import { useState } from 'react';
import cities from '@/lib/city.list.json'
import Link from 'next/link';
const SearchBox = () => {
    const [query, setquery] = useState("");
    const [result, setresult] = useState([]);
    const onChange = (e) => {
        const { value } = e.target;
        setquery(value);
        let matchingCities = [];

        if (value.length > 3) {
            for (let city of cities) {
                if (matchingCities.length >= 5) {
                    break;
                }
                const match = city.name.toLowerCase().startsWith(value.toLowerCase());
                if (match) {
                    const cityData = {
                        ...city,
                        slug:`${city.name.toLowerCase().replace(/ /g, "_")}-${city.id}`
                    }
                    matchingCities.push(cityData);
                }
            }
        }
        setresult(matchingCities);
    };
    
    return (
        <div className='w-[80%]'>
            <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input value={query} onChange={onChange} type="search" id="search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />

            </div>
            <div>
                {query.length > 3 && <div className=' text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  p-2 mt-2'>
                    <ul className=''>
                        {result.length > 0 ? (result.map((city, index) => {
                            return <li className='p-2 hover:text-blue-500' key={index}>
                                <Link href= {`/location/${city.slug}`}>
                                    {city.name}
                                    {city.state ? `, ${city.state}` : ""}
                                    <span>({city.country})</span>
                                </Link>
                                <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                                
                            </li>
                        })) :(<li>No result</li>)}
                    </ul>

                </div>}
            </div>


        </div>
    );
}

export default SearchBox;
