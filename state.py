# so now we are creating graph
# and the first thing you will create is a state

import os 

# 1) tyed Dict

from typing import TypedDict

class State(TypedDict):

    topic: str
    summary: str
    score: int

# 2) Pydantic approach
# it is good at data validation and type checking at run time

from pydantic import BaseModel, field_validator

class State(BaseModel):

    topic : str
    summary : str
    score : int

    @field_validator
    def score_positive(cls,v):
        if v < 0 :
            raise ValueError("score must be positive")