import os
import sys
import pandas as pd
from configuration import unwanted_columns


def drop_col(df):
    '''
    This function will be droping the column that we dont need for any purpose
    params: Full Dataframe with all columns
    return: Dataframe with important columns only 
    '''
    if 'casual' in df.columns and 'registered' in df.columns:
        df = df.drop(['casual', 'registered','instant','dteday'], axis=1)
    else:
        df = df.drop(['instant','dteday'], axis=1)
    return df


def data_clean(df):
    '''
    this whole function for cleaning the dataframe,
    params: Dataframe
    return: Dataframe
    '''
    df = drop_col(df)
    print("data_clean",df)
    return df
