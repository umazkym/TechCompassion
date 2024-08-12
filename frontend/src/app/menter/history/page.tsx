"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

const Page = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const router = useRouter();

  const handleEndSession = () => {
    router.push('/menter/home');
  };

  return (
    <div className="flex flex-col min-h-screen p-8">
      <div className='flex justify-between items-center'>
        <div className='text-4xl py-5'>1on1ミーティング</div>
        <div className='text-md'>作成日: 2024/1/1</div>
      </div>
      <div className='flex items-center justify-center py-2 mb-3'>
        <div className='w-full md:w-2/5 space-y-6'>
          <div className='flex items-center'>
            <div className='bg-[#6C69FF] w-28 py-2 rounded-2xl text-center text-white'>
              トピック
            </div>
            <div className='ml-5 text-lg'>今後のキャリアについて</div>
          </div>
          <div className='flex items-center'>
            <div className='bg-[#6C69FF] w-28 py-2 rounded-2xl text-center text-white'>
              対応
            </div>
            <div className='ml-5 text-lg'>一緒に考えてほしい</div>
          </div>
        </div>
        <div className='w-full md:w-3/5'>
          <div className='flex items-center h-full'>
            <div className='bg-[#6C69FF] w-80 py-2 rounded-2xl text-center text-white'>
              <div>1ポイント</div>
              <div>アドバイス</div>
            </div>
            <div className='ml-5 text-lg'>
              前回はメンター主体で会話が進んだようです。メンティーが話したい内容を伝えやすい環境を作り、
              自己成長に繋がる気づきを促すための質問を意識しましょう。時間配分を適切に管理し、
              メンティーが自由に意見を表現できるような雰囲気作りを心掛けてください。
            </div>
          </div>
        </div>
      </div>
      <div className="flex mb-[-1px]">
        <button
          className={`py-2 px-4 rounded-t-lg flex items-center border border-[#555555] ${activeTab === 'tab1' ? 'bg-[#555555] text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('tab1')}
        >
          対話履歴
          <Icon icon="ri:user-voice-fill" className="ml-2 text-2xl" />
        </button>
        <button
          className={`py-2 px-4 rounded-t-lg flex items-center border border-[#555555] ${activeTab === 'tab2' ? 'bg-[#555555] text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('tab2')}
        >
          対話メモ
          <Icon icon="fluent-emoji-high-contrast:memo" className="ml-2 text-2xl" />
        </button>
        <button
          className={`py-2 px-4 rounded-t-lg flex items-center border border-[#555555] ${activeTab === 'tab3' ? 'bg-[#555555] text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('tab3')}
        >
          前回のサマリー
          <Icon icon="carbon:save" className="ml-2 text-2xl" />
        </button>
      </div>
      <div className="border border-[#555555] p-4 mt-[-1px] bg-white flex-1 overflow-y-auto">
        {
          activeTab === 'tab1' && <div className='text-lg'>あaaa</div>
        }
        {
          activeTab === 'tab2' && (
            <div className='text-lg'>
              <textarea
                className='w-full h-full p-2 border border-gray-300 rounded-lg bg-white text-black'
                placeholder='ここにメモを入力してください'
              />
            </div>
          )
        }
        {
          activeTab === 'tab3' && (
            <div className='text-lg'>
              <p>
                1. 相談内容<br />
                山田太郎さんは、現在の仕事に対するモチベーションの低下について相談してきました。<br />
                具体的には、業務が単調に感じられ、新しいスキルを学ぶ機会が少ないと感じているとのことです。
              </p>
              <p>
                2. 興味・関心<br />
                山田太郎さんは、データ分析やプロジェクトマネジメントに強い興味を持っており、これらのスキルを身につけたいと考えています。<br />
                しかし、具体的な始め方が分からず、戸惑っている状況です。
              </p>
              <p>
                3. 提案・アクションプラン<br />
                山田太郎さんに対して、以下のアクションプランを提案しました。<br />
                - 会社内のプロジェクト調査: データ分析やプロジェクトマネジメントに関する社内プロジェクトを調査し、それに関わることで実践的に学ぶ機会を得る。<br />
                - オンラインコースの活用: 外部のオンラインコースやセミナーを活用し、自己学習を進める。
              </p>
              <p>
                4. 心情<br />
                山田太郎さんは、現在の状況に対して不安や戸惑いを感じていますが、新しいスキルを学ぶ意欲は高く、具体的なアクションプランを提示されたことで、少し安心した様子でした。
              </p>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Page;
