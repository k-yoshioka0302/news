'use client';
import React from 'react';
import Image from 'next/image';
import { AnimeNewsData } from '@/app/types/animeNewsData';
import './NewsCard.scss';

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

export default NewsCard;