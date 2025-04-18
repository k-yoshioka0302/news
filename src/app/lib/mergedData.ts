 //Annict,myanimelistを条件に応じてデータを統合させる処理
import {
    AnnictData,
    MyAnimeList,
    MergedAnime
} from '../types/animeNewsData';

type AnnictAnime = {
    title_en: string;
    official_site_url: string;
    // 他の必要なプロパティを追加
};


// この関数は2025年冬のアニメデータを2つのAPIから取得して統合する
export async function fetchData() {
    try {
        // MyAnimeList APIから2025年冬のアニメデータを取得（最大500件）
        const malResponse = await fetch(
            'https://api.myanimelist.net/v2/anime/season/2025/spring?limit=500',
            {
                headers: {
                    'X-MAL-CLIENT-ID': 'e55c98155081d66f467a7d9a2c39f5ed' // 認証用のID
                }
            }
        );

        // リクエストが失敗したらエラーを出す
        if (!malResponse.ok) {
            throw new Error('MyAnimeList APIのリクエストに失敗しました');
        }

        // データをJSON形式に変換して保存
        const myanimeData: MyAnimeList = await malResponse.json();

        // Annict APIのデータを貯める配列と、ページ管理用の変数を用意
        let allAnime: AnnictAnime[] = []; // 全アニメを貯める空の配列
        let page = 1; // 現在のページ番号（最初は1）
        let hasMoreData = true; // まだデータがあるかどうかのフラグ

        // データがなくなるまでページをめくりながら取得するループ
        while (hasMoreData) {
            // Annict APIにリクエスト（1ページ50件、ページ番号を指定）
            const annictResponse = await fetch(
                `https://api.annict.com/v1/works?filter_season=2025-spring&per_page=50&page=${page}`,
                {
                    headers: {
                        Authorization: 'Bearer uAO0NzXFpEm2LIju5dOsAawTmF8WpAZMNnUhr5W2cvo' // 認証用のトークン
                    }
                }
            );

            // リクエストが失敗したらエラーを出す
            if (!annictResponse.ok) {
                throw new Error('Annict APIのリクエストに失敗しました');
            }
            // データをJSON形式に変換
            const animeData: AnnictData = await annictResponse.json();
            // データが空ならループを終了、それ以外はデータを追加して次のページへ
            if (animeData.works.length === 0) {
                hasMoreData = false; // もうデータがないので終了
            } else {
                allAnime = allAnime.concat(animeData.works); // 新しいデータを追加
                page++; // 次のページへ進む
            }
        }

        // title_en と images が両方存在するデータだけをフィルタリングして統合
        const mergedData: MergedAnime[] = allAnime
            .filter((anime) => anime.title_en && anime.title_en.trim() !== '') // title_en が存在し、空でない
            .map((anime) => {
                const matchtitle = myanimeData.data.find(
                    (mytitle) => anime.title_en === mytitle.node.title
                );
                return {
                    title: anime.title_en,
                    images: matchtitle ? matchtitle.node.main_picture.medium : '',
                    url: anime.official_site_url || ''
                };
            })
            .filter((item) => item.images && item.images.trim() !== ''); // images が存在し、空でない

        // 統合したデータを返す
        return mergedData;

    } catch (error) {
        // エラーが起きたらコンソールに表示して、空の配列を返す
        console.error('Error fetching anime data:', error);
        return [];
    }
}