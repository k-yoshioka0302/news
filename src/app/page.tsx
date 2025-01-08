'use client';
import React from 'react';
import { AnimeNewsData } from '../../types/animeNewsData';
import Image from 'next/image';
import { Bell, User, Search } from 'lucide-react';
import './styles.scss';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

//スクロールバー機能ロジック
const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useEffect(() => {
        console.log(`Active index updated: ${activeIndex}`);
    }, [activeIndex]);

    const navItems = [
        'TRENDING',
        'LATEST NEWS',
        'TV ANIME',
        'MANGA',
        'MOVIE',
        'VOICE ACTOR',
        'VTuber',
        'その他2',
        'その他3'
    ];

    return (
        <div className="sidebar-list">
            {navItems.map((item, index) => (
                <motion.a
                    key={index}
                    href="#"
                    className={`list-item nav-item ${
                        activeIndex === index ? 'active' : ''
                    }`}
                    onClick={(e) => {
                        e.preventDefault();
                        setActiveIndex(index); // クリックされた項目のインデックスを設定
                    }}
                    whileTap={{ scale: 0.95 }}
                    // whileHover={{ scale: 1.05 }}
                >
                    {item}
                </motion.a>
            ))}
        </div>
    );
};

//NewsCard コンポーネント
const NewsCard = ({ title, uploadedAt, thumbnail, url }: AnimeNewsData) => {
    return (
        <div className="news-card">
            <div className="card-thumb">
                <Image
                    src={thumbnail}
                    alt="news-card-thumb"
                    width={9999}
                    height={9999}
                />
            </div>
            <a className="card-text" href={url}>
                <h2 className="card-headline">{title}</h2>
            </a>
            <div className="card-footer">
                <div className="card-timeline">{uploadedAt}</div>
            </div>
        </div>
    );
};

//api叩いてる
export default function Home() {
    const [dummyData, setDummyData] = useState<AnimeNewsData[]>([]); // データを管理

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                'https://anime-ashy-ten.vercel.app/news/ann/recent-feeds'
            );
            const data: AnimeNewsData[] = await response.json();
            setDummyData(data); // データを状態に設定
        };

        fetchData();
    }, []); // コンポーネントのマウント時にデータを取得

    return (
        <>
            <header className="header">
                <div className="header-headline">
                    <h1 className="headline-text">AnimeNews</h1>
                    <ul className="header-nav">
                        <li className="header-navlist">
                            <div className="search-box">
                                <label htmlFor="search-input">
                                    <Search />
                                </label>
                                <input
                                    type="text"
                                    className="search-input"
                                    id="search-input"
                                    placeholder="ニュースを検索..."
                                />
                            </div>
                        </li>
                        <li className="header-navlist">
                            <Bell />
                        </li>
                        <li className="header-navlist">
                            <User />
                        </li>
                    </ul>
                </div>

                <section>
                    <div className="sidevar">
                        <nav className="nav-container">
                            <Sidebar />
                        </nav>
                    </div>
                </section>
            </header>

            <main>
                <div className="display">
                    <section className="top-news section">
                        <a href="">
                            <div className="top-image">
                                <img src="./image copy 2.png" alt="" />
                            </div>
                        </a>
                        <h2 className="news-tit section-tit">TRENDING NEWS</h2>
                        <div className="news-card-list">
                            {dummyData.map((data, index) => (
                                <NewsCard
                                    key={index}
                                    title={data.title}
                                    uploadedAt={data.uploadedAt}
                                    url={data.url}
                                    thumbnail={data.thumbnail}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}
