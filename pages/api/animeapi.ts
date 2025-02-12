import { NextApiRequest, NextApiResponse } from 'next';
import {AnnictData,MyAnimeList,MergedAnime} from '../../types/animeNewsData';
export default async function handler(_: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // CORSを許可
    try {
        const [animelistResponse, malResponse] = await Promise.all([
            fetch('https://api.annict.com/v1/works?filter_season=2025-winter', {
                headers: {
                    Authorization: 'Bearer uAO0NzXFpEm2LIju5dOsAawTmF8WpAZMNnUhr5W2cvo'
                }
            }),
            fetch('https://api.myanimelist.net/v2/anime/season/2025/winter?limit=500', {
                headers: {
                    'X-MAL-CLIENT-ID': 'e55c98155081d66f467a7d9a2c39f5ed'
                }
            })
        ]);

        if (!animelistResponse.ok || !malResponse.ok) {
            throw new Error('APIリクエストに失敗しました');
        }

        const animeData: AnnictData[] = await animelistResponse.json();
        const myanimeData: MyAnimeList[] = await malResponse.json();

        // AnnictとMALのデータを統合
        const mergedData: MergedAnime[] = animeData.map((anime) => {
            const matchtitle = myanimeData.find((mytitle) => anime.title_en === mytitle.title);
            return {
                title: anime.title_en,
                images: matchtitle ? matchtitle.main_picture.medium : "",
                url: anime.official_site_url || ""
            };
        });

        res.status(200).json({ annict: mergedData, mal: myanimeData });
        console.log({ annict: mergedData, mal: myanimeData }); // 統合後のデータをコンソールに表示
    } catch (error) {
        console.error("API統合エラー:", error);
        res.status(500).json({ error: "データ取得に失敗しました" });
    }
}
