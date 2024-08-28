"use client";

import React, { useEffect, useState } from 'react';
import { Line, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Title, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Title, Tooltip, Legend, CategoryScale, LinearScale);

interface SkillMapData {
    mentor_id: number;
    name: string;
    mentoring_id: number;
    mtg_date: string;
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
    const [aiSkillMapData, setAiSkillMapData] = useState<SkillMapData[]>([]);
    const [currentPage, setCurrentPage] = useState(0);

    const colors = [
        '#F6684E', '#F6684E', '#F6684E',
        '#FFA629', '#FFA629',
        '#FFCD29', '#FFCD29',
        '#14AE5C', '#0D99FF', '#0D99FF',
    ];

    useEffect(() => {
        const fetchSkillMapData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/mentor/1/skillmap/1`);
                const data: SkillMapData[] = await response.json();
                setSkillMapData(data.reverse());
                setCurrentPage(0);
            } catch (error) {
                console.error('Failed to fetch skill map data:', error);
            }
        };

        const fetchAiSkillMapData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/mentor/1/skillmap/0`);
                const data: SkillMapData[] = await response.json();
                setAiSkillMapData(data.reverse());
            } catch (error) {
                console.error('Failed to fetch AI skill map data:', error);
            }
        };

        fetchSkillMapData();
        fetchAiSkillMapData();
    }, []);

    const labels = skillMapData.map(item => 
        new Date(item.mtg_date).toLocaleDateString('ja-JP')
    );

    const aiLabels = aiSkillMapData.map(item => 
        new Date(item.mtg_date).toLocaleDateString('ja-JP')
    );

    const totalScores = skillMapData.map(item => item.total_score);
    const aiTotalScores = aiSkillMapData.map(item => item.total_score);

    const lineData = {
        labels,
        datasets: [
            {
                label: '総スコア',
                data: totalScores,
                borderColor: '#555555',
                backgroundColor: '#6C69FF',
                pointBackgroundColor: totalScores.map((_, index) =>
                    index === currentPage ? '#FF0000' : '#6C69FF'
                ),
                pointBorderColor: '#FFFFFF',
                borderWidth: 2,
                pointRadius: totalScores.map((_, index) =>
                    index === currentPage ? 10 : 7
                ),
                pointHoverRadius: totalScores.map((_, index) =>
                    index === currentPage ? 12 : 9
                ),
                tension: 0,
            },
        ],
    };

    const aiLineData = {
        labels: aiLabels,
        datasets: [
            {
                label: 'AIスコア',
                data: aiTotalScores,
                borderColor: '#555555',
                backgroundColor: '#6C69FF',
                pointBackgroundColor: aiTotalScores.map((_, index) =>
                    index === currentPage ? '#FF4500' : '#6C69FF'
                ),
                pointBorderColor: '#FFFFFF',
                borderWidth: 2,
                pointRadius: aiTotalScores.map((_, index) =>
                    index === currentPage ? 10 : 7
                ),
                pointHoverRadius: aiTotalScores.map((_, index) =>
                    index === currentPage ? 12 : 9
                ),
                tension: 0,
            },
        ],
    };

    const radarData = {
        labels: [
            '傾聴力', '質問力', 'FBスキル', '共感力',
            'モチベーション付与', 'コーチングスキル', '教育スキル',
            '分析力', 'インスピレーション', 'ビジョン形成'
        ],
        datasets: skillMapData.length > 0 ? [
            {
                label: 'メンティーのFB',
                data: [
                    skillMapData[currentPage].listening_score, 
                    skillMapData[currentPage].questioning_score, 
                    skillMapData[currentPage].feedbacking_score,
                    skillMapData[currentPage].empathizing_score, 
                    skillMapData[currentPage].motivating_score, 
                    skillMapData[currentPage].coaching_score,
                    skillMapData[currentPage].teaching_score, 
                    skillMapData[currentPage].analyzing_score, 
                    skillMapData[currentPage].inspiration_score,
                    skillMapData[currentPage].vision_score
                ],
                borderColor: '#555555',
                borderWidth: 2,
                pointBackgroundColor: colors,
                pointBorderColor: '#FFFFFF',
                pointHoverBackgroundColor: '#FFFFFF',
                pointHoverBorderColor: '#6C69FF',
                pointRadius: (ctx: any) => ctx.raw === Math.max(...(ctx.dataset.data as number[])) ? 15 : 6,
                pointStyle: (ctx: any) => ctx.raw === Math.max(...(ctx.dataset.data as number[])) ? 'rectRot' : 'circle',
                pointHoverRadius: 15,
            },
        ] : [],
    };

    const aiRadarData = {
        labels: radarData.labels,
        datasets: aiSkillMapData.length > 0 ? [
            {
                label: 'AIのFB',
                data: [
                    aiSkillMapData[currentPage].listening_score, 
                    aiSkillMapData[currentPage].questioning_score, 
                    aiSkillMapData[currentPage].feedbacking_score,
                    aiSkillMapData[currentPage].empathizing_score, 
                    aiSkillMapData[currentPage].motivating_score, 
                    aiSkillMapData[currentPage].coaching_score,
                    aiSkillMapData[currentPage].teaching_score, 
                    aiSkillMapData[currentPage].analyzing_score, 
                    aiSkillMapData[currentPage].inspiration_score,
                    aiSkillMapData[currentPage].vision_score
                ],
                borderColor: '#555555',
                borderWidth: 2,
                pointBackgroundColor: colors,
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
                min: 0,
                max: 10,
                ticks: {
                    stepSize: 1,
                    beginAtZero: true,
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
                    color: (ctx: any) => colors[ctx.index],
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

    const handleNextPage = () => {
        if (currentPage < skillMapData.length - 1 && currentPage < aiSkillMapData.length - 1) {
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
            <div className="text-4xl py-5 font-semibold">スキルマップ</div>
            <div className="flex flex-col lg:flex-row items-center bg-white shadow-lg rounded-lg mb-8">
                <div className="w-full lg:w-1/2 p-10 border-b lg:border-b-0 lg:border-r-2 border-gray-300">
                    <div className="bg-[#6C69FF] w-full py-2 rounded-full text-center text-white text-lg font-medium">
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
                </div>
                <div className="w-full lg:w-1/2 p-10">
                    <div className="bg-[#FF69B4] w-full py-2 rounded-full text-center text-white text-lg font-medium">
                        AIからの客観的FB
                    </div>
                    <div className="mt-8 h-96">
                        <Line data={aiLineData} options={lineOptions} />
                    </div>
                    <div className="text-center text-2xl font-semibold mt-4">
                        対象メンティー: {aiSkillMapData[currentPage]?.name || "未選択"}
                    </div>
                    <div className="mt-8 h-96">
                        <Radar data={aiRadarData} options={radarOptions} />
                    </div>
                </div>
            </div>
            <div className="flex justify-center pt-5">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                    className="px-4 py-2 mx-2 bg-gray-300 rounded-lg disabled:opacity-50"
                >
                    &lt; 前
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage >= skillMapData.length - 1 || currentPage >= aiSkillMapData.length - 1}
                    className="px-4 py-2 mx-2 bg-gray-300 rounded-lg disabled:opacity-50"
                >
                    次 &gt;
                </button>
            </div>
        </div>
    );
};

export default Page;