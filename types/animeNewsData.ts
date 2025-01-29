export type AnimeNewsData = {
    title: string;
    // desc: string;
    // timeline: string;
    // views: number;
    // link: string;
    // id: string; // 記事の一意なID
    uploadedAt: string; // アップロード日時
    // topics: string[]; // トピックの配列
    // preview: {
    //   intro: string; // 簡易プレビュー
    // full: string; // 完全プレビュー
    // };
    thumbnail: string; // サムネイル画像のURL
    // thumbnailHash: string; // サムネイル画像のハッシュ値
    url: string; // 記事のURL
};

export type SeasonAnimeDate = {
    title_en: string;
    images: {
        facebook: {
            og_image_url: string;
        };
        twitter: {
            image_url: string;
            mini_avatar_url?: string;
            normal_avatar_url?: string;
            bigger_avatar_url?: string;
            original_avatar_url?: string;
        };
    };
    official_site_url: string;
}
