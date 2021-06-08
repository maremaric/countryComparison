
const apiUrl = 'https://restcountries.eu/rest/v2/all';

    async function getData() 
    {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        console.log(data);

        if(data.length > 0) 
        {
            
            for(let i = 0; i < data.length; i++) {
                let temp = document.createElement('div');
                temp.innerHTML = "<div id=" + data[i].name + " class='js-country-element'><input id=" + data[i].name + " type='checkbox' value=" + data[i].population + "><p>" + data[i].name + "</p></div>";
                // temp += `<input id='${data[i].name}' type='checkbox' value='${data[i].population}' />`;
                // temp += "<tr>";
                // temp += "<td>" + data[i].name + "</td>" + "</tr>";
                document.getElementById("data").appendChild(temp);
            }
        }
    }
        
    function getAllCheckedCountries() {
        var checkbox = document.querySelectorAll('input[type="checkbox"]:checked');

            var arrayCountries = [];

            checkbox.forEach((e) => {

                let countryName = e.id;
                let countryValue = Number(e.value);
                console.log('El val: ', e.value);

                let obj = {
                    'name': countryName,
                    'value': countryValue
                }

                arrayCountries.push(obj);

            });
            console.log('Checked arr countries: ', arrayCountries);
            
            return arrayCountries;
    }
    
    getData();
    
    let btnCompare = document.getElementById("compare");
    let max = document.getElementById("max");
    let min = document.getElementById("min");
    let diff = document.getElementById("diff");
    
    btnCompare.addEventListener('click', () => {

        arrayCountries = getAllCheckedCountries();


        let maxValue = {
            'name': arrayCountries[0].name,
            'value': arrayCountries[0].value
        }
        
        
        for(let i = 0; i < arrayCountries.length; i++) 
        {
            if(arrayCountries[i].value > maxValue.value) maxValue = arrayCountries[i];
        };


        let minValue = {
            'name': arrayCountries[0].name,
            'value': arrayCountries[0].value
        }

        for(let i = 0; i < arrayCountries.length; i++) 
        {
            if(arrayCountries[i].value < minValue.value) minValue = arrayCountries[i];
        };
       

        let difference = maxValue.value - minValue.value;


        let maxValueFormat = numbro(maxValue.value).format({thousandSeparated: true});
        let minValueFormat = numbro(minValue.value).format({thousandSeparated: true});
        let differenceFormat = numbro(difference).format({thousandSeparated: true});
        
    
        max.innerText = `Most populared country is: ${maxValue.name} with ${maxValueFormat} inhabitants`;
        min.innerText = `Most least populared country is: ${minValue.name} with ${minValueFormat} inhabitants`;
        diff.innerText = `Difference of population is: ${differenceFormat} inhabitants`;

        function getAllCountriesPropertiesInSeperatedArrs(allCheckedCountries) {
            let objToRet = {countryNames: [], countryValues: []};
            allCheckedCountries.forEach(country => {
                objToRet.countryNames.push(country.name);
                objToRet.countryValues.push(country.value);
            });
            console.log(objToRet)
            return objToRet;
        }
        // chart
        const ctx = document.getElementById('chart').getContext('2d');
        let allCheckedCountries = getAllCheckedCountries();
        let seperatedArrs = getAllCountriesPropertiesInSeperatedArrs(allCheckedCountries);
        const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: seperatedArrs.countryNames,
            datasets: [{
                label: 'Country',
                data: seperatedArrs.countryValues,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
        });



    });

    

    // // Search bar
    const searchBar = document.getElementById("searchBar");
  
    const searchCountries = async searchText => {
        const countryElements = document.querySelectorAll('.js-country-element');
        // console.log('Country elements: ', countryElements);
        countryElements.forEach(country => {
            console.log('Country id: ', country.id)
            console.log('Country style: ', !(country.id.toLowerCase().includes(searchText.toLowerCase())));
            if ((country.id.toLowerCase().includes(searchText.toLowerCase()))) {
                country.style.display = 'block';
            } else {
                country.style.display = 'none';
            }
        })
    };
    searchBar.addEventListener('input', () => searchCountries(searchBar.value));

