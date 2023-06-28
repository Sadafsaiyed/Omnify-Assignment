
import moment from 'moment-timezone';
import TodaysWeather from '@/app/components/TodaysWeather';
import HourlyWeather from '@/app/components/HourlyWeather';
import WeeklyWeather from '@/app/components/WeeklyWeather';
import SearchBox from '@/app/components/SearchBox';
export const metadata = {
    title: '',
    description: '...',
  }
const gethourlyweather  = (hourlyData,timezone)=>{
    const endofDay=moment().tz(timezone).endOf('day').valueOf();
    const eodTimestamp = Math.floor(endofDay/1000);
    const todayData = hourlyData.filter(data=> data.dt < eodTimestamp);
    return todayData;
 }

const getcityreport = async (url,city) => {
    const res = await fetch(url, {
        next: {
            revalidate: 10000,
        }
    });
    const data = await res.json()
    const hourlyWeather = gethourlyweather(data.hourly,data.timezone)
    return {city:city,currentWeather:data.current,dailyWeather:data.daily,hourlyWeacher:hourlyWeather,timezone:data.timezone}
}

const getcityid = async (id) => {
    const city = await fetch(`https://weather-appication.vercel.app/api/citibyid?id=${id}`)
    const citydata = await city.json();
    return citydata
}






const Page = async ({ params }) => {
    const pcity = params.city
    const splitdata = pcity.trim().split('-');
    const id = splitdata[splitdata.length - 1];
    const city = await getcityid(Number(id))
    

    const cityreport = await getcityreport(`https://api.openweathermap.org/data/3.0/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.API_KEY}&units=metric`,city)
    
    // setting meta data 
    metadata.title=`${cityreport.city.name} Weather - Next Weather App`

    return (
        <div className='mt-6 mx-2 md:mx-10 md:mt-4'>
            <div className='flex justify-center my-6'>
                <SearchBox/>
            </div>
            <div>
                <TodaysWeather city={cityreport.city} timezone={cityreport.timezone} weather={cityreport.dailyWeather[0]}/>
            </div>
            <div className='mt-3'>
                <HourlyWeather hourlyWeather={cityreport.hourlyWeacher} timezone={cityreport.timezone}/>
            </div>
            <div>
                <WeeklyWeather weeklyweather={cityreport.dailyWeather} timezone={cityreport.timezone}></WeeklyWeather >
            </div>
        </div>
    );
}

export default Page;

