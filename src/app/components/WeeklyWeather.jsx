import Image from 'next/image';
import moment from 'moment-timezone';
const WeeklyWeather = ({ weeklyweather, timezone }) => {
    return (
        <div  className='text-black'>
            <h1 className=' text-xl'>
                <span className='font-bold'>Weekly</span>  Weather
            </h1>
            {weeklyweather.length > 0 && weeklyweather.map((weather, index) => {
                if (index == 0) {
                    return;
                }
                return (
                    <div key={index} className=' bg-purple-200  my-3 rounded-lg p-3'>
                        <div className='flex justify-between'>
                            <div className='flex gap-5'>
                                <div>
                                    <h3>
                                        {moment.unix(weather.dt).tz(timezone).format("dddd ")}
                                    </h3>
                                    <h4>
                                        <span> {weather.temp.max.toFixed(0)}&deg;</span>
                                        <span> {weather.temp.min.toFixed(0)}&deg;</span>
                                    </h4>
                                </div>

                                <div className='flex mt-2 gap-3'>
                                    <div className=' flex flex-col font-semibold'>
                                        <span className='text-xs'>Sunrise</span>
                                        <span className='text-xs   font-bold'>{moment.unix(weather.sunrise).tz(timezone).format("LT")}</span>
                                    </div>
                                    <div className=' flex flex-col font-semibold'>
                                        <span className='text-xs'>Sunset</span>
                                        <span className='text-xs  font-bold'>{moment.unix(weather.sunset).tz(timezone).format("LT")}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='relative flex justify-center items-center'>
                    <Image width={100} height={50} src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></Image>
                    <h3 className='absolute top-[80%] text-xs font-semibold'>
                        {weather.weather[0].description} 
                    </h3>
                </div>
                            
                        </div>
                    </div>
                )

            })}
        </div>
    );
}

export default WeeklyWeather;
