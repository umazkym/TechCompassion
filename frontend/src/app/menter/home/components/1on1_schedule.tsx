"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Confirm1on1 from './confirm_1on1';

interface UserDataCardProps {
    date: string;
    imageSrc: string;
    name: string;
    experience: string;
    topic: string;
    response: string;
    advice: string;
}

const UserDataCard: React.FC<UserDataCardProps> = ({
    date,
    imageSrc,
    name,
    experience,
    topic,
    response,
    advice,
}) => {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleConfirm = () => {
        setShowConfirm(false);
        // ここにページ遷移や1on1開始のロジックを追加
    };

    const handleCancel = () => {
        setShowConfirm(false);
    };

    return (
    <div className='rounded-3xl w-1/4 h-auto bg-white p-8 flex flex-col items-center text-black shadow-lg'>
        <div className="text-3xl mb-6">{date}</div>
        <Image
        src={imageSrc}
        alt={name}
        width={150}
        height={150}
        className="rounded-full bg-white mb-6 border-gray-400 border-4"
        />
        <div className='text-center'>
        <div className='mb-4'>
            <p className="text-xl">{name}</p>
            <p className="text-sm">{experience}</p>
        </div>
        <div className='mb-6'>
            <div className='mb-2'>
            <p className='text-lg font-semibold'>トピック</p>
            <p className="mb-1">{topic}</p>
            <p className='text-lg font-semibold'>対応</p>
            <p>{response}</p>
            </div>
        </div>
        <div className='mb-6'>
            <p className="text-lg font-semibold">AIによる一言アドバイス</p>
            <p className="text-gray-600 text-sm">{advice}</p>
        </div>
        </div>
        <div className='mt-auto w-full'>
        <button
            onClick={() => setShowConfirm(true)}
            className='block w-full bg-[#6C69FF] text-white py-3 px-6 rounded-lg shadow-lg text-center mb-4'
        >
            1on1を開始する
        </button>
        <Link href="/menter/score" className='block bg-gray-700 text-white py-3 px-6 rounded-lg shadow-lg text-center mb-4'>
            過去のスコアを<br/>振り返る
        </Link>
        <Link href="/menter/history" className='block bg-gray-700 text-white py-3 px-6 rounded-lg shadow-lg text-center'>
            過去の1on1を<br/>振り返る
        </Link>
        </div>

        {showConfirm && (
        <Confirm1on1
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            date={date}
            imageSrc={imageSrc}
            name={name}
            experience={experience}
            topic={topic}
            response={response}
            advice={advice}
        />
        )}
    </div>
    );
};

export default UserDataCard;