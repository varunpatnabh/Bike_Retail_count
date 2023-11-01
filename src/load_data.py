import os
import sys
import pandas as pd
from configuration import train_path


def load_data(train_path):
    '''
    This function will load the training data from train_path in configuration script
    params: csv path
    return: dataframe
    '''
    df = pd.read_csv(train_path)
    return df