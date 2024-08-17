"use client";

import React, { useEffect, useState } from 'react';
import UserDataCard from './components/1on1_schedule';
import MatchingMentee from './components/matchingmentee';

interface MentoringData {
    id: number;
    name: string;
    age: number;
    gender: string;
    working_years: number;
    mentoring_id: number;
    mtg_date: number;  // UNIXタイムスタンプ形式
    mtg_start_time: string;
    request_to_mentor_for_attitude: string;
    request_to_mentor_for_content: string;
    advise_to_mentor_for_mtg: string;
}

const Page: React.FC = () => {
    const [mentoringSchedules, setMentoringSchedules] = useState<MentoringData[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [showPopup, setShowPopup] = useState(false);  // ポップアップの表示状態を管理
    const itemsPerPage = 3;  // 一度に表示する最大数

    useEffect(() => {
        const fetchMentoringSchedules = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/mentor/1/mentoring_schedule');
                const data: MentoringData[] = await response.json();
                setMentoringSchedules(data);
            } catch (error) {
                console.error('Failed to fetch mentoring schedule data:', error);
            }
        };

        fetchMentoringSchedules();
    }, []);

    const handleNextPage = () => {
        if ((currentPage + 1) * itemsPerPage < mentoringSchedules.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const currentItems = mentoringSchedules.slice(
        currentPage * itemsPerPage,
        currentPage * itemsPerPage + itemsPerPage
    );

    // ポップアップが表示されている場合は、ページングボタンを非表示にするクラスを適用
    const pagingButtonClass = showPopup
        ? 'opacity-0 pointer-events-none'  // 見えないようにするクラス
        : 'opacity-100';

    return (
        <div className='p-8'>
            <div className='text-4xl py-5'>Home</div>
            <div className='bg-[#D9D9D9]'>
                <div className='pl-5 py-3 text-2xl text-black'>1on1スケジュールテーブル</div>
                <div className='flex justify-between gap-x-8 px-24 py-10'>
                    {currentItems.map(schedule => (
                        <UserDataCard
                            key={schedule.mentoring_id}
                            date={new Date(schedule.mtg_date).toLocaleDateString('ja-JP')}  // 日付を表示
                            imageSrc="/icon/DESIGN.png"  // 画像は流用
                            name={schedule.name}
                            experience={`入社${schedule.working_years}年目`}
                            topic={schedule.request_to_mentor_for_content}
                            response={schedule.request_to_mentor_for_attitude}
                            advice={schedule.advise_to_mentor_for_mtg}
                            setShowPopup={setShowPopup}  // ポップアップの表示状態を管理する関数を渡す
                        />
                    ))}
                </div>
                <div className={`flex justify-center ${pagingButtonClass}`}>
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 0}
                        className='px-4 py-2 mx-2 bg-gray-300 rounded-lg disabled:opacity-50'
                    >
                        &lt; 前
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={(currentPage + 1) * itemsPerPage >= mentoringSchedules.length}
                        className='px-4 py-2 mx-2 bg-gray-300 rounded-lg disabled:opacity-50'
                    >
                        次 &gt;
                    </button>
                </div>
            </div>
            <div className='text-4xl pt-10 pb-5'>マッチング済メンティー一覧</div>
            <MatchingMentee />  {/* 既存のMatchingMenteeコンポーネント */}
        </div>
    );
};

export default Page;
