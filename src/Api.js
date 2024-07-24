import React from 'react';
async function getCountries() {
  try {
    let response = await fetch('https://crio-location-selector.onrender.com/countries');
    let countries = await response.json();
    return countries;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
}

async function getStates(countryName) {
  try {
    let response = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/states`);
    let states = await response.json();
    return states;
  } catch (error) {
    console.error(`Error fetching states for country ${countryName}:`, error);
    return [];
  }
}

async function getCities(countryName, stateName) {
  try {
    let response = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`);
    let cities = await response.json();
    return cities;
  } catch (error) {
    console.error(`Error fetching cities for state ${stateName} in country ${countryName}:`, error);
    return [];
  }
}

export { getCountries, getStates, getCities };
