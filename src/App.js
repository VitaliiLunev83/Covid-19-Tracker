import React, { useState, useEffect } from 'react';
import './App.css';
import { FormControl, MenuItem, Select,Card,CardContent, } from '@material-ui/core';
import InfoBox from './InfoBox';
import Maps from './Map';
import Table from './Table.js';
import {sortData, prettyPrintStat} from './util.js';
import LineGraph from './LineGraph';




function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat: 59.57, lng: 30.19});
  const [mapZoom, setMapZoom] = useState(4);
  const [mapCountries,setMapCountries] = useState([]);
  const [casesType,setCasesType] = useState("cases");
   
  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response=>response.json())
    .then(data =>{setCountryInfo(data)})
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
            id: country.countryInfo.id
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        })
    }

    getCountriesData();

  }, []);
  
  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    
    const url = 
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);


        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);

      })
    
  }
 

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid19-Tracker</h1>

          <FormControl className="app__dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (<MenuItem value={country.value} key={country.id}>{country.name}</MenuItem>))}

            </Select>


          </FormControl>

        </div>
        <div className="app__stats">
          <InfoBox 
            isRed
            onClick={e=>setCasesType("cases")}
            active={casesType === "cases"}
            
           
           title="Coronovirus" total={prettyPrintStat(countryInfo.cases)} cases={prettyPrintStat(countryInfo.todayCases)}
            />
          <InfoBox 
          
          onClick={e=>setCasesType("recovered")}
          active={casesType === "recovered"}
          title="Recovered" total={prettyPrintStat(countryInfo.recovered)} cases={prettyPrintStat(countryInfo.todayRecovered)} />
          <InfoBox 
          isRed 
          onClick={e=>setCasesType("deaths")}
          active={casesType === "deaths"}
          title="Deaths" total={prettyPrintStat(countryInfo.deaths)} cases={prettyPrintStat(countryInfo.todayDeaths)} />
        </div>
        <div className="app__map">
          <Maps center={mapCenter}
                zoom={mapZoom}
                countries={mapCountries}
                casesType={casesType}
                 />
        </div>


      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live cases by Country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new {casesType}</h3>
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>
      


    </div>
  );
}

export default App;
