import React, { useEffect } from 'react';
import { getCurrent, getForecast } from './API/weather/weatherAPI';

function App() {
  useEffect(() => {
    getCurrent("burgas", 2)
  }, [])
  return (
    <div className="App">


    </div>
  );
}

export default App;
