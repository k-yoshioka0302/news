'use client';
import React from 'react';
import { AnimeNewsData, SeasonAnimeDate } from '../../types/animeNewsData';
import Image from 'next/image';
import { Bell, User, Search } from 'lucide-react';
import './styles.scss';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

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
                    //条件 ? 条件が真の場合の値 : 条件が偽の場合の値
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
                    width={999}
                    height={999}
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

const SeasonAnimeCard = () => {
    const [seasonAnimeData, setSeasonAnimeData] = useState<SeasonAnimeDate[]>([]);
    // validHostsを削除しました
    // APIからデータを取得するためのuseEffectを追加
    useEffect(() => {
        const fetchSeasonAnimeData = async () => {
            try {
                const response = await fetch(
                    'https://api.annict.com/v1/works?filter_season=2025-winter',
                    {
                        headers: {
                            Authorization:
                                'Bearer uAO0NzXFpEm2LIju5dOsAawTmF8WpAZMNnUhr5W2cvo'
                        }
                    }
                );
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data); // 取得したデータをコンソールに表示
                // データの構造を確認
                if (data && Array.isArray(data.works)) {
                    setSeasonAnimeData(data.works); // 取得したデータを状態に設定
                } else {
                    console.error(
                        'Expected data.works to be an array, but got:',
                        data
                    );
                }
            } catch (error) {
                console.error('Error fetching season anime data:', error);
            }
        };

        fetchSeasonAnimeData();
    }, []); // 空の依存配列でコンポーネントのマウント時に実行

    // 新しい関数を追加
    const renderSeasonAnimeCards = (data: SeasonAnimeDate[]) => {
        // dataが配列であることを確認
        if (!Array.isArray(data)) {
            console.error('Expected data to be an array, but got:', data);
            return null; // データが配列でない場合は何も表示しない
        }

        console.log(data)

        return (
            <ul className="season-anime-list">
                {data.map((item, index) => (
                    <li key={index} className="season-anime">
                        <a
                            href={item.official_site_url}
                            className="season-anime-url"
                        >
                            <div className="card-img">
                                <Image
                                    src={
                                        item.images.facebook.og_image_url ||
                                        '/default_image_url.jpg'
                                    }
                                    alt={`${item.title_en}の画像`}
                                    width={1082}
                                    height={568}
                                />
                            </div>
                            <p className="season-anime-title">
                                {item.title_en}
                            </p>
                        </a>
                    </li>
                ))}
            </ul>
        );
    };

    return renderSeasonAnimeCards(seasonAnimeData); // データを表示
};

const SeasonAnime = () => {};

//api叩いてる
export default function Home() {
    const [dummyData, setDummyData] = useState<AnimeNewsData[]>([]); // データを管理
    //初期値は []（空の配列）,

    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await fetch(
                    'https://anime-ashy-ten.vercel.app/news/ann/recent-feeds'
                );
                const data: AnimeNewsData[] = await response.json();
                setDummyData(data); // データを状態に設定
            };
            fetchData();
        } catch (e) {
            console.error(e);
        }
    }, []);
    // コンポーネントのマウント時にデータを取得,依存配列と呼ばれます。空配列の場合、コンポーネントの初回レンダリング時のみ処理が実行されます。
    // 全体の流れ
    // コンポーネントが初めて画面に表示されるときに useEffect が実行されます。
    // useEffect 内で fetchData が呼び出されます。
    // fetchData が API からデータを取得し、そのデータを状態 (dummyData) に保存します。
    // 状態が更新されると、React が自動的にコンポーネントを再レンダリングします。

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
                <section className="season-anime">
                    {dummyData.length > 0 && (
                        <a key={0} href={dummyData[0].url}>
                            <div className="top-image">
                                <img src={dummyData[0].thumbnail} alt="" />
                            </div>
                        </a>
                    )}
                    <h2 className="season-anime-top">THIS SEASON'S ANIME</h2>
                    <button className="season-anime-button-left"></button>
                    <SeasonAnimeCard />
                    <button className="season-anime-button-right"></button>
                </section>

                <section className="top-news">
                    <div className="display">
                        <h3 className="news-tit section-tit">TRENDING NEWS</h3>
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
                    </div>
                </section>
            </main>
        </>
    );
}
