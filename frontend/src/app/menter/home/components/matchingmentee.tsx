import React from 'react';
import Image from 'next/image';

interface MatchingMenteeProps {
    imageSrc: string;
    name: string;
}

const MatchingMentee: React.FC<MatchingMenteeProps> = ({ imageSrc, name }) => {
    return (
    <div className='flex flex-col items-center justify-center'>
        <Image
        src={imageSrc}
        alt={name}
        width={150}
        height={150}
        className="rounded-full bg-white mb-2 border-gray-400 border-4"
        />
        <p>{name}</p>
    </div>
    );
};

export default MatchingMentee;
