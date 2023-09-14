import { useState } from 'react';
import './App.css';

const api = {
	key: '01185adc83d43d7d9af07df102507fd0',
	base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
	const [query, setQuery] = useState('');
	const [weather, setWeather] = useState({});

	const fetchData = (query) => {
		fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
			.then((res) => res.json())
			.then((result) => {
				setWeather(result);
				setQuery('');
			});
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			fetchData(query);
		}
	};

	const dateBuilder = (d) => {
		let months = [
			'January',
			'Febuary',
			'March',
			'April',
			'May',
			'June',
			'July',
			'Augst',
			'September',
			'October',
			'November',
			'December',
		];
		let days = [
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
			'Sunday',
		];

		let day = days[d.getDay()];
		let date = d.getDate();
		let month = months[d.getMonth()];
		let year = d.getFullYear();

		return `${day} ${date} ${month} ${year}`;
	};

	// const getTemp = () => {
	// 	console.log(Math.round(weather.main.temp));
	// 	return `${Math.round(weather.main.temp)}°C`;
	// };

	return (
		<div
			className={
				typeof weather.main != 'undefined'
					? weather.main.temp > 16
						? 'app warm'
						: 'app'
					: 'app'
			}>
			<main>
				<div className="search-box">
					<input
						type="text"
						id="queryInput"
						className="search-bar"
						placeholder="Search..."
						value={query}
						onKeyDown={handleKeyDown}
						onChange={(e) => setQuery(e.target.value)}></input>
				</div>
				{typeof weather.main != 'undefined' ? (
					<div>
						<div className="location-box">
							<div className="location">{`${weather.name},${weather.sys.country}`}</div>
							<div className="date">{dateBuilder(new Date())}</div>
						</div>
						<div className="weather-box">
							{/* alt + shift + 8 for census symbol */}
							<div className="temp">{Math.round(weather.main.temp)}°C</div>
							<div className="weather">{`${weather.weather[0].description}`}</div>
						</div>
					</div>
				) : (
					''
				)}
			</main>
		</div>
	);
}

export default App;
