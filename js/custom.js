var covidData = {};

window.addEventListener("load",async()=>{
  covidData = await fetchCovidData();
  createSelectCountry(covidData.Countries);
  createGlobalStats(covidData.Global)
  let selectCountryForm = document.getElementById("selectCountryForm")
  selectCountryForm.addEventListener("submit", submitCountry)
})

async function fetchCovidData() {
  try {
    const res = await fetch("https://api.covid19api.com/summary");
    const data = await res.json()
    console.log(data)

    return data;
  } catch (error) {
    // const message = `An error has occured: ${res.status}`;
    console.error(error)
    // throw new Error(error);
  }
}

/**
 * creates a dropdown off al the exsisting countries
 * @param {*} countries all the countries from the COVID19 API 
 * @returns null
 */
function createSelectCountry(countries){
  let selectCountry = document.getElementById("selectCountry");
  countries.forEach(function(value, index) {
    let countryName = value.Country
    const option = document.createElement("option")
    option.setAttribute("value", countryName)
    selectCountry.appendChild(option)
    // console.log(value.Country)
  })
}


//https://api.covid19api.com/total/dayone/country/
function submitCountry(e){
  e.preventDefault()
  let getSelectedCountry = document.getElementById("getSelectedCountry")
  
  const data = covidData.Countries.find(c => c.Country === getSelectedCountry.value);
  console.log(data)

  let pCountryConfirmed = document.querySelector("#pCountryConfirmed span")
  let pCountryRecovered = document.querySelector("#pCountryRecovered span")
  let pCountryDeaths = document.querySelector("#pCountryDeaths span")
  pCountryConfirmed.innerHTML = data.TotalConfirmed.format()
  pCountryRecovered.innerHTML = data.TotalRecovered.format()
  pCountryDeaths.innerHTML = data.TotalDeaths.format()

  let displayCountry = document.getElementById("displayCountry")
  displayCountry.innerHTML = `${getSelectedCountry.value}` + " statistics"
  getSelectedCountry.value = ""
}

function createGlobalStats(globalResult) {
  const globalDate = globalResult.Date
  const globalNewConfirmed = globalResult.NewConfirmed
  const globalTotalConfirmed = globalResult.TotalConfirmed
  const globalNewDeaths = globalResult.NewDeaths
  const globalTotalDeaths = globalResult.TotalDeaths
  const globalNewRecovered = globalResult.NewRecovered
  const globalTotalRecovered = globalResult.TotalRecovered
  let pGlobalDate = document.querySelector("#pGlobalDate span")
  let pGlobalNewConfirmed = document.querySelector("#pGlobalNewConfirmed span")
  let pGlobalTotalConfirmed = document.querySelector("#pGlobalTotalConfirmed span")
  let pGlobalNewDeaths = document.querySelector("#pGlobalNewDeaths span")
  let pGlobalTotalDeaths = document.querySelector("#pGlobalTotalDeaths span")
  let pGlobalNewRecovered = document.querySelector("#pGlobalNewRecovered span")
  let pGlobalTotalRecovered = document.querySelector("#pGlobalTotalRecovered span")
  pGlobalDate.innerHTML = globalDate.slice(0, 10)
  pGlobalNewConfirmed.innerHTML = globalNewConfirmed.format()
  pGlobalTotalConfirmed.innerHTML = globalTotalConfirmed.format()
  pGlobalNewDeaths.innerHTML = globalNewDeaths.format()
  pGlobalTotalDeaths.innerHTML = globalTotalDeaths.format()
  pGlobalNewRecovered.innerHTML = globalNewRecovered.format()
  pGlobalTotalRecovered.innerHTML = globalTotalRecovered.format()
}

Number.prototype.format = function () {
  return this.toString().split( /(?=(?:\d{3})+(?:\.|$))/g ).join( "." );
};