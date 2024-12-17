import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json(
        Array.from({ length: 999 }, (_, index) => ({
            title: `人気アニメ「だいき」制作決定${index}`,
            desc: `だいきがキチガイという論文が発表され、世論が変わってきましたがたけるくんがうんちまんという新しい論文が発表されたため、だいきキチガイ論文は衰退の一途をたどっています。${index}`,
            timeline: "5分前",
            views: 1234,
            link: "https://google.com",
        }))
    );
}