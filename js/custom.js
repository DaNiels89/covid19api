let covidData = {};

window.addEventListener("load", async () => {
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
    console.error(error)
  }
}

/**
 * creates a dropdown off al the exsisting countries
 * @param {*} countries all the countries from the COVID19 API 
 * @returns null
 */
function createSelectCountry(countries){
  const selectCountry = document.getElementById("selectCountry");
  countries.forEach(function(value, index) {
    let countryName = value.Country
    let option = document.createElement("option")
    option.setAttribute("value", countryName)
    selectCountry.appendChild(option)
  })
}

//https://api.covid19api.com/total/dayone/country/
function submitCountry(e){
  e.preventDefault()
  let getSelectedCountry = document.getElementById("getSelectedCountry")

  //Get value from search country input field and gives a capital letter to first word if you search for a country
  const selectedCountry = covidData.Countries.find(c => c.Country === getSelectedCountry.value.charAt(0).toUpperCase() + getSelectedCountry.value.slice(1));
  // console.log(selectedCountry)

  if (selectedCountry === undefined) {
    alert("Country isn't filled in, country is missing a capital letter and or country doesn't excist")
    return
  }

  let pCountryDate = document.querySelector("#pCountryDate span")
  let pCountryNewConfirmed = document.querySelector("#pCountryNewConfirmed span")
  let pCountryTotalConfirmed = document.querySelector("#pCountryTotalConfirmed span")
  let pCountryNewDeaths = document.querySelector("#pCountryNewDeaths span")
  let pCountryTotalDeaths = document.querySelector("#pCountryTotalDeaths span")
  let pCountryNewRecovered = document.querySelector("#pCountryNewRecovered span")
  let pCountryTotalRecovered = document.querySelector("#pCountryTotalRecovered span")

  pCountryDate.innerHTML = selectedCountry.Date.slice(0, 10)
  pCountryNewConfirmed.innerHTML = selectedCountry.NewConfirmed.format()
  pCountryTotalConfirmed.innerHTML = selectedCountry.TotalConfirmed.format()
  pCountryNewDeaths.innerHTML = selectedCountry.NewDeaths.format()
  pCountryTotalDeaths.innerHTML = selectedCountry.TotalDeaths.format()
  pCountryNewRecovered.innerHTML = selectedCountry.NewRecovered.format()
  pCountryTotalRecovered.innerHTML = selectedCountry.TotalRecovered.format()

  let displayCountry = document.getElementById("displayCountry")
  displayCountry.innerHTML = `${getSelectedCountry.value.charAt(0).toUpperCase() + getSelectedCountry.value.slice(1)}` + " statistics"
  getSelectedCountry.value = ""
}

function createGlobalStats(globalResult) {
  const pGlobalDate = document.querySelector("#pGlobalDate span")
  const pGlobalNewConfirmed = document.querySelector("#pGlobalNewConfirmed span")
  const pGlobalTotalConfirmed = document.querySelector("#pGlobalTotalConfirmed span")
  const pGlobalNewDeaths = document.querySelector("#pGlobalNewDeaths span")
  const pGlobalTotalDeaths = document.querySelector("#pGlobalTotalDeaths span")
  const pGlobalNewRecovered = document.querySelector("#pGlobalNewRecovered span")
  const pGlobalTotalRecovered = document.querySelector("#pGlobalTotalRecovered span")

  let globalDate = globalResult.Date
  let globalNewConfirmed = globalResult.NewConfirmed
  let globalTotalConfirmed = globalResult.TotalConfirmed
  let globalNewDeaths = globalResult.NewDeaths
  let globalTotalDeaths = globalResult.TotalDeaths
  let globalNewRecovered = globalResult.NewRecovered
  let globalTotalRecovered = globalResult.TotalRecovered

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