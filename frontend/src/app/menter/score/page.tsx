"use client";

import React from 'react';
import { Line, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, RadialLinearScale, ScriptableScalePointLabelContext, ChartOptions, ChartData } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, RadialLinearScale, Title, Tooltip, Legend);

const Page = () => {
  const data: ChartData<'line'> = {
    labels: ['2024/1/1', '2024/2/1', '2024/3/1', '2024/4/1', '2024/5/1', '2024/6/1'],
    datasets: [
      {
        label: 'スコア',
        data: [75, 80, 85, 90, 88, 92],
        borderColor: '#555555',
        backgroundColor: '#6C69FF',
        pointBackgroundColor: '#6C69FF',
        pointBorderColor: '#FFFFFF',
        borderWidth: 2,
        pointRadius: 7,
        pointHoverRadius: 9,
        tension: 0.3,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#FFFFFF',
        titleColor: '#333',
        bodyColor: '#555',
        borderColor: '#6C69FF',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: '日付',
          font: {
            size: 14,
          },
          color: '#333',
        },
        grid: {
          display: false,
        },
        ticks: {
          font: {
            weight: 'bold',
            size: 20,
          },
          color: '#333',
        },
      },
      y: {
        title: {
          display: true,
          text: 'スコア',
          font: {
            size: 14,
          },
          color: '#333',
        },
        min: 0,  // y軸の最小値を設定
        max: 100,  // y軸の最大値を設定
        grid: {
          color: '#e0e0e0',
        },
        ticks: {
          font: {
            weight: 'bold',
            size: 20,
          },
          color: '#333',
        },
      },
    },
  };

  const radarData: ChartData<'radar'> = {
    labels: ['傾聴力', '質問力', 'FBスキル', '共感力', 'モチベーション付与', 'コーチングスキル', '教育スキル', '分析力', 'インスピレーション', 'ビジョン形成'],
    datasets: [
      {
        label: '今回',
        data: [6, 8, 7, 9, 6, 7, 8, 5, 8, 7],
        borderColor: '#555555',
        borderWidth: 2,
        pointBackgroundColor: [
          '#F6684E', '#F6684E', '#F6684E',
          '#FFA629', '#FFA629',
          '#FFCD29', '#FFCD29',
          '#14AE5C', '#0D99FF', '#0D99FF',
        ],
        pointBorderColor: '#FFFFFF',
        pointHoverBackgroundColor: '#FFFFFF',
        pointHoverBorderColor: '#6C69FF',
        pointRadius: (ctx) => ctx.raw === Math.max(...(ctx.chart.data.datasets[0].data as number[])) ? 15 : 6,
        pointStyle: (ctx) => ctx.raw === Math.max(...(ctx.chart.data.datasets[0].data as number[])) ? 'rectRot' : 'circle',
        pointHoverRadius: 15,
      },
      {
        label: '前回',
        data: [4, 6, 5, 7, 4, 6, 7, 3, 7, 6],
        borderColor: '#555555',
        borderDash: [5, 5],
        borderWidth: 2,
        pointBackgroundColor: [
          '#F6684E', '#F6684E', '#F6684E',
          '#FFA629', '#FFA629',
          '#FFCD29', '#FFCD29',
          '#14AE5C', '#0D99FF', '#0D99FF',
        ],
        pointBorderColor: '#FFFFFF',
        pointHoverBackgroundColor: '#FFFFFF',
        pointHoverBorderColor: '#6C69FF',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const radarOptions: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        backgroundColor: '#FFFFFF',
        titleColor: '#333',
        bodyColor: '#555',
        borderColor: '#6C69FF',
        borderWidth: 1,
      },
    },
    scales: {
      r: {
        angleLines: {
          color: '#e0e0e0',
        },
        grid: {
          color: '#e0e0e0',
        },
        pointLabels: {
          color: (ctx: ScriptableScalePointLabelContext) => {
            const colors = [
              '#F6684E', '#F6684E', '#F6684E',
              '#FFA629', '#FFA629',
              '#FFCD29', '#FFCD29',
              '#14AE5C', '#0D99FF', '#0D99FF',
            ];
            return colors[ctx.index];
          },
          font: {
            weight: 'bold',
            size: 20,
          },
        },
        ticks: {
          min: 0 as any,  // レーダーチャートの最小値を設定
          max: 10 as any,  // レーダーチャートの最大値を設定
          color: '#333',
          font: {
            weight: 'bold',
            size: 15,
          },
        } as any,  // 型エラーを避けるためのキャスト
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen p-8 bg-gray-50">
      <div className='text-4xl py-5 font-semibold'>山田花子さんのスキルマップ</div>
      <div className='flex flex-col lg:flex-row justify-between mb-8'>
        <div className='text-xl py-5 text-center lg:text-left'>山田太郎さんとの1on1ミーティング</div>
        <div className='text-md text-center lg:text-right'>作成日: 2024/1/1</div>
      </div>
      <div className='flex flex-col lg:flex-row items-center bg-white shadow-lg rounded-lg'>
        <div className='w-full lg:w-1/2 p-10 border-b lg:border-b-0 lg:border-r-2 border-gray-300'>
          <div className='bg-[#6C69FF] w-full py-2 rounded-full text-center text-white text-lg font-medium'>
            メンティーからの主観的FB
          </div>
          <div className="mt-8 h-96">
            <Line data={data} options={options} />
          </div>
          <div className="mt-8 h-96">
            <Radar data={radarData} options={radarOptions} />
          </div>
        </div>
        <div className='w-full lg:w-1/2 p-10'>
          <div className='bg-[#6C69FF] w-full py-2 rounded-full text-center text-white text-lg font-medium'>
            AIからの客観的FB
          </div>
          <div className="mt-8 h-96">
            <Line data={data} options={options} />
          </div>
          <div className="mt-8 h-96">
            <Radar data={radarData} options={radarOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
