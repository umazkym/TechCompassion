"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleConfirm = () => {
    setShowConfirm(false);
    if (isMounted) {
      router.push('/menter/1on1');
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-8">
      <div className="text-3xl sm:text-4xl py-5 text-center sm:text-left">メンティー詳細</div>
      <div className="flex flex-col sm:flex-row bg-white border-gray-400 border-2 rounded-lg p-6 sm:p-10 mb-10">
        <div className="w-full sm:w-1/2 flex items-center mb-6 sm:mb-0">
          <div className="w-1/2 flex flex-col justify-center">
            <p className="text-2xl sm:text-3xl font-semibold text-center">山田太郎</p>
            <p className="text-lg sm:text-xl text-gray-600 text-center">入社3年目</p>
          </div>
          <div className="w-1/2 flex justify-center">
            <Image
              src="/icon/DESIGN.png"
              alt="Profile Image"
              width={200}
              height={200}
              className="rounded-full bg-white mb-4 border-gray-400 border-2"
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2 sm:pl-8">
          <div className="pb-6">
            <div className="flex justify-between mb-2">
              <p className="text-gray-700">社員コード:</p>
              <p className="font-medium">123456</p>
            </div>
            <div className="flex justify-between mb-2">
              <p className="text-gray-700">性別:</p>
              <p className="font-medium">男性</p>
            </div>
            <div className="flex justify-between mb-2">
              <p className="text-gray-700">生年月日:</p>
              <p className="font-medium">1990/01/01</p>
            </div>
            <div className="flex justify-between mb-2">
              <p className="text-gray-700">部門:</p>
              <p className="font-medium">営業部</p>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <p className="text-gray-700">1on1を実施した回数:</p>
              <p className="font-medium">10回</p>
            </div>
            <div className="flex justify-between mb-2">
              <p className="text-gray-700">スコア平均（メンティーFB）:</p>
              <p className="font-medium">4.5</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">スコア平均（AI）:</p>
              <p className="font-medium">4.7</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row py-5 space-y-6 lg:space-y-0 lg:space-x-6">
        <div className="w-full lg:w-1/2 bg-[#D9D9D9] text-center rounded-xl p-6">
          <p className="text-xl sm:text-2xl font-semibold my-3">これまでのあしあと</p>
          <div className="flex flex-col space-y-6 sm:space-y-0 sm:flex-row sm:space-x-6">
            {Array(2).fill(0).map((_, index) => (
              <div key={index} className="w-full bg-white rounded-xl border-[#555555] border-2 p-4 flex flex-col justify-between">
                <div>
                  <p className="text-lg font-semibold mb-2 text-center">7/1</p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      <div className="w-1/4 text-center">トピック：</div>
                      <p className="text-lg">今後のキャリアについて</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-1/4 text-center">対応：</div>
                      <p className="text-lg">一緒に考えてほしい</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-80 pt-4 text-center">1ポイントアドバイス</div>
                    </div>
                    <p className="text-lg text-center">
                      前回はメンター主体で会話が進んだようです。メンティーが話したい内容を伝えやすい環境を作り、
                      自己成長に繋がる気づきを促すための質問を意識しましょう。時間配分を適切に管理し、
                      メンティーが自由に意見を表現できるような雰囲気作りを心掛けてください。
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center mt-4">
                  <Link href="/menter/score" className="block bg-[#555555] text-white py-3 px-6 rounded-lg shadow-lg text-center mb-4 w-full">
                    過去のスコアを<br />振り返る
                  </Link>
                  <Link href="/menter/history" className="block bg-[#555555] text-white py-3 px-6 rounded-lg shadow-lg text-center w-full">
                    過去の1on1を<br />振り返る
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/2 bg-[#D9D9D9] text-center rounded-xl p-6">
          <p className="text-xl sm:text-2xl font-semibold my-3">今後のスケジュール</p>
          <div className="flex flex-col space-y-6 sm:space-y-0 sm:flex-row sm:space-x-6">
            {Array(2).fill(0).map((_, index) => (
              <div key={index} className="w-full bg-white rounded-xl border-[#555555] border-2 p-4 flex flex-col justify-between">
                <div>
                  <p className="text-lg font-semibold mb-2 text-center">7/1</p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      <div className="w-1/4 text-center">トピック：</div>
                      <p className="text-lg">今後のキャリアについて</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-1/4 text-center">対応：</div>
                      <p className="text-lg">一緒に考えてほしい</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-80 pt-4 text-center">1ポイントアドバイス</div>
                    </div>
                    <p className="text-lg text-center">
                      前回はメンター主体で会話が進んだようです。メンティーが話したい内容を伝えやすい環境を作り、
                      自己成長に繋がる気づきを促すための質問を意識しましょう。時間配分を適切に管理し、
                      メンティーが自由に意見を表現できるような雰囲気作りを心掛けてください。
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center mt-4">
                  <button
                    onClick={handleConfirm}
                    className="block w-full bg-[#6C69FF] text-white py-3 px-6 rounded-lg shadow-lg text-center mb-4"
                  >
                    1on1を開始する
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
