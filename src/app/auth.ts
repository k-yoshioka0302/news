// NextAuthライブラリをインポートして、認証機能を利用できるようにする
import NextAuth, { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';

// NextAuthの設定をして、必要な関数を取得
export const { handlers, signIn, signOut, auth } = NextAuth({
    // 認証プロバイダーを設定する配列
    // 例えば、GoogleやGitHubのログインを追加したい場合、ここに設定を書く
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    basePath : "/api/auth",
    callbacks: {
        
    }
});

export const config: NextAuthConfig = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    basePath: '/api/auth',
    callbacks: {
        authorized({ request, auth }) {
            try {
                const { pathname } = request.nextUrl;
                // ログイン後のみ表示出来るページのパスを指定します。
                if (pathname === '/protected-page') return !!auth;
            } catch (err) {
                console.error(err);
            }
        },
        jwt({ token, trigger, session }) {
            if (trigger === 'update') token.name = session.user.name;
            return token;
        }
    }
};

