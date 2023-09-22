import { useState, useEffect } from 'react';
import './App.css';

const apiWeather = {
	key: '01185adc83d43d7d9af07df102507fd0',
	base: 'https://api.openweathermap.org/data/2.5/',
};

const getLocation = async () => {
	return new Promise(function (resolve, reject) {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
};

function App() {
	const [query, setQuery] = useState('');
	const [weather, setWeather] = useState({});

	const fetchWeather = (lat, lon, query) => {
		fetch(
			`${apiWeather.base}weather?q=${query}&lat=${lat}&lon=${lon}&units=metric&appid=${apiWeather.key}`
		)
			.then((res) => res.json())
			.then((result) => {
				setWeather(result);
				setQuery('');
			});
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			fetchWeather('', '', query);
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
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		];

		let day = days[d.getDay()];
		let date = d.getDate();
		let month = months[d.getMonth()];
		let year = d.getFullYear();

		return `${day} ${date} ${month} ${year}`;
	};

	useEffect(() => {
		getLocation().then((position) => {
			fetchWeather(position.coords.latitude, position.coords.longitude, '');
		});
	}, []);

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
				<div className="searchBox">
					<input
						type="text"
						id="queryInput"
						className="searchBar"
						placeholder="Search..."
						value={query}
						onKeyDown={handleKeyDown}
						onChange={(e) => setQuery(e.target.value)}></input>
				</div>
				{typeof weather.main != 'undefined' ? (
					<div>
						<div className="locationBox">
							<div className="location">{`${weather.name},${weather.sys.country}`}</div>
							<div className="date">{dateBuilder(new Date())}</div>
						</div>
						<div className="weatherBox">
							{/* alt + shift + 8 for census symbol */}
							<div className="temp">{Math.round(weather.main.temp)}°C</div>
							<div className="weather">{`${weather.weather[0].description}`}</div>
						</div>
					</div>
				) : (
					<div className="date">loading...</div>
				)}
			</main>
		</div>
	);
}

export default App;
