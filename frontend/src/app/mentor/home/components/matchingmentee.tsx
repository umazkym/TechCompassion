"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface MenteeData {
    id: number;
    name: string;
    age: number;
    gender: string;
    working_years: number;
}

const MatchingMentee: React.FC = () => {
    const [mentees, setMentees] = useState<MenteeData[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4;

    // メンティーデータ取得
    useEffect(() => {
        const fetchMentees = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/mentor/1/home');
                const data: MenteeData[] = await response.json();
                setMentees(data);
            } catch (error) {
                console.error('メンティーデータの取得に失敗しました:', error);
            }
        };

        fetchMentees();
    }, []);

    // 次のページへ進む
    const handleNextPage = () => {
        if ((currentPage + 1) * itemsPerPage < mentees.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    // 前のページに戻る
    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const currentItems = mentees.slice(
        currentPage * itemsPerPage,
        currentPage * itemsPerPage + itemsPerPage
    );

    return (
        <div>
            <div className='flex justify-between px-24 pt-10'>
                {currentItems.map(mentee => (
                    <div key={mentee.id} className='flex flex-col items-center justify-center'>
                        <Image
                            src="/icon/DESIGN.png"
                            alt={mentee.name}
                            width={150}
                            height={150}
                            className='rounded-full bg-white mb-2 border-gray-400 border-4'
                        />
                        <p>{mentee.name}</p>
                    </div>
                ))}
            </div>
            <div className='flex justify-center pt-5'>
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                    className='px-4 py-2 mx-2 bg-gray-300 rounded-lg disabled:opacity-50'
                >
                    &lt; 前
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={(currentPage + 1) * itemsPerPage >= mentees.length}
                    className='px-4 py-2 mx-2 bg-gray-300 rounded-lg disabled:opacity-50'
                >
                    次 &gt;
                </button>
            </div>
        </div>
    );
};

export default MatchingMentee;
