# API一覧

from fastapi import FastAPI
from db_control import crud
from db_control.dbmodels import MenteeMaster, UserData, Mentoring, MentorMaster, Feedback
# from fastapi.middleware.cors import CORSMiddleware
# from typing import Optional, List, Dict, Any
# import datetime
# from pydantic import BaseModel

app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
# Qiita  https://qiita.com/satto_sann/items/0e1f5dbbe62efc612a78
# fastapi  https://fastapi.tiangolo.com/ja/tutorial/cors/


@app.get('/')
def read_root():
    return {'message': 'Hello World'}

# Home画面メンティーリスト用
@app.get("/mentor/{mentor_id}/home")
def get_mentee_list(mentor_id: int):
    models = [MenteeMaster, UserData]
    result = crud.get_mentee_data(models, mentor_id)
    return result

# メンタリングスケジュールリスト用
@app.get("/mentor/{mentor_id}/mentoring_schedule")
def get_mentor_skill_data(mentor_id: int):
    models = [MenteeMaster, UserData, Mentoring]
    result = crud.get_mentoring_data(models, mentor_id)
    return result

# 1on1開始のAPI
    # @app.get("/mentoring/{mentoring_id}/mentee/{mentee_id}")
    # def read_mentoring_info(mentoring_id: int,):
    #     model = 
    #     result =
    #     return

# 1on1履歴保存のAPI
    # @app.put("/mentoring/{mentoring_id}")
    # def save_mentoring_data(mentoring_id: int,):
    #     values = text
    #     model =
    #     result = {}
    #     return result

# メンタースキルマップ
@app.get("/mentor/{mentor_id}/skillmap/{FB_flg}")
def get_mentor_skill(mentor_id: int, FB_flg: bool):
    models = [MenteeMaster, MentorMaster, UserData,  UserData, Mentoring, Feedback]
    result = crud.get_feedback_data(models, mentor_id, FB_flg)
    return result

# 1on1履歴閲覧用API
    # @app.get("/mentor/{mentor_id}/hostory")
    # def read_mentoring_history(mentor_id: int,):
    #         model = 
    #     result = a
    #     return result
