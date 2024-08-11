import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Confirm1on1Props {
  onConfirm: () => void;
  onCancel: () => void;
  date: string;
  imageSrc: string;
  name: string;
  experience: string;
  topic: string;
  response: string;
  advice: string;
}

const Confirm1on1: React.FC<Confirm1on1Props> = ({
  onConfirm,
  onCancel,
  date,
  imageSrc,
  name,
  experience,
  topic,
  response,
  advice,
}) => {
  const router = useRouter();

  const handleConfirm = () => {
    router.push('/menter/1on1');
    onConfirm();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">1on1を開始しますか？</h2>
        <div className='text-center mb-4'>
          <div className="text-3xl mb-2">{date}</div>
          <Image
            src={imageSrc}
            alt={name}
            width={100}
            height={100}
            className="rounded-full bg-white mb-4 border-gray-400 border-2 mx-auto"
          />
          <p className="text-xl">{name}</p>
          <p className="text-sm">{experience}</p>
          <div className='my-4'>
            <p className='text-lg font-semibold'>トピック</p>
            <p>{topic}</p>
            <p className='text-lg font-semibold mt-2'>対応</p>
            <p>{response}</p>
          </div>
          <div>
            <p className="text-lg font-semibold">AIによる一言アドバイス</p>
            <p className="text-gray-600 text-sm">{advice}</p>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={handleConfirm}
            className="bg-[#6C69FF] text-white py-2 px-4 rounded-lg shadow-lg mb-4 w-full"
          >
            1on1を開始する
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg shadow-lg w-full"
          >
            前の画面に戻る
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm1on1;
