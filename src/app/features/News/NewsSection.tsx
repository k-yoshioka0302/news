'use client';
import React, { useState, useEffect } from 'react';
import NewsCard from './components/NewsCard';
import { AnimeNewsData } from '@/app/types/animeNewsData';
import './NewsSection.scss';

const NewsSection = () => {
    const [newsData, setNewsData] = useState<AnimeNewsData[]>([]);

    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await fetch(
                    'https://anime-ashy-ten.vercel.app/news/ann/recent-feeds'
                );
                const data: AnimeNewsData[] = await response.json();
                setNewsData(data);
            };
            fetchData();
        } catch (e) {
            console.error(e);
        }
    }, []);

    return (
        <section className="top-news">
            <div className="display">
                <h3 className="news-tit section-tit">TRENDING NEWS</h3>
                <div className="news-card-list">
                    {newsData.map((data, index) => (
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
    );
};

export default NewsSection;