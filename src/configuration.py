train_path = "data/day.csv"

model_path = "models"
target_column =  'cnt'

predictor_column = ['season', 'yr', 'mnth', 'holiday', 'weekday',
       'workingday', 'weathersit', 'temp', 'atemp', 'hum', 'windspeed',
       'casual', 'registered']

unwanted_columns = ['instant','dteday']