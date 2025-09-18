



const fetchWeatherData = async (url) => {
  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error('Something went wrong');
  }
  return await response.json();
};


const apiKey = '8a74cd7322027b935f56db4578868547';
export const getWeatherData = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  return await fetchWeatherData(url);
};

export const getWeatherForecast = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  const data = await fetchWeatherData(url);
  return data.list.filter((_, index) => index % 8 === 0);
};
