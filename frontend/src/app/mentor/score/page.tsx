"use client";

import React, { useEffect, useState } from 'react';
import { Line, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Title, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Title, Tooltip, Legend, CategoryScale, LinearScale);

// スキルマップデータの型を定義
interface SkillMapData {
    mentor_id: number;
    name: string;
    mentoring_id: number;
    mtg_date: number; // UNIXタイムスタンプ
    listening_score: number;
    questioning_score: number;
    feedbacking_score: number;
    empathizing_score: number;
    motivating_score: number;
    coaching_score: number;
    teaching_score: number;
    analyzing_score: number;
    inspiration_score: number;
    vision_score: number;
    total_score: number;
    mentee_feedback_flg: boolean;
}

const Page = () => {
    const [skillMapData, setSkillMapData] = useState<SkillMapData[]>([]);
    const [currentPage, setCurrentPage] = useState(0);

    // ページ読み込み時にスキルマップデータを取得
    useEffect(() => {
        const fetchSkillMapData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/mentor/1/skillmap/1');
                const data: SkillMapData[] = await response.json();
                setSkillMapData(data);
                setCurrentPage(data.length - 1);  // 最新データを表示するために設定
            } catch (error) {
                console.error('スキルマップデータの取得に失敗しました:', error);
            }
        };
    
        fetchSkillMapData();
    }, []);

    // 時系列のラベル（mtg_dateを使用）
    const labels = skillMapData.map(item => 
        new Date(item.mtg_date).toLocaleDateString('ja-JP')
    ).reverse();  // データを逆転

    // 総スコアの時系列データ
    const totalScores = skillMapData.map(item => item.total_score).reverse();  // データを逆転

    // 折れ線グラフのデータ設定
    const lineData = {
        labels: labels,
        datasets: [
            {
                label: '総スコア',
                data: totalScores,
                borderColor: '#555555',
                backgroundColor: '#6C69FF',
                pointBackgroundColor: totalScores.map((_, index) =>
                    index === currentPage ? '#FF0000' : '#6C69FF' // 現在ページを赤色で強調
                ),
                pointBorderColor: '#FFFFFF',
                borderWidth: 2,
                pointRadius: totalScores.map((_, index) =>
                    index === currentPage ? 10 : 7 // 現在ページのプロットを拡大
                ),
                pointHoverRadius: totalScores.map((_, index) =>
                    index === currentPage ? 12 : 9 // ホバー時のプロットを調整
                ),
                tension: 0,  // 曲線を無効に設定
            },
        ],
    };
    
    // レーダーチャート用のデータ設定
    const radarData = {
        labels: [
            '傾聴力', '質問力', 'FBスキル', '共感力',
            'モチベーション付与', 'コーチングスキル', '教育スキル',
            '分析力', 'インスピレーション', 'ビジョン形成'
        ],
        datasets: skillMapData.length > 0 ? [
            {
                label: '主観的FB',
                data: [
                    skillMapData[skillMapData.length - 1 - currentPage].listening_score, 
                    skillMapData[skillMapData.length - 1 - currentPage].questioning_score, 
                    skillMapData[skillMapData.length - 1 - currentPage].feedbacking_score,
                    skillMapData[skillMapData.length - 1 - currentPage].empathizing_score, 
                    skillMapData[skillMapData.length - 1 - currentPage].motivating_score, 
                    skillMapData[skillMapData.length - 1 - currentPage].coaching_score,
                    skillMapData[skillMapData.length - 1 - currentPage].teaching_score, 
                    skillMapData[skillMapData.length - 1 - currentPage].analyzing_score, 
                    skillMapData[skillMapData.length - 1 - currentPage].inspiration_score,
                    skillMapData[skillMapData.length - 1 - currentPage].vision_score
                ],
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
                pointRadius: (ctx: any) => ctx.raw === Math.max(...(ctx.dataset.data as number[])) ? 15 : 6,
                pointStyle: (ctx: any) => ctx.raw === Math.max(...(ctx.dataset.data as number[])) ? 'rectRot' : 'circle',
                pointHoverRadius: 15,
            },
        ] : [],
    };

    const radarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
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
                min: 0, // レーダーチャートの最小値を設定
                max: 10, // レーダーチャートの最大値を設定
                ticks: {
                    stepSize: 1, // 目盛の間隔を設定
                    beginAtZero: true, // 0から始める
                    color: '#333',
                    font: {
                        weight: 'bold' as const,
                        size: 15,
                    },
                },
                angleLines: {
                    color: '#e0e0e0',
                },
                grid: {
                    color: '#e0e0e0',
                },
                pointLabels: {
                    font: {
                        weight: 'bold' as const,
                        size: 20,
                    },
                    color: (ctx: any) => {
                        const colors = [
                            '#F6684E', '#F6684E', '#F6684E',
                            '#FFA629', '#FFA629',
                            '#FFCD29', '#FFCD29',
                            '#14AE5C', '#0D99FF', '#0D99FF',
                        ];
                        return colors[ctx.index];
                    },
                },
            },
        },
    };

    const lineOptions = {
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
                        weight: 'bold' as const,
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
                min: 0,
                max: 100,
                grid: {
                    color: '#e0e0e0',
                },
                ticks: {
                    font: {
                        weight: 'bold' as const,
                        size: 20,
                    },
                    color: '#333',
                },
            },
        },
    };

    // ページ移動時の処理
    const handleNextPage = () => {
        if (currentPage < skillMapData.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="flex flex-col min-h-screen p-8 bg-gray-50">
            <div className='text-4xl py-5 font-semibold'>スキルマップ</div>
            <div className='flex flex-col lg:flex-row items-center bg-white shadow-lg rounded-lg mb-8'>
                <div className='w-full lg:w-1/2 p-10 border-b lg:border-b-0 lg:border-r-2 border-gray-300'>
                    <div className='bg-[#6C69FF] w-full py-2 rounded-full text-center text-white text-lg font-medium'>
                        メンティーからの主観的FB
                    </div>
                    <div className="mt-8 h-96">
                        <Line data={lineData} options={lineOptions} />
                    </div>
                    <div className="text-center text-2xl font-semibold mt-4">
                        対象メンティー: {skillMapData[currentPage]?.name || "未選択"}
                    </div>

                    <div className="mt-8 h-96">
                        <Radar data={radarData} options={radarOptions} />
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
                            disabled={currentPage >= skillMapData.length - 1}
                            className='px-4 py-2 mx-2 bg-gray-300 rounded-lg disabled:opacity-50'
                        >
                            次 &gt;
                        </button>
                    </div>
                </div>
                <div className='w-full lg:w-1/2 p-10'>
                    <div className='bg-[#6C69FF] w-full py-2 rounded-full text-center text-white text-lg font-medium'>
                        AIからの客観的FB
                    </div>
                    <div className="mt-8 h-96">
    <Line
        data={{
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
        }}
        options={lineOptions}
    />
</div>

<div className="m-12" style={{ height: '44px' }}></div>

<div className="mt-8 h-96">
    <Radar
        data={{
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
                    pointRadius: (ctx: any) => ctx.raw === Math.max(...(ctx.chart.data.datasets[0].data as number[])) ? 15 : 6,
                    pointStyle: (ctx: any) => ctx.raw === Math.max(...(ctx.chart.data.datasets[0].data as number[])) ? 'rectRot' : 'circle',
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
        }}
        options={radarOptions}
    />
</div>

                </div>
            </div>
        </div>
    );
};

export default Page;
