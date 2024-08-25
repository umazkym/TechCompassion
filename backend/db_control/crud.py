# main.pyで使用する関数

import pandas as pd
from datetime import datetime
import json
import sqlalchemy
from sqlalchemy import create_engine, select, insert, update
from sqlalchemy.orm import sessionmaker
from db_control.connect import engine
from db_control.dbmodels import MenteeMaster, UserData, Mentoring, MentorMaster, Feedback


# Home画面メンティーリスト用
def get_mentee_data(models, mentor_id):
    Session = sessionmaker(bind=engine)
    session = Session()

    # 使用するテーブルの結合とフィルタリング
    query = select(* models)
    query = query.select_from(MenteeMaster).join(UserData, isouter=True)
    query = query.filter(MenteeMaster.mentor_id == mentor_id)

    try:
        with session.begin():  # トランザクションを開始
            df = pd.read_sql_query(query, con=engine).reset_index()
            today = datetime.today()

            # 年齢データの作成
            df['age'] = None
            for i in range(len(df)):
                df.loc[i, 'age'] = (int(today.strftime('%Y%m%d')) -int(df.loc[i, 'birth_date'].strftime('%Y%m%d'))) //10000

            # 入社年数データの作成
            df['working_years'] = None
            for i in range(len(df)):
                df.loc[i, 'working_years'] = (int(today.strftime('%Y%m%d')) -int(df.loc[i, 'join_date'].strftime('%Y%m%d'))) //10000 + 1

            # データの抽出
            df = df[['id', 'name', 'age', 'gender', 'working_years']]
            result_json = df.to_json(orient='records', force_ascii=False)  # orient='records'で、各行が個別のJSONオブジェクトとしてリストに格納されるように指定。force_ascii=Falseで、非ASCII文字（日本語など）をそのまま使用。
            result_json = json.loads(result_json)  # json形式にパース

    except sqlalchemy.exc.IntegrityError:
        print("一意制約違反により、挿入に失敗しました")
        result_json = None

    session.close()  # セッションを閉じる
    return result_json


# メンタリングスケジュールリスト用
def get_mentoring_data(models, mentor_id):
    Session = sessionmaker(bind=engine)
    session = Session()

    # 使用するテーブルの結合とフィルタリング
    query = select(* models)
    query = query.select_from(MenteeMaster).join(UserData, isouter=True)
    query = query.select_from(MenteeMaster).join(Mentoring, isouter=True)
    query = query.filter(MenteeMaster.mentor_id == mentor_id)
    query = query.filter(Mentoring.mtg_content == None)
    query = query.filter(Mentoring.mtg_date != None)  # ここは、想定しているフローでは起こりえない。エラー処理で対応したい。

    try:
        with session.begin():  # トランザクションを開始
            today = datetime.today()

            df = pd.read_sql_query(query, con=engine).reset_index()
            df['mentee_id'] =df['id']
            df['mentoring_id'] =df['id_1']

            # 日付データ形式の変換
            df['mtg_date'] = df['mtg_date'].apply(lambda x: x.strftime('%Y/%m/%d'))

            # 時間データ形式の変換
            df['mtg_start_time'] = df['mtg_start_time'].apply(lambda x: x.strftime('%H:%M'))

            # 年齢データの作成
            df['age'] = None
            for i in range(len(df)):
                df.loc[i, 'age'] = (int(today.strftime('%Y%m%d')) -int(df.loc[i, 'birth_date'].strftime('%Y%m%d'))) //10000

            # 入社年数データの作成
            df['working_years'] = None
            for i in range(len(df)):
                df.loc[i, 'working_years'] = (int(today.strftime('%Y%m%d')) -int(df.loc[i, 'join_date'].strftime('%Y%m%d'))) //10000 + 1

            # 前回アドバイスデータの作成（本来はmtgリクエスト作成時に対応）
            # ここが必要そう

            # データの抽出
            df = df[['mentoring_id', 'mentee_id', 'name', 'age', 'gender', 'working_years',
                     'mtg_date', 'mtg_start_time', 'request_to_mentor_for_attitude', 'request_to_mentor_for_content', 'pre_advise_to_mentor_for_mtg']]
            df = df.sort_values('mtg_date', ascending=True)
            result_json = df.to_json(orient='records', force_ascii=False)
            result_json = json.loads(result_json)

    except sqlalchemy.exc.IntegrityError:
        print("一意制約違反により、挿入に失敗しました")
        result_json = None

    session.close()  # セッションを閉じる
    return result_json


