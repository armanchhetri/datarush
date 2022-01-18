from typing import Tuple
from cachetools import cached, TTLCache
from app.core.config import settings

cache = TTLCache(maxsize=50, ttl=86400)

import pandas as pd
from sklearn.metrics import f1_score

@cached(cache)
def calculate_score(file_path: str) -> Tuple[float, float]:
    df = pd.read_csv(file_path, index_col='id')
    sol_df = pd.read_csv(settings.SOLUTION_PATH, index_col='id')
    true = sol_df['category_num']
    pred = df['category_num']
    private_score = f1_score(true, pred, average='macro')
    index = int(0.9 * len(true))
    pub_true = sol_df['category_num'][:index]
    pub_pred = df['category_num'][:index]
    pub_score = f1_score(pub_true, pub_pred, average='macro')
    return pub_score, private_score
