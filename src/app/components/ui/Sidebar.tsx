'use client';
import './Sidebar.scss';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

//スクロールバー機能ロジック
const Sidebar = () => {
    //型定義: number | null（数値またはnull）
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    //useEffectは非同期処理のよなもの,React の副作用を処理するためのフックです。
    useEffect(() => {
        console.log(`Active index updated: ${activeIndex}`);
    }, [activeIndex]);

    //index 0〜9　、itemは''
    const navItems = [
        'トレンド',
        'アニメ',
        'マンガ',
        '映画',
        '声優',
        'VTuber',
        'その他2',
        'その他3'
    ];

    return (
        <div className="sidebar-list">
            {navItems.map((item, index) => (
                <motion.div
                    key={index}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e : any) => {
                        e.preventDefault();
                        setActiveIndex(index);
                    }}
                    className={`list-item  ${activeIndex === index ? 'active' : ''}`}
                >
                    <a href="#" className='list-item-tagu'>{item}</a>
                </motion.div>
            ))}
        </div>
    );
};

export default Sidebar;