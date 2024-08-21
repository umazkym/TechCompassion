# API一覧

from fastapi import FastAPI, Request
from db_control import crud
from db_control.dbmodels import MenteeMaster, UserData, Mentoring, MentorMaster, Feedback
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['GET', 'PUT'],
    allow_headers=['*'],
)
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
def get_mentoring_list(mentor_id: int):
    models = [MenteeMaster, UserData, Mentoring]
    result = crud.get_mentoring_data(models, mentor_id)
    return result

# 1on1開始のAPI
@app.get("/mentoring/{mentoring_id}")
def get_mentoring_info(mentoring_id: int):
    models = [MenteeMaster, UserData, Mentoring]
    result = crud.get_mentoring_details(models, mentoring_id)
    return result

# 1on1履歴保存のAPI
@app.put("/mentoring/{mentoring_id}")
async def save_mentoring_datas(mentoring_id: int, request: Request):
    datas = await request.json()
    # datas = {
    #     "mtg_content": "11111",
    #     "mtg_memo": "1111",
    # }
    models = [Mentoring, MenteeMaster]
    result = crud.update_data(models, datas)
    return result

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
