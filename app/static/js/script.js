function predictSurgePricing() {
    
    // e.preventDefault(); // Prevent the default form submission behavior
        
    // Retrieve input values
    const instant = (document.getElementById('instant').value);
    // console.log(instant,1);
    const dteday = new Date(document.getElementById('dteday').value);
    //const dteday = Date(document.getElementById('dteday').value);
    const season = parseInt(document.getElementById('season').value);
    const yr = parseInt(document.getElementById('yr').value);
    const mnth = parseInt(document.getElementById('mnth').value);
    const holiday = parseInt(document.getElementById('holiday').value);
    const weekday = parseInt(document.getElementById('weekday').value);
    const workingday = parseInt(document.getElementById('workingday').value);
    const weathersit = parseInt(document.getElementById('weathersit').value);

    const temp = (parseFloat(document.getElementById('temp').value) - (-8)) / (39 - (-8));
    const atemp = (parseFloat(document.getElementById('atemp').value) - (-16)) / (50 - (-16));
    const hum = parseFloat(document.getElementById('hum').value /= 100);
    const windspeed = parseFloat(document.getElementById('windspeed').value /= 67);

    //    #Index(['instant', 'dteday', 'season', 'yr', 'mnth', 'holiday', 'weekday','workingday', 'weathersit',
    // 'temp', 'atemp', 'hum', 'windspeed',
   

    var inputData = {'instant' : instant, 
                        'dteday' : dteday, 
                        'season' : season, 
                        'yr' : yr,
                        'mnth' : mnth, 
                        'holiday' : holiday, 
                        'weekday' : weekday,
                        'workingday' :workingday, 
                        'weathersit' :weathersit, 
                        'temp' : temp, 
                        'atemp' : atemp, 
                        'hum' : hum,
                        'windspeed' : windspeed
                    }


    console.log("Passed data for prediction are : ",inputData);

    // Check if any field is empty
    if (isNaN(instant) || isNaN(dteday) || isNaN(temp) || isNaN(atemp) || isNaN(hum) || isNaN(windspeed)) {
        alert('Please fill out all fields with valid numeric values before submitting.');
        return;
    }

    //if (instant === '' || isNaN(dteday) || temp ==='' || atemp === '' || hum === '' || windspeed === '') {
        //alert('Please fill out all fields before submitting.');
        //return;
    //}

    // Send a POST request to your Flask API
    fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputData)
    })
    .then(response => response.json())
    .then(data => handlePrediction(data.prediction));
    console.log("Passed data for prediction are : ",inputData);
}
 
function handlePrediction(prediction) {
    // Update the UI with the predicted value
    document.getElementById('predictedValue').textContent = 'Rental bike count : ' + prediction;
    document.getElementById('predictionResult').classList.remove('hidden');
}



function resetForm() {
    document.getElementById('predictionForm').reset();
    document.getElementById('predictionResult').classList.add('hidden');
}
