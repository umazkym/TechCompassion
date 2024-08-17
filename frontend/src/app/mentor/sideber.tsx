"use client";

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const navItems = [
    { href: '/mentor/home', title: 'Home', icon: 'material-symbols:home', label: 'Home' },
    { href: '/mentor/1on1', title: '1on1', icon: 'material-symbols:mic', label: '1on1' },
    { href: '/mentor/score', title: 'Score', icon: 'mdi:chart-bar', label: 'Score' },
    { href: '/mentor/history', title: 'History', icon: 'mdi:history', label: 'History' },
    { href: '/mentor/mentee', title: 'Mentee', icon: 'mdi:account-outline', label: 'Mentee' },
];

function Sidebar() {
    const pathname = usePathname();

    return (
        <div className={clsx(
            "bg-[#D9D9D9] text-white min-h-screen p-4",
            "w-16 sm:w-20 md:w-24 lg:w-32",  // 幅を画面サイズに応じて調整
            "hidden sm:flex flex-col"  // 小さい画面では非表示、sm以上で表示
        )}>
            <ul>
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <li className="mb-4 flex flex-col items-center" key={item.href}>
                            <Link href={item.href} title={item.title} className="flex flex-col items-center">
                                <div className={clsx(
                                    "flex items-center justify-center rounded-full",
                                    isActive ? "bg-[#555555]" : "bg-white",  // アクティブ状態の背景色
                                    "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"  // アイコンのサイズを画面サイズに応じて調整
                                )}>
                                    <Icon
                                        icon={item.icon}
                                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"  // アイコンのサイズを調整
                                        style={{ color: isActive ? '#ffffff' : '#555555' }}  // アイコンの色を設定
                                    />
                                </div>
                                <div className="block text-center mt-2 text-black text-xs sm:text-sm md:text-base">
                                    {item.label}
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Sidebar;
