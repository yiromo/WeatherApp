import React, {useState, useEffect} from "react";
import './weatherAppReact.css'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import markerIcon from '../assets/marker-icon.png';
import debounce from 'lodash/debounce';
import cloudsImg from '../assets/clouds.png'
import drizzleImg from '../assets/drizzle.png'
import rainImg from '../assets/heavy-rain.png'
import humidityImg from '../assets/humidity.png'
import sunImg from '../assets/sun.png'
import searchBtn from '../assets/search.png'
import windImg from '../assets/wind.png'
import snowImg from '../assets/snow.png'

const WeatherAppReact = () =>{

    let api_key="6e9cd5d0d766c2926aaeee0b3d4c9835";

    let api_key_time = "GyYJws6Vakc3femGbf1XuQ==CVjpcYtwLT4D8DJV";

    const [apodData, setApodData] = useState(null);
    const [apodDataLoading, setApodDataLoading] = useState(true);
    const [wimg, setWimg] = useState(cloudsImg);
    const [mapCenter, setMapCenter] = useState([51.505, -0.09]); // Default center for London
    const customMarker = new L.Icon({
        iconUrl: markerIcon,
        iconSize: [32, 32], // adjust the size of the marker
        iconAnchor: [16, 32], // adjust the anchor point
        popupAnchor: [0, -32], // adjust the popup position
    });

    const mapSearch = async () => {
        try {
            console.log('Start of mapSearch');
            const element = document.getElementsByClassName("inputCity");
            const cityName = element[0].value;

            if (!cityName) {
                console.log('City name is empty');
                return;
            }

            const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=${cityName}`;
            console.log('Nominatim URL:', nominatimUrl);
            const nominatimResponse = await fetch(nominatimUrl);
            const nominatimData = await nominatimResponse.json();

            if (nominatimData.length > 0) {
                const { lat, lon } = nominatimData[0];
                console.log('Received coordinates:', lat, lon);
                setMapCenter([parseFloat(lat), parseFloat(lon)]);
            }
            console.log('End of mapSearch');
        } catch (error) {
            console.error('Error during mapSearch:', error);
        }
    };

    const debouncedMapSearch = debounce(mapSearch, 1000); // Adjust the debounce delay as needed

    useEffect(() => {
        // Call the debouncedMapSearch function whenever mapCenter is updated
        debouncedMapSearch();
    }, [mapCenter]);

    const search = async () =>{
        const element = document.getElementsByClassName("inputCity");
        if (element[0].value===""){
            return 0;
        }


        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        let response = await fetch(url);
        let data = await response.json();

        const humidity = document.getElementsByClassName("humidity-element");
        const wind = document.getElementsByClassName("wind-element");
        const temprature=document.getElementsByClassName("weatherTemp");
        const location=document.getElementsByClassName("weatherLocation");

        humidity[0].innerHTML = data.main.humidity+" %";
        wind[0].innerHTML = Math.floor(data.wind.speed)+" km/h";
        temprature[0].innerHTML = Math.floor(data.main.temp)+"°c";
        location[0].innerHTML = data.name;

        if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n"){
            setWimg(sunImg);
            if(data.weather[0].icon === "01d"){
                document.querySelector('.container').style.backgroundImage = 'linear-gradient(180deg, #61dafb 0%, #282c34 100%)';
            }
            else{
                document.querySelector('.container').style.backgroundImage = 'linear-gradient(180deg, #354f7a 0%, #030914 100%)';
            }
        }
        else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n"){
            setWimg(cloudsImg);
            if(data.weather[0].icon === "02d"){
                document.querySelector('.container').style.backgroundImage = 'linear-gradient(180deg, #61dafb 0%, #282c34 100%)';
            }
            else{
                document.querySelector('.container').style.backgroundImage = 'linear-gradient(180deg, #354f7a 0%, #030914 100%)';
            }
        }
        else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n"){
            setWimg(drizzleImg);
            if(data.weather[0].icon === "03d"){
                document.querySelector('.container').style.backgroundImage = 'linear-gradient(180deg, #61dafb 0%, #282c34 100%)';
            }
            else{
                document.querySelector('.container').style.backgroundImage = 'linear-gradient(180deg, #354f7a 0%, #030914 100%)';
            }
        }
        else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
            setWimg(drizzleImg);
            if(data.weather[0].icon === "04d"){
                document.querySelector('.container').style.backgroundImage = 'linear-gradient(180deg, #61dafb 0%, #282c34 100%)';
            }
            else{
                document.querySelector('.container').style.backgroundImage = 'linear-gradient(180deg, #354f7a 0%, #030914 100%)';
            }
        }else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
            setWimg(rainImg);
            if(data.weather[0].icon === "09d"){
                document.querySelector('.container').style.backgroundImage = 'linear-gradient(180deg, #61dafb 0%, #282c34 100%)';
            }
            else{
                document.querySelector('.container').style.backgroundImage = 'linear-gradient(180deg, #354f7a 0%, #030914 100%)';
            }
        }
        else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n"){
            setWimg(rainImg);
            if(data.weather[0].icon === "10d"){
                document.querySelector('.container').style.backgroundImage = 'linear-gradient(180deg, #61dafb 0%, #282c34 100%)';
            }
            else{
                document.querySelector('.container').style.backgroundImage = 'linear-gradient(180deg, #354f7a 0%, #030914 100%)';
            }
        }
        else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
            setWimg(snowImg);
            if(data.weather[0].icon === "13d"){
                document.querySelector('.container').style.backgroundImage = 'linear-gradient(180deg, #61dafb 0%, #282c34 100%)';
            }
            else{
                document.querySelector('.container').style.backgroundImage = 'linear-gradient(180deg, #354f7a 0%, #030914 100%)';
            }
        }
        else{
            setWimg(sunImg);
        }

    }

    const locationTime = async () => {
        try {
            const element = document.getElementsByClassName("inputCity");

            if (element[0].value === "") {
                return 0;
            }

            let url = `https://api.api-ninjas.com/v1/worldtime?city=${element[0].value}`;
            let headers = {
                "X-Api-Key": api_key_time,
            };

            let response = await fetch(url, { headers });
            let data = await response.json();

            const locationTimeElement = document.getElementsByClassName("locationTime");
            locationTimeElement[0].innerHTML = data.datetime;

        } catch (error) {
            console.error('Error fetching time data:', error);
        }


    }

    useEffect(() => {
        const fetchApodData = async () => {
            try {
                const apiKey = "7qblMNb53cPgdpUv0MlYmsPUfXmidod7IpIwufQU";
                const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

                const response = await fetch(apiUrl);
                const data = await response.json();

                setApodData(data);
                setApodDataLoading(false);
            } catch (error) {
                console.error('Error fetching APOD data:', error);
                setApodDataLoading(false);
            }
        };

        if (apodDataLoading) {
            fetchApodData();
        }

    }, [apodDataLoading]);


    return(
        <div className="container">
            <div className="nav-bar">
                <input type="text" className="inputCity" placeholder='Search'/>
                <div className="searchImg" onClick={()=>{ search(); locationTime(); mapSearch(); }}>
                    <img src={searchBtn} alt="search" />
                </div>
            </div>
            <div className="weatherImg">
                <img src={wimg} alt="cloud"/>
            </div>
            <div className="weatherTemp">24°c</div>
            <div className="weatherLocation">Astana</div>
            <div className="locationTime">09:17</div>
            <div className="dataContainer">
                <div className="assets">
                    <img src={humidityImg} alt=""/>
                    <div className="data">
                        <div className="humidity-element">
                            64%
                        </div>
                        <div className="text">
                            Humidity
                        </div>
                    </div>
                </div>
                <div className="assets">
                    <img src={windImg} alt=""/>
                    <div className="data">
                        <div className="wind-element">
                            20 km/s
                        </div>
                        <div className="text">
                            Wind Speed
                        </div>
                    </div>
                </div>
            </div>

            {apodData && (
                <div className="nasa-apod">
                    <div className="nasa-apod-text">Picture Of The Day</div>
                    <img src={apodData.url} alt={apodData.title} />
                    <div className="apod-title">{apodData.title}</div>
                    <div className="apod-explanation">{apodData.explanation}</div>
                </div>
            )}

            <MapContainer
                key={`${mapCenter[0]}-${mapCenter[1]}`} // Add a unique key to force re-render
                center={mapCenter}
                zoom={10}
                style={{ height: "300px", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={mapCenter} icon={customMarker}>
                    <Popup>{document.getElementsByClassName("inputCity")[0]?.value}</Popup>
                </Marker>
            </MapContainer>

        </div>
    )
}

export default WeatherAppReact