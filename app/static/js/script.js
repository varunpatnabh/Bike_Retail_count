function predictSurgePricing() {
    event.preventDefault(); // Prevent the default form submission behavior



    // Retrieve input values
    const instant = document.getElementById('instant').value;
    const dteday = Date(document.getElementById('dteday').value);
    const season = parseInt(document.getElementById('season').value);
    const yr = parseInt(document.getElementById('yr').value);
    const mnth = parseInt(document.getElementById('mnth').value);
    const holiday = parseInt(document.getElementById('holiday').value);
    const weekday = parseInt(document.getElementById('weekday').value);
    const workingday = parseInt(document.getElementById('workingday').value);
    const weathersit = parseInt(document.getElementById('weathersit').value);

    const temp = (parseFloat(document.getElementById('Temperature').value) - (-8)) / (39 - (-8));
    const atemp = (parseFloat(document.getElementById('Temperature').value) - (-16)) / (50 - (-16));
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
    if (instant === '' || isNaN(dteday) || isNaN(atemp) || isNaN(atemp) || isNaN(hum) || windspeed === '') {
        alert('Please fill out all fields before submitting.');
        return;
    }

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
}


function handlePrediction(prediction) {
    // Update the UI with the predicted value
    document.getElementById('predictedValue').textContent = 'Predicted Surge Pricing Type: ' + prediction;
    document.getElementById('predictionResult').classList.remove('hidden');
}


function resetForm() {
    document.getElementById('predictionForm').reset();
    document.getElementById('predictionResult').classList.add('hidden');
}
