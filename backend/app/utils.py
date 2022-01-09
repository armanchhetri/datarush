import random
import string
from datetime import date
from fastapi import UploadFile
from starlette.datastructures import UploadFile as StarletteUploadFile

from sqlalchemy.orm import Session
from app.core.time import today, now 

def secure_filename(filename:str) ->str:
    horror_list = ['\\', '/', ':', '*', '?', '"', '<', '>', '|']
    # Replace all the horror_list characters with an underscore
    for i in horror_list:
        filename = filename.replace(i, '_')
    K = 10 # Length of the random string
    return "".join(random.choices(string.ascii_uppercase, k = K))  + filename


def save_file(file: UploadFile, upload_folder: str, func = secure_filename) -> str:
    filename = func(file.filename)
    filelocation = upload_folder + filename
    with open(filelocation, "wb") as f:
        f.write(file.file.read())
    return filelocation

def save_db(db:Session, object):
    try:
        db.add(object)
        db.commit()
        db.refresh(object)
    except Exception as E:
        print("[Exception here]", E)

    return object
    



class MyUploadFile(UploadFile):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if isinstance(v, str):
            return v 
        if not isinstance(v, StarletteUploadFile):
            raise ValueError(f"Expected UploadFile, received: {type(v)}")
        return v
