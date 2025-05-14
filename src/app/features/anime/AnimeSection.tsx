'use client'
import React from 'react';
import SeasonAnimeCard from './components/SeasonAnimeCard';
import './AnimeSection.scss';

const AnimeSection = () => {
    return (
        <section className="season-anime">
            <a key="#" href="#">
                <div className="top-image">
                    <img src="image copy 2.png" alt="トップアニメ画像" />
                </div>
            </a>
            <h2 className="season-anime-top">新作・今期のアニメ</h2>
            <button className="season-anime-button-left"></button>
            <SeasonAnimeCard />
            <button className="season-anime-button-right"></button>
        </section>
    );
};

export default AnimeSection;
