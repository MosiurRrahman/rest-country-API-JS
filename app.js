// toggles
// API CALL
// Theme toggle
// search
// Filter 
// Modal 

const countriesElement = document.getElementById('countries')
const toggleBtn = document.getElementById('toggle');
const filterBtn = document.getElementById('filter');
const searchElement = document.getElementById('search');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('closeBtn');
const regionFilter = filterBtn.querySelectorAll("li");


getCountries();

 async function getCountries() {
     const res = await fetch("https://restcountries.eu/rest/v2/all");
     const countries = await res.json();
     displayCountries(countries)
 }


 function displayCountries(countries) {
    countriesElement.innerHTML = ''
    countries.forEach(country =>{
     const countryElement = document.createElement("div")
    countryElement.classList.add("card");

    countryElement.innerHTML = `
        <div>
        <img src="${country.flag}" alt="" />
        </div>

        <div class="card-body">
            <h2 class = "country-name">${country.name}</h2>
            <p>
                <strong>Population:</strong> ${country.population}
            </p>
            <p class = "country-region">
                <strong>Region:</strong> ${country.region}
            </p>
            <p>
                <strong>Capital:</strong> ${country.capital}
            <p>
            <p>
                <strong>Subregion:</strong>  ${country.subregion}
            </p>
        </div>
    `  
    countryElement.addEventListener('click',()=>{
        modal.style.display = "flex";
        showCountryDetails(country);

    })
    countriesElement.appendChild(countryElement)
});

}

// showCountryDetails
function showCountryDetails (country){
    const modalBody = modal.querySelector('.modal-body');
    const modalImg = modal.querySelector('img');
    modalImg.src = country.flag;
    modalBody.innerHTML = `
            <h2 class="country-name">${country.name}</h2>
            <p><strong>Population:</strong> ${country.population}</p>
            <p class="country-region">
            <strong>Region:</strong> ${country.region}
            </p>
            <p><strong>Capital:</strong> ${country.capital}</p>

            <p></p>
            <p><strong>Subregion:</strong> ${country.subregion}</p>
    `
}

// toggle button event
toggleBtn.addEventListener('click', ()=>{
    document.body.classList.toggle("dark")
})
// dropdown filter event(show and hide filter li tags)
filterBtn.addEventListener('click', ()=>{
   filterBtn.classList.toggle("open")
})
// close the modal
closeBtn.addEventListener('click',()=>{
    modal.style.display = "none"
})

// search evnet
searchElement.addEventListener('input', (e)=>{
    const {value} = e.target;
    const countryName = document.querySelectorAll(".country-name");

    countryName.forEach(name =>{
        console.log(name.innerText);
        if(name.innerText.toLowerCase().includes(value.toLowerCase())){
            name.parentElement.parentElement.style.display = "block"
        }else{
            name.parentElement.parentElement.style.display = "none"
        }
    })
    
})

// add a filter on the li's inside the .dropdown
regionFilter.forEach(filter => {
	filter.addEventListener('click', () => {
		const value = filter.innerText;

		const countryRegion = document.querySelectorAll('.country-region');

		countryRegion.forEach(region => {
			if (region.innerText.includes(value) || value === 'All') {
				// .card -> .card-body -> .country-region
				region.parentElement.parentElement.style.display = 'block';
			} else {
				region.parentElement.parentElement.style.display = 'none';
			}
		});
	});
});