# メンタリング開始時の情報取得
def get_mentoring_details(models, mentoring_id):
    Session = sessionmaker(bind=engine)
    session = Session()

    # 使用するテーブルの結合とフィルタリング
    query = select(* models)
    query = query.select_from(MenteeMaster).join(UserData, isouter=True)
    query = query.select_from(MenteeMaster).join(Mentoring, isouter=True)
    query = query.filter(Mentoring.id == mentoring_id)

    try:
        with session.begin():  # トランザクションを開始
            today = datetime.today()

            df = pd.read_sql_query(query, con=engine).reset_index()
            df['mentoring_id'] =df['id_1']

            # 日付データ形式の変換
            df['mtg_date'] = df['mtg_date'].apply(lambda x: x.strftime('%Y/%m/%d'))

            # 時間データ形式の変換
            df['mtg_start_time'] = df['mtg_start_time'].apply(lambda x: x.strftime('%H:%M'))

            # 年齢データの作成
            df['age'] = None
            for i in range(len(df)):
                df.loc[i, 'age'] = (int(today.strftime('%Y%m%d')) -int(df.loc[i, 'birth_date'].strftime('%Y%m%d'))) //10000

            # 入社年数データの作成
            df['working_years'] = None
            for i in range(len(df)):
                df.loc[i, 'working_years'] = (int(today.strftime('%Y%m%d')) -int(df.loc[i, 'join_date'].strftime('%Y%m%d'))) //10000 + 1

            # データの抽出
            df = df[['id', 'name', 'age', 'gender', 'working_years',
                     'mentoring_id', 'mtg_date', 'mtg_start_time', 'request_to_mentor_for_attitude', 'request_to_mentor_for_content', 'pre_advise_to_mentor_for_mtg', 'pre_mtg_content_summary']]
            df = df.sort_values('mtg_date', ascending=True)
            result_json = df.to_json(orient='records', force_ascii=False)
            result_json = json.loads(result_json)

    except sqlalchemy.exc.IntegrityError:
        print("一意制約違反により、挿入に失敗しました")
        result_json = None

    session.close()  # セッションを閉じる
    return result_json


# メンタリング結果の保存
def update_data(models, mentoring_id, data):
    Session = sessionmaker(bind=engine)
    session = Session()

    query = update(models).values(data).where(Mentoring.id == mentoring_id)

    try:
        with session.begin():
            result = session.execute(query)

    except sqlalchemy.exc.IntegrityError:
        print("一意制約違反により、挿入に失敗しました")
        session.rollback()

    session.close()  # セッションを閉じる
    return "保存完了"


# 情報取得
def get_mtg_content(models, mentoring_id):
    Session = sessionmaker(bind=engine)
    session = Session()

    # 使用するテーブルの結合とフィルタリング
    query = select(models)
    query = query.filter(Mentoring.id == mentoring_id)

    try:
        with session.begin():  # トランザクションを開始
            df = pd.read_sql_query(query, con=engine)
            df = df[['mtg_content']]
            result_json = df.to_json(orient='records', force_ascii=False)
            result_json = json.loads(result_json)

    except sqlalchemy.exc.IntegrityError:
        print("一意制約違反により、挿入に失敗しました")
        result_json = None

    session.close()  # セッションを閉じる
    return result_json


# メンタースキルマップ
def get_feedback_data(models, mentor_id, FB_flg):
    Session = sessionmaker(bind=engine)
    session = Session()

    # 使用するテーブルの結合とフィルタリング
    query = select(* models)
    query = query.select_from(Feedback).join(Mentoring, Feedback.mentoring_id == Mentoring.id, isouter=True)
    query = query.select_from(Mentoring).join(MenteeMaster, Mentoring.mentee_id == MenteeMaster.id, isouter=True)
    query = query.select_from(MenteeMaster).join(MentorMaster, MenteeMaster.mentor_id == MentorMaster.id, isouter=True)
    query = query.select_from(MentorMaster).join(UserData, MentorMaster.employee_code == UserData.employee_code, isouter=True)
    query = query.filter(MenteeMaster.mentor_id == mentor_id)
    query = query.filter(Feedback.mentee_feedback_flg == FB_flg)

    try:
        with session.begin():  # トランザクションを開始
            df = pd.read_sql_query(query, con=engine)

            df['mentor_id'] = df['id_1']
            df['mentoring_id'] = df['id_2']

            # 日付データ形式の変換
            df['mtg_date'] = df['mtg_date'].apply(lambda x: x.strftime('%Y/%m/%d'))

            # トータルスコアの作成
            df['total_score'] = df['listening_score'] + df['questioning_score'] + df['feedbacking_score'] + df['empathizing_score'] + df['motivating_score'] + df['coaching_score'] + df['teaching_score'] + df['analyzing_score'] + df['inspiration_score'] + df['vision_score']

            # データの抽出
            df = df[['mentor_id', 'name', 'mentoring_id', 'mtg_date',
                     'listening_score', 'questioning_score', 'feedbacking_score', 'empathizing_score', 'motivating_score', 'coaching_score', 'teaching_score', 'analyzing_score', 'inspiration_score', 'vision_score', 'total_score', 'mentee_feedback_flg']]

            result_json = df.to_json(orient='records', force_ascii=False)
            result_json = json.loads(result_json)

    except sqlalchemy.exc.IntegrityError:
        print("一意制約違反により、挿入に失敗しました")
        result_json = None

    session.close()  # セッションを閉じる
    return result_json
