'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MergedAnime } from '@/app/types/animeNewsData';
import './components/SeasonAnimeCard.scss';

const SeasonAnimeCard = () => {
    const [animelist, setAnimelist] = useState<MergedAnime[]>([]);

    useEffect(() => {
        const fetchSeasonAnimeData = async () => {
            try {
                const response = await fetch("/api/integratedData");
                const data = await response.json();

                if (data.error) {
                    throw new Error(data.error);
                }

                setAnimelist(data);
            } catch (error) {
                console.error("統合データ取得エラー:", error);
            }
        };

        fetchSeasonAnimeData();
    }, []);

    return (
        <ul className="season-anime-list">
            {animelist.map((anime) => (
                <li key={anime.title} className="season-anime">
                    <a
                        href={anime.url}
                        className="season-anime-url"
                    >
                        <div className="card-img">
                            <Image
                                src={anime.images}
                                alt={`${anime.title}の画像`}
                                width={1082}
                                height={568}
                            />
                        </div>
                        <p className="season-anime-title">
                            {anime.title}
                        </p>
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default SeasonAnimeCard;
