# API一覧

from fastapi import FastAPI, Request
from db_control import crud, GPT
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


# Home画面メンティーリスト取得API
@app.get("/mentor/{mentor_id}/home")
def get_mentee_list(mentor_id: int):
    models = [MenteeMaster, UserData]
    result = crud.get_mentee_data(models, mentor_id)
    return result


# メンタリングスケジュールリスト取得API
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


# 1on1履歴保存API
@app.put("/mentoring/{mentoring_id}")

# mtg_contentとmtg_memoの保存
async def save_mentoring_data(mentoring_id: int, request: Request):
    data = await request.json()
    # data = {
    #     "mtg_content": "11111",
    #     "mtg_memo": "1111",
    # }
    models = Mentoring
    result = crud.update_data(models, mentoring_id, data)
    return result

# 話者分離 → 要約
async def process_after_meeting(mentoring_id: int, request: Request):
    data = await request.json()
    mtg_content = data['mtg_content']
    mtg_speaker_separation = await GPT.some_speaker_separation(mtg_content)
    mtg_content_summary = GPT.summary(mtg_speaker_separation)
    advise_to_mentor_for_mtg = GPT.advice(mtg_speaker_separation)
    data = {
        "mtg_content_speaker_identification": mtg_speaker_separation,
        "mtg_content_summary": mtg_content_summary,
        "advise_to_mentor_for_mtg": advise_to_mentor_for_mtg,
    }
    models = Mentoring
    result = crud.update_data(models, mentoring_id, data)
    return result


# メンタースキルマップ取得API
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


# テスト
@app.get("/test/{mentoring_id}")
# 話者分離 → 要約
def process_after_meeting(mentoring_id: int, request: Request):
    mtg_content = 'おい 山田 ちょっと遅れてるぞ 時間の管理くらいできるような 君前にもこういうことあっただろうどうなってんだ 申し訳ありません 今日は少し戸惑ってしまって 最近仕事のことで悩んでいて集中できないんです。 また悩み 君がそんなこと言うとは思わなかったな 悩む前にやることが山積みだろう とりあえずそのマイミットやらを聞かせてやるからさっさと 具体的には何がそんなに難しいんだ言ってみろ はい最近のプロジェクトでAという作業がどうしても済まなく 自分のスキルに自信が落ちなくなってしまって また自信の話か君の自信の問題なんか どうでもいいんだよ プロジェクトが進まないのは事実でそれに対処するのは決めの仕事だろうが 俺は結果が全てだと言ってきただろう そうですね でもエアの部分でつまずいて 何度やっても解決できなくて どうすればいいのか分からなくなってしまっ なんでやってもできない お前それでは決まれ 諦めるつもりか考えろ はそのためにここにいるんだろうか できないならできるように工夫しろもしくは元努力しろ 前が止まったら全体が止まるんだよ そんなことも理解できないのか。 はい、でもどうしても一人では解決できなくて 一人でできない思いを子供か 何に頼る前に自分の解決 することをまず考えろ 俺に報告する前に自分でできる限りのことをやったのか どうせ途中で諦めたんだろう そんなつもりは ただどうしても住まなくて 住まない名前のせいだ。結果が出ないのがその原因はすべてと思わない それを理解してんのか 理解しています そのどうしても時間を変えなくて 時間が足りない ふざけるな。 がお前何を優先してるんだ なことに時間を費やしてるんじゃないのか いいか今から俺の良いことを聞け お前の問題は努力が足りないことだもっと仕事に従事しろ 家が難しい たら簡単にするためどうせお前か考えろ 例えばその部分を細く分割して小さな立つ ストして一つ一つ片付けるんだ。 だがそれをやるときは全然具体で半端なことをするんだ。 分かりました タスクを細かく分けて全力で取り組んでみます。 働きちゃ駄目だ、やるんだよ今すぐに。それでも駄目だな して駄目だったのか報告しろ。ただし、報告するときは回避策を一緒に持ってこい。 に言い訳するときはもう許さないからな 解決策も考えます。 それとポジショス全体の進捗も管理しろ君が担当する部分だけじゃない 全体を見て行動しろ お前が一つでもミスを犯したら全員が迷惑するんだその責任を理解してるんだろうな はい理解しています責任を持ってもっと頑張ります 頭にもらえたそれがお前の仕事だ もう一度言えば結果が全てた。俺はお前に結果を求めて いない無駄なことに時間を使わなさっさとやれ 次回も何進捗がないならお前は終わりだと思え が次に確認するまでに何も変わってなかったらお前は何も学んでないということだ 時はボンドから飼ってるな はい 分かりました 次までに結果を出します じゃあ早々と仕事の元でお前ら内容するか全部見てるからな。 旦那時間を過ごすな今すぐ行動しろ'
    mtg_speaker_separation = GPT.some_speaker_separation(mtg_content)
    mtg_content_summary = GPT.summary(mtg_speaker_separation)
    advise_to_mentor_for_mtg = GPT.advice(mtg_speaker_separation)
    data = {
        "mtg_content_speaker_identification": mtg_speaker_separation,
        "mtg_content_summary": mtg_content_summary,
        "advise_to_mentor_for_mtg": advise_to_mentor_for_mtg,
    }

    return data