# SQLiteのDBに接続

import platform
print(platform.uname())

from sqlalchemy import create_engine  # create_engineはデータベースエンジンを作成し、データベースとの接続を管理。
import sqlalchemy
import os  # ファイルシステムに関する操作が可能。


main_path = os.path.dirname(os.path.abspath(__file__))  # __file__変数は現在のスクリプトファイルのパス。
                                                        # os.path.abspath(__file__)で絶対パスを取得。os.path.dirname()でそのディレクトリのパスを取得。

path = os.chdir(main_path)  # カレントディレクトリをmain_pathに設定。

engine = create_engine("sqlite:///step4.db", echo=True)