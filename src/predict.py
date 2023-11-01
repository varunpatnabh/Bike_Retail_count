import json
import pickle
import joblib
import pandas as pd
import warnings
warnings.filterwarnings("ignore", category=DeprecationWarning) 
from data_cleaning import data_clean
from configuration import predictor_column

  
def preprocess_and_predict(df):
    '''
      This function takes in new dataframe or row of observation and generate all features
    Input :
        df : DataFrame or row of observation
        encoded_dict : Dictonary created while training for Categorical Encoded Value.
    '''
    data_clean(df)
    print(" preprocess and predict:",df.info)
    X = df[predictor_column]
    return X

if __name__ == "__main__":
    df = pd.read_csv("data/day.csv")
    saved_model= joblib.load("models/XgBoost.joblib")
    data = preprocess_and_predict(df)
   
    print(int(saved_model.predict(data.iloc[0:1,:])))