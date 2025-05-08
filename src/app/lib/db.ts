const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'yoshiokakazuteru', // 適切なユーザー名
    password: 'Jy52968451', // 適切なパスワード
    database: 'registerdatabase' ,// 適切なデータベース名
    port : 3000,
});

//データベース接続テスト
async function testConnection() {
    try {
        const connection = await pool.getConnection(); // 接続を取得
        console.log('データベース接続成功');
        connection.release(); // 接続を解放
    } catch (error) {
        console.error('データベース接続エラー:', error);
    }
}

testConnection();


export default pool;



