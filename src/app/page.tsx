import { AnimeNewsData } from '../../types/animeNewsData';

import Image from 'next/image';
import { Bell, User, Search, Eye } from 'lucide-react';
import './styles.scss';

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
                {/* <p className="card-desc">{preview.intro}</p> */}
            </a>
            <div className="card-footer">
                <div className="card-timeline">{uploadedAt}</div>
                {/* <div className="card-views">
                    <Eye />
                    <span className="text">{views}</span>
                </div> */}
            </div>
        </div>
    );
};

//api叩いてる
export default async function Home() {
    const dummyData: AnimeNewsData[] = await fetch(
        'https://anime-ashy-ten.vercel.app/news/ann/recent-feeds'
    ).then((res) => res.json());

    return (
        <>
            <header className="header">
                <div className="header-headline">
                    <div className="headline-hum">
                        <span className="line"></span>
                        <span className="line"></span>
                        <span className="line"></span>
                    </div>
                    <h1 className="headline-text">AnimeNews</h1>
                </div>
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

                <section>
                    <div className="sidevar">
                        <ul className="sidevar-list">
                            <li className="list-item">　トレンド</li>
                            <li className="list-item">新着情報</li>
                            <li className="list-item">TVアニメ</li>
                            <li className="list-item">映画</li>
                            <li className="list-item">声優</li>
                        </ul>
                    </div>
                </section>
            </header>

            <main>
                <div className="display">
                    <section className="top-news section">
                        <h2 className="news-tit section-tit">
                            今日のトップニュース
                        </h2>
                        <div className="news-card-list">
                            {dummyData.map((data, index) => (
                                <NewsCard
                                    key={index}
                                    title={data.title}
                                    uploadedAt={data.uploadedAt}
                                    // views={data.views}
                                    url={data.url}
                                    thumbnail={data.thumbnail} // 追加
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}
