import './App.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { getCountries, getStates, getCities } from './Api.js';
function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    const fetchCountriesData = async () => {
      const data = await getCountries();
      setCountries(data);
      setLoadingCountries(false);
    };

    fetchCountriesData();
  }, []);

  const handleCountryChange = async (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
    setSelectedState('');
    setSelectedCity('');
    setStates([]);
    setCities([]);

    if (country) {
      setLoadingStates(true);
      const statesData = await getStates(country);
      setStates(statesData);
      setLoadingStates(false);
    }
  };

  const handleStateChange = async (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setSelectedCity('');
    setCities([]);

    if (state) {
      setLoadingCities(true);
      const citiesData = await getCities(selectedCountry, state);
      setCities(citiesData);
      setLoadingCities(false);
    }
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };


  return (
    <div className="App">
      <h1>Select Location</h1>
      <div className="location-selector">
      <div className="dropdown">
        <select id="country" value={selectedCountry} onChange={handleCountryChange}>
          <option value="">Select Country</option>
          {loadingCountries ? (
            <option>Loading...</option>
          ) : (
            countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))
          )}
        </select>
      </div>

      <div className="dropdown">
        <select id="state" value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
          <option value="">Select State</option>
          {loadingStates ? (
            <option>Loading...</option>
          ) : (
            states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))
          )}
        </select>
      </div>

      <div className="dropdown">
        <select id="city" value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
          <option value="">Select City</option>
          {loadingCities ? (
            <option>Loading...</option>
          ) : (
            cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))
          )}
        </select>
      </div>
    </div>
    {selectedCountry && selectedState && selectedCity && (
        <div className="selection-result">
          <p>You selected <b>{selectedCity}</b>,  {selectedState}, {selectedCountry}</p>
        </div>
      )}
    </div>
  );
}

export default App;
