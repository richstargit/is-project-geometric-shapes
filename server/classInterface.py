from pydantic import BaseModel

class interfacePreditCNN(BaseModel):
    image: str

class interfacePreditKNN(BaseModel):
    image: str
class interfacePreditLR(BaseModel):
    image: str

