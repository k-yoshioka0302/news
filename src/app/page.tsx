'use client';
import React from 'react';
import Header from './components/ui/Header';
import AnimeSection from './features/anime/components/AnimeSection';
import NewsSection from './features/news/NewsSection';
import './styles/styles.scss';

export default function Home() {
    return (
        <>
            <Header />
            <main>
                <AnimeSection />
                <NewsSection />
            </main>
        </>
    );
}
