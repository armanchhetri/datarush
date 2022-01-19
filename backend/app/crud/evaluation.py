from fastapi import HTTPException
from typing import Tuple
from cachetools import cached, TTLCache
from app.core.config import settings

cache = TTLCache(maxsize=50, ttl=86400)

import pandas as pd
from sklearn.metrics import f1_score

def validate_dataset(df_sol, df_sub):
    if df_sub.isnull().values.any():
        raise HTTPException(
            status_code=400, detail="Null value found")

    if (df_sub.columns.tolist() != df_sol.columns.to_list()):
        raise HTTPException(
            status_code=400, detail="Columns mismatch")
        
    if (df_sol.shape != df_sub.shape):
        raise HTTPException(
            status_code=400, detail="Improper solution length")
        
    try:
        if sum(df_sol["id"].to_numpy() == df_sub["id"].to_numpy()) != df_sol.shape[0]:
            raise HTTPException(status_code=400, detail="Id mismatch")
    except:
        raise HTTPException(status_code=400, detail="Submission format does not match with sample please verify")

@cached(cache)
def calculate_score(file_path: str) -> Tuple[float, float]:
    df_sub = pd.read_csv(file_path)
    if "id" not in df_sub.columns:
        raise HTTPException(status_code=400, detail="Submission file does not contain id column")
    df_sub = df_sub.sort_values(by=["id"])

    df_sol = pd.read_csv(settings.SOLUTION_PATH)
    df_sol = df_sol.sort_values(by=["id"])

    validate_dataset(df_sol, df_sub)

    true = df_sol['category_num']
    pred = df_sub['category_num']
    private_score = f1_score(true, pred, average='macro')
    index = int(0.8 * len(true))
    pub_true = df_sol['category_num'][:index]
    pub_pred = df_sub['category_num'][:index]
    pub_score = f1_score(pub_true, pub_pred, average='macro')
    return pub_score, private_score
