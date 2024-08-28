"use client";

import React, { useEffect, useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Icon } from '@iconify/react';

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

const PageContent = () => {
  const searchParams = useSearchParams();
  const mentoring_id = searchParams.get('mentoring_id');

  const [activeTab, setActiveTab] = useState('tab1');
  const [memo, setMemo] = useState('');
  const [userInfo, setUserInfo] = useState({
    name: '',
    experience: '',
    topic: '',
    response: '',
    advice: '',
    summary: '',
    preAdvise: '',
  });
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

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
              summary: user.pre_mtg_content_summary || '',
              preAdvise: user.pre_advise_to_mentor_for_mtg || '',
            });
          }
        } catch (error) {
          console.error('ユーザー情報の取得に失敗しました:', error);
        }
      };

      fetchUserInfo();
    }
  }, [mentoring_id]);

  useEffect(() => {
    const SpeechRecognition =
      (window.SpeechRecognition || window.webkitSpeechRecognition) as any;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.lang = 'ja-JP';
      recognition.interimResults = true;
      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            setFinalTranscript((prev) => prev + transcript + ' ');
          } else {
            interimTranscript += transcript;
          }
        }
        setTranscript(interimTranscript);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleStartRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleEndRecording = async () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);

      const data = {
        id: mentoring_id,
        mtg_content: finalTranscript + transcript,
        mtg_memo: memo,
      };

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mentoring/${mentoring_id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
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

  const closePopup = () => setShowPopup(false);

  return (
    <div className="flex flex-col min-h-screen p-8">
      {/* ヘッダー */}
      <div className="flex justify-between items-center">
        <div className="text-4xl py-5">1on1ミーティング<br/>{userInfo.name}</div>
        <div className="text-md">作成日: 2024/1/1</div>
      </div>

      {/* メインコンテンツ */}
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
            <div className="ml-5 text-lg">{userInfo.preAdvise}</div>
          </div>
        </div>
      </div>

      {/* タブナビゲーション */}
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

      {/* タブコンテンツ */}
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
              onChange={(e) => setMemo(e.target.value)}
            />
          </div>
        )}
        {activeTab === 'tab3' && (
          <div className="text-lg leading-relaxed">
            <p><strong>サマリー：</strong></p>
            <ul className="list-disc list-inside ml-4">
              <li>{userInfo.summary}</li>
            </ul>
          </div>
        )}
      </div>

      {/* ポップアップ表示 */}
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

      {/* 終了ボタン */}
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

const Page = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <PageContent />
  </Suspense>
);

export default Page;
