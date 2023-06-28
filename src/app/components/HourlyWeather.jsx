
import Image from 'next/image';
import moment from 'moment-timezone';
const HourlyWeather = ({hourlyWeather,timezone}) => {
    return (
        <div className=''>
            <div className='flex gap-3 my-6 justify-between flex-row overflow-scroll'>
                {hourlyWeather.map((weather,index)=>(
                   <div key={index} className=' '>
                     <div className=' w-40 md:w-60 bg-blue-400 rounded-md flex flex-col justify-center items-center' key={weather.dt}>
                        <span  className=' mt-6'>
                            {index==0 ? "Now": moment.unix(weather.dt).tz(timezone).format("LT")}
                        </span>
                        <Image  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} width={100} height={100}></Image>
                        <span className='mb-3'> {weather.temp.toFixed(0)}&deg;</span>
                    </div>
                   </div>
                ))}
            </div>
        </div>
    );
}

export default HourlyWeather;
