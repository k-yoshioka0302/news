'use client';

import React from 'react';
import Header from './components/ui/Header';
import AnimeSection from './features/anime/AnimeSection';
import NewsSection from './features/News/NewsSection';


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
