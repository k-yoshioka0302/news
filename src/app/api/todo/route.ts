import { NextRequest, NextResponse } from 'next/server'; 
import pool from '@/app/lib/db';

export async function GET(request: NextRequest) {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM users');
        connection.release();
        
        return NextResponse.json({ 
            success: true,
            data: rows 
        }, { status: 200 });
        
    } catch (error) {
        console.error('データ取得エラー:', error);
        return NextResponse.json({ 
            success: false,
            message: 'データの取得に失敗しました' 
        }, { status: 500 });
    }
}



export async function POST(request: NextRequest) {
    try {
        const connection = await pool.getConnection();
        const { name, email, password } = await request.json();
        
        if (!name || !email || !password) {
            return NextResponse.json({ 
                success: false,
                message: '必須項目が不足しています' 
            }, { status: 400 });
        }
        
        const [result] = await connection.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
            [name, email, password]
        );
        connection.release();
        
        return NextResponse.json({ 
            success: true,
            data: result 
        }, { status: 201 });
        
    } catch (error) {
        console.error('データ登録エラー:', error);
        return NextResponse.json({ 
            success: false,
            message: 'データの登録に失敗しました' 
        }, { status: 500 });
    }
}

