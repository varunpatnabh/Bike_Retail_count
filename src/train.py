import os
import sys
import json
import numpy as np
import pandas as pd
import json
import joblib
from sklearn import metrics
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.metrics import f1_score
from sklearn.preprocessing import LabelEncoder
from load_data import load_data
from data_cleaning import data_clean
from preprocessing import final_preprocessing
from model import model_list
from configuration import model_path,train_path,predictor_column,target_column


def save_model(model,file_name):
    joblib.dump(model,file_name)


def prepare_training(df,target_column):
    X = df.drop(target_column,axis=1)
    y = df[target_column]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=42)
    return X_train, X_test, y_train, y_test


def model_training(df,target_column,model_list,model_path):
    X_train, X_test, y_train, y_test = prepare_training(df,target_column)
    for model_name, model in model_list:
        print("Model Name : ", model_name)
        model = model
        model.fit(X_train,y_train)
        
        print("Train r2 score : ", metrics.r2_score(y_train,model.predict(X_train)),
                "Test r2 score: ", metrics.r2_score(y_test,model.predict(X_test)))
        save_model(model,os.path.join(model_path, model_name+".joblib"))



if  __name__ == "__main__":

    # reading configuration from config file.
    '''
    with open ("config.json",'r') as file:
        config = json.load(file)
    train = config["train_path"]
    model_path = config["model_path"]
    target_column = config["target_column"]
    '''
    # Reading Train data
    df = load_data(train_path)
    df = data_clean(df)
    df = final_preprocessing(df)
    # data cleaning done
    
    model_training(df,target_column,model_list,model_path)
    print("model train done")