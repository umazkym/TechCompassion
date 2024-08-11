import React from 'react';
import UserDataCard from './components/1on1_schedule';
import MatchingMentee from './components/matchingmentee';
import Image from 'next/image';
import Link from 'next/link';

const page = () => {
  // データの定義
  const userData = {
    date: "2024/1/1",
    imageSrc: "/icon/DESIGN.png",
    name: "山田太郎",
    experience: "入社3年目",
    topic: "今後のキャリアについて",
    response: "一緒に考えてほしい",
    advice:
      "前回はメンター主体で会話が進んだようです。メンティーが話したい内容を伝えやすい環境を作り、自己成長に繋がる気づきを促すための質問を意識しましょう。時間配分を適切に管理し、メンティーが自由に意見を表現できるような雰囲気作りを心掛けてください。",
  };

  return (
    <div className='p-8'>
      <div className='text-4xl py-5'>Home</div>
      <div className='bg-[#D9D9D9]'>
        <div className='pl-5 py-3 text-2xl text-black'>1on1スケジュールテーブル</div>
        <div className='flex justify-between gap-x-8 px-24 py-10'>
          <UserDataCard
            date={userData.date}
            imageSrc={userData.imageSrc}
            name={userData.name}
            experience={userData.experience}
            topic={userData.topic}
            response={userData.response}
            advice={userData.advice}
          />
          <div className='rounded-3xl w-1/4 h-auto bg-gray-100 p-10 flex items-center justify-center text-gray-700 shadow-lg'>
            <p>ここに追加してく１</p>
          </div>
          <div className='rounded-3xl w-1/4 h-auto bg-gray-100 p-10 flex items-center justify-center text-gray-700 shadow-lg'>
            <p>ここに追加してく１</p>
          </div>
          <div className='rounded-3xl w-1/4 h-auto bg-gray-100 p-10 flex items-center justify-center text-gray-700 shadow-lg'>
            <p>ここに追加してく１</p>
          </div>
        </div>
      </div>
      <div className='text-4xl pt-10 pb-5'>マッチング済メンティー一覧</div>
      <div className='flex justify-between px-24 pt-10'>
        <MatchingMentee
          imageSrc="/icon/DESIGN.png"
          name="田中花子"
        />
        <div className='flex flex-col items-center justify-center'>
          <p>ここに追加してく２</p>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <p>ここに追加してく２</p>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <p>ここに追加してく２</p>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <p>ここに追加してく２</p>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <p>ここに追加してく２</p>
        </div>
      </div>
    </div>
  );
};

export default page;
