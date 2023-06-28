import React from 'react';
import Image from 'next/image';
import moment from 'moment-timezone';
const TodaysWeather = ({ city, weather,timezone }) => {
 
    return (
        <div className='bg-blue-600 rounded-md flex  justify-between p-3 text-white md:p-6 '>
            <div className='w-[70%] '>
                <h1 className='text-xl font-bold'>{city.name} ({city.country})</h1>
                <h2 className=''>
                    <span className='mr-2 text-lg font-bold'> {weather.temp.max.toFixed(0)}&deg;</span>
                    <span className='text-md text-gray-300 font-bold'>{weather.temp.min.toFixed(0)}&deg;</span>
                </h2>
                <div className='flex mt-2 gap-3'>
                    <div className=' flex flex-col font-semibold'>
                        <span className='text-xs'>Sunrise</span>
                        <span className='text-xs  text-gray-300 font-bold'>{moment.unix(weather.sunrise).tz(timezone).format("LT")}</span>
                    </div>
                    <div className=' flex flex-col font-semibold'>
                        <span className='text-xs'>Sunset</span>
                        <span className='text-xs text-gray-300 font-bold'>{moment.unix(weather.sunset).tz(timezone).format("LT")}</span>
                    </div>
                </div>
            </div>
            <div className=' '>
                <div className='relative flex justify-center items-center'>
                    <Image width={100} height={50} src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></Image>
                    <h3 className='absolute top-[80%] text-xs font-semibold'>
                        {weather.weather[0].description} 
                    </h3>
                </div>
                
            </div>
        </div>
    );
}

export default TodaysWeather;
