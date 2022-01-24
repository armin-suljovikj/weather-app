import React, {useState} from 'react';
import './weather.css'
import DisplayWeather from './DisplayWeather';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
function Weather() {
    
    const apiData = {
        key: "94687ad8b7b0592fc2f62dcb5eaebea2",
        base: "https://api.openweathermap.org/data/2.5/weather?q="
      }

    const [weather, setWeather] = useState([]);

    const [form, setForm] = useState({
      city: "",
      country: "",
    });
  
    async function weatherData(event) {

      event.preventDefault();

      if (!form.city || /^\s*$/.test(form.city)){
        toast("Please enter the city", {position: toast.POSITION.BOTTOM_CENTER});
      } else {
          
        await fetch(
          `${apiData.base}${form.city},${form.country}&APPID=${apiData.key}`
        )
          .then((res) => res.json())
          .then((weatherData) => setWeather({ data: weatherData }));
      }
    }
  
    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value});
    };

    return (
        <div className="weather">
          <span className="title">Weather App</span>
          <br />
          <form>
            <input
              type="text"
              placeholder="city"
              name="city"
              onChange={(event) => handleChange(event)}
            />
            &nbsp; &nbsp; &nbsp;&nbsp;
            <input
              type="text"
              placeholder="Country"
              name="country"
              onChange={(event) => handleChange(event)}
            />
            <button className="getweather" onClick={(event) => weatherData(event)}>
              Submit
            </button>
          </form>
          {weather.data != undefined ? (
            <div>
            <DisplayWeather data={weather.data} />
            </div>
          ) : null}
        </div>
      );
}

export default Weather;
