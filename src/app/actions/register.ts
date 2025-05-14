'use server';

import { z } from 'zod';
import { RegisterSchema } from '@/app/utils/schemas';
import pool from '@/app/lib/db'
import bcrypt from 'bcryptjs'
import { error } from 'console';
// ユーザー登録処理を行うサーバーアクション
// values: クライアントから送信された登録フォームのデータ
export const RegisterServer = async (
    values: z.infer<typeof RegisterSchema>
) => {
    // Zodスキーマを使用して入力値のバリデーションを実行
    //safeParse は、Zod というバリデーションライブラリのメソッド 安全検証
    const validatedFields = RegisterSchema.safeParse(values);
    console.log(validatedFields.data); // デバッグ用：検証済みデータのログ出力

    // バリデーションが失敗した場合　!〜でない場合
    if (!validatedFields.success) {
        return { error: '入力内容を修正してください' };
    }

    const { email, password } = validatedFields.data;
    // パスワードをハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    let connection;

    try {
        //データベース接続
        connection = await pool.getConnection();
        // メールアドレスの重複をチェック mysql2ライブラリのexecute関数です
        const [existingUsers] = await connection.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        ) as [any[], any];

        if (existingUsers.length > 0) {
            return { error: 'このメールアドレスは既に登録されています' }
        }

        // ユーザーをデータベースに登録
        await connection.execute(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, hashedPassword]
        );

        return { success: 'アカウントを登録しました' }
    } catch (error) {
        console.error('ユーザー登録エラー:', error);
        return { error: 'エラーが発生しました' }
    } finally {
        if (connection) {
            connection.release();
        }
    }
}
