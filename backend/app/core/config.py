from typing import List
from pydantic import BaseSettings


class Settings(BaseSettings):
    ACCESS_TOKEN_EXPIRE_MINUTES :int = 24 * 20 * 60
    SECRET_KEY :str = "secret"
    ALGORITHM :str= "HS256"
    FIRST_SUPERUSER :str= "admin@email.com"
    FIRST_SUPERUSER_PASSWORD :str = "admin"
    SOLUTION_PATH:str 
    SUBMISSION_DIR: str 
    DATA_INSIGHTS_DIR: str
    MAX_SUBMISSIONS: int
    ROOT_URL :str
    ROOT_PATH: str
    DATABASE_USERNAME :str = "postgres"
    DATABASE_PASSWORD :str = "postgres"
    DATABASE_HOSTNAME :str = "localhost"
    DATABASE_PORT :str = "5432"
    DATABASE_NAME :str = "ailocus"

    DESCRIPTION :str ='''
    This is an api for Locus AI frontend.🚀
    The endpoints and their respective documentation are available below.
    So far, the api is only for the purpose of the competition.
    '''
    DEBUG : bool

    CORS_ORIGINS: List[str] = ["*"]

    class Config:
        env_file = ".env"


settings = Settings()

if __name__ =="__main__":
    print(settings)