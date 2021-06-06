

const apiUrl = 'https://restcountries.eu/rest/v2/all';

    async function getData() 
    {
        const response = await fetch(apiUrl);
        const data = await response.json();
    
        console.log(data);

        if(data.length > 0) 
        {
            var temp = "";

            for(let i = 0; i < data.length; i++) {

                temp += `<input id='${data[i].name}' type='checkbox' value='${data[i].population}' />`;
                temp += "<tr>";
                temp += "<td>" + data[i].name + "</td>" + "</tr>";
            }

            document.getElementById("data").innerHTML = temp;

        }

    }
    getData();
    
    let btnCompare = document.getElementById("compare");
    let max = document.getElementById("max");
    let min = document.getElementById("min");
    let diff = document.getElementById("diff");
    
    btnCompare.addEventListener('click', () => {

        var checkbox = document.querySelectorAll('input[type="checkbox"]:checked');

        var arrayCountries = [];

        checkbox.forEach((e) => {

            let countryName = e.id;
            let countryValue = Number(e.value);

            let obj = {
                'name': countryName,
                'value': countryValue
            }

            arrayCountries.push(obj);

        });


        var maxValue = arrayCountries[0].value;
        
        for(let i = 0; i < arrayCountries.length; i++) 
        {
            if(arrayCountries[i].value > maxValue) maxValue = arrayCountries[i].value;
        };


        var minValue = arrayCountries[0].value;

        for(let i = 0; i < arrayCountries.length; i++) 
        {
            if(arrayCountries[i].value < minValue) minValue = arrayCountries[i].value;
        };
       

        let difference = maxValue - minValue;


        let maxValueFormat = numbro(maxValue).format({thousandSeparated: true});
        let minValueFormat = numbro(minValue).format({thousandSeparated: true});
        let differenceFormat = numbro(difference).format({thousandSeparated: true});
        
    
        max.innerText = `Most populared country is: [Country name] with ${maxValueFormat} inhabitants`;
        min.innerText = `Most least populared country is: [Country name] with ${minValueFormat} inhabitants`;
        diff.innerText = `Difference of population is: ${differenceFormat} inhabitants`;


        // chart
        const ctx = document.getElementById('chart').getContext('2d');
        const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue'],
            datasets: [{
                label: 'Country',
                data: [maxValue,minValue],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
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

    

    // Search bar
    const searchBar = document.getElementById("searchBar");
    const data = document.getElementById("data");
     
    // Search country.json
    const searchCountries = async searchText => {
        const res = await fetch(apiUrl);
        const countries = await res.json();

        // Get matches to current text input
        let matches = countries.filter(state => {
            const regex = new RegExp(`^${searchText}`, 'gi');
            console.log(regex);
            return state.name.match(regex);
        });

        outputHtml(matches);
    };

    // Show result 
    const outputHtml = matches => 
    {
        if(matches.length > 0) 
        {
            const html = matches.map(match => 
                `<div>
                    <h4>${match.name}</h4>
                </div>`    
            ).join('');

            data.innerHTML = html;
        }
    }

    searchBar.addEventListener('input', () => searchCountries(searchBar.value));

