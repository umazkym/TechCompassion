"use client";

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const navItems = [
    { href: '/menter/home', title: 'Home', icon: 'material-symbols:home', label: 'Home' },
    { href: '/menter/1on1', title: '1on1', icon: 'material-symbols:mic', label: '1on1' },
    { href: '/menter/score', title: 'Score', icon: 'mdi:chart-bar', label: 'Score' },
    { href: '/menter/history', title: 'History', icon: 'mdi:history', label: 'History' },
    { href: '/menter/mentee', title: 'Mentee', icon: 'mdi:account-outline', label: 'Mentee' },
];

function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-24 bg-[#D9D9D9] text-white min-h-screen p-4">
            <ul>
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <li className="mb-4 flex flex-col items-center" key={item.href}>
                            <Link href={item.href} title={item.title} className="flex flex-col items-center">
                                <div className={clsx(
                                    "flex items-center justify-center rounded-full",
                                    isActive ? "bg-[#555555]" : "bg-white",
                                    "w-16 h-16" // 固定の幅と高さを指定して円を保持
                                )}>
                                    <Icon
                                        icon={item.icon}
                                        className="w-10 h-10" // アイコンのサイズを指定
                                        style={{ color: isActive ? '#ffffff' : '#555555' }} // 非アクティブ時のアイコン色を変更
                                    />
                                </div>
                                <div className="block text-center mt-2 text-black">{item.label}</div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Sidebar;
