"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Icon } from '@iconify/react';

// SpeechRecognition の型を定義
interface ISpeechRecognition extends EventTarget {
  start: () => void;
  stop: () => void;
  onresult: (event: any) => void;
  onend: () => void;
  continuous: boolean;
  interimResults: boolean;
  lang: string;
}

declare global {
  interface Window {
    SpeechRecognition: ISpeechRecognition;
    webkitSpeechRecognition: ISpeechRecognition;
  }
}

const Page = () => {
  const searchParams = useSearchParams();
  const mentoring_id = searchParams.get('mentoring_id');
  const [activeTab, setActiveTab] = useState('tab1');
  const [memo, setMemo] = useState(''); // メモの状態を管理
  const [userInfo, setUserInfo] = useState({
    name: '',
    experience: '',
    topic: '',
    response: '',
    advice: '',
  });
  const [isRecording, setIsRecording] = useState(false); // 録音状態の管理
  const [transcript, setTranscript] = useState(''); // 現在の発話の文字起こしを保存
  const [finalTranscript, setFinalTranscript] = useState(''); // 完成した発話の文字起こしを保存
  const [showPopup, setShowPopup] = useState(false); // ポップアップの表示管理
  const [showButtons, setShowButtons] = useState(true); // ボタン表示の管理
  const recognitionRef = useRef<ISpeechRecognition | null>(null); // SpeechRecognition API のインスタンスを保持

  // ページのURLパラメータからユーザー情報を取得
  useEffect(() => {
    if (mentoring_id) {
      const fetchUserInfo = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/mentoring/${mentoring_id}`);
          const data = await response.json();
          if (data && data.length > 0) {
            const user = data[0];
            setUserInfo({
              name: user.name,
              experience: `入社${user.working_years}年目`,
              topic: user.request_to_mentor_for_content,
              response: user.request_to_mentor_for_attitude,
              advice: user.advise_to_mentor_for_mtg || '',
            });
          }
        } catch (error) {
          console.error('ユーザー情報の取得に失敗しました:', error);
        }
      };

      fetchUserInfo();
    }
  }, [mentoring_id]);

  // SpeechRecognition API の設定
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.lang = 'ja-JP'; // 言語を日本語に設定
      recognition.interimResults = true; // 中間結果も取得する

      // 音声認識の結果を処理
      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            setFinalTranscript((prev) => prev + transcript + ' '); // 最終結果を保存
          } else {
            interimTranscript += transcript; // 中間結果を保存
          }
        }
        setTranscript(interimTranscript); // 中間結果を表示
      };

      // 録音が終了したときの処理
      recognition.onend = () => {
        setIsRecording(false);
      };

      // recognition インスタンスを ref に保持
      recognitionRef.current = recognition;
    }

    // クリーンアップ関数: コンポーネントがアンマウントされたときに録音を停止
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // 録音の開始
  const handleStartRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  // 録音の終了とAPI送信、ポップアップ表示
  const handleEndRecording = async () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);

      const data = {
        id: mentoring_id,
        mtg_content: finalTranscript + transcript,
        mtg_memo: memo,
      };

      console.log("Sending data:", data); // 送信データを確認

      try {
        const response = await fetch(`http://127.0.0.1:8000/mentoring/${mentoring_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`データの送信に失敗しました: ${errorMessage}`);
        }

        alert('データが送信されました');
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error submitting data:', error);
          alert(`データの送信に失敗しました: ${error.message}`);
        } else {
          console.error('Error submitting data:', error);
          alert('データの送信に失敗しました');
        }
      }

      setShowPopup(true);
      setShowButtons(false);
    }
  };

  // ポップアップを閉じる
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col min-h-screen p-8">
      <div className="flex justify-between items-center">
        <div className="text-4xl py-5">1on1ミーティング<br/>{userInfo.name}</div>
        <div className="text-md">作成日: 2024/1/1</div>
      </div>
      <div className="flex items-center justify-center py-2 mb-3">
        <div className="w-full md:w-2/5 space-y-6">
          <div className="flex items-center">
            <div className="bg-[#6C69FF] w-28 py-2 rounded-2xl text-center text-white">トピック</div>
            <div className="ml-5 text-lg">{userInfo.topic}</div>
          </div>
          <div className="flex items-center">
            <div className="bg-[#6C69FF] w-28 py-2 rounded-2xl text-center text-white">対応</div>
            <div className="ml-5 text-lg">{userInfo.response}</div>
          </div>
        </div>
        <div className="w-full md:w-3/5">
          <div className="flex items-center h-full">
            <div className="bg-[#6C69FF] w-full py-2 rounded-2xl text-center text-white">
              <div>ワンポイント</div>
              <div>アドバイス</div>
            </div>
            <div className="ml-5 text-lg">{userInfo.advice}</div>
          </div>
        </div>
      </div>
      <div className="flex mb-[-1px]">
        <button
          className={`py-2 px-4 rounded-t-lg flex items-center border border-[#555555] ${
            activeTab === 'tab1' ? 'bg-[#555555] text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('tab1')}
        >
          対話履歴
          <Icon icon="ri:user-voice-fill" className="ml-2 text-2xl" />
        </button>
        <button
          className={`py-2 px-4 rounded-t-lg flex items-center border border-[#555555] ${
            activeTab === 'tab2' ? 'bg-[#555555] text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('tab2')}
        >
          対話メモ
          <Icon icon="fluent-emoji-high-contrast:memo" className="ml-2 text-2xl" />
        </button>
        <button
          className={`py-2 px-4 rounded-t-lg flex items-center border border-[#555555] ${
            activeTab === 'tab3' ? 'bg-[#555555] text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('tab3')}
        >
          前回のサマリー
          <Icon icon="carbon:save" className="ml-2 text-2xl" />
        </button>
      </div>
      <div className="border border-[#555555] p-4 mt-[-1px] bg-white flex-1 overflow-y-auto relative">
        {activeTab === 'tab1' && (
          <div>
            {!isRecording ? (
              showButtons && (
                <div className="flex justify-center items-center h-full">
                  <button
                    onClick={handleStartRecording}
                    className="bg-[#6C69FF] text-white py-4 px-8 rounded-lg shadow-lg"
                  >
                    1on1を開始する
                  </button>
                </div>
              )
            ) : (
              <div className="text-lg">{finalTranscript + transcript}</div>
            )}
          </div>
        )}
        {activeTab === 'tab2' && (
          <div className="text-lg">
            <textarea
              className="w-full h-[620px] p-2 border border-gray-300 rounded-lg bg-white text-black"
              placeholder="ここにメモを入力してください"
              value={memo}
              onChange={(e) => setMemo(e.target.value)} // メモの状態を更新
            />
          </div>
        )}
        {activeTab === 'tab3' && (
          <div className="text-lg leading-relaxed">
          <p><strong>サマリー：</strong></p>
          <ul className="list-disc list-inside ml-4">
            <li>メンターとメンティーが、職場での早朝の過ごし方や、上司との良好な関係の築き方について話し合いました。</li>
          </ul>
          <p><strong>詳細：</strong></p>
          <ul className="list-disc list-inside ml-4">
            <li>メンターは、早めに出勤して自己学習や準備を行うことで、上司からの評価が上がる経験を共有しました。</li>
            <li>メンティーは上司との関係改善のために、挨拶や他人の手助けを積極的に行うことの重要性に気づきました。</li>
            <li>彼らは、仕事のスキルだけでなく、周囲との良好な関係が職場での成功に繋がると結論づけました。</li>
          </ul>
        </div>
        )}
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="mb-4">1on1データを保存しました。</p>
            <button
              onClick={closePopup}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              確認
            </button>
          </div>
        </div>
      )}
      {showButtons && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleEndRecording}
            className="bg-[#F24822] text-white py-2 px-6 rounded-lg shadow-lg"
          >
            1on1を終了する
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
