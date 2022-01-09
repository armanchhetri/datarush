from typing import Tuple
from cachetools import cached, TTLCache
from app.core.config import settings

cache = TTLCache(maxsize=50, ttl=86400)

import pandas as pd

@cached(cache)
def calculate_score(file_path: str) -> Tuple[float, float]:
    df = pd.read_csv(file_path, index_col='id')
    sol_df = pd.read_csv(settings.SOLUTION_PATH, index_col='id')
    true = sol_df['label']
    pred = df['label']
    private_score = (true == pred).sum() / len(true)
    index = int(0.9 * len(true))
    pub_true = sol_df['label'][:index]
    pub_pred = df['label'][:index]
    pub_score = (pub_true == pub_pred).sum() / len(pub_true)
    return pub_score, private_score
