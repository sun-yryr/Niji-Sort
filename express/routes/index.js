var express = require('express');
var router = express.Router();

var dotenv = require('dotenv');
dotenv.config();

const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: 'localhost',
     user: process.env.DBUSER,
     password: process.env.DBPASS,
     database: process.env.DBNAME,
     connectionLimit: 5
});

/*
    channelの検索 なくす
    channel一覧を取得                list/channels
    channelIdを指定して動画情報の取得   videos/channel/:Id
    -----------------
    グループ一覧を取得                 list/groups
    channel検索のオートコンプリート
    検索クエリによる動画情報の取得       videos?q
    グループの動画情報の取得            videos/group/:Id
*/

function oreore_mysql_escape(str) {
    return str.replace(/(["'`;])/g, `\\$1`);
}

/* チャンネル一覧の取得 */
router.get('/api/list/channels', async function (req, res, next) {
    // dbにアクセス，Channelsから情報を取得
    let conn;
    let rows;
    try {
        conn = await pool.getConnection();
        rows = await conn.query("SELECT * FROM Channels");
    } catch (err) {
        res.status = 400;
        res.json({Error: err});
        throw err;
    } finally {
        if (conn) conn.release(); //release to pool
        res.status = 200
        res.json(rows);
    }
});

router.get(/^\/api\/videos\/channel\/([^"'`;]{24,24})/, async function(req, res, next) {
    const channelId = req.params[0];
    // dbにアクセス，Channelsから情報を取得
    let conn;
    let rows;
    try {
        conn = await pool.getConnection();
        rows = await conn.query("SELECT * FROM Videos WHERE channelId = ?", channelId);
    } catch (err) {
        res.status = 400;
        res.json({Error: err});
        throw err;
    } finally {
        if (conn) conn.release(); //release to pool
        res.status = 200
        res.json(rows);
    }
});

/* グループ一覧を取得 */
router.get('/api/list/groups', async function(req, res, next) {
    // dbにアクセス, Groupsから情報を取得
    let conn;
    let rows;
    try {
        conn = await pool.getConnection();
        rows = await conn.query("SELECT groupName FROM Groups");
    } catch (err) {
        res.status = 400;
        res.json({Error: err});
        throw err;
    } finally {
        if (conn) conn.release(); //release to pool
        res.status = 200
        res.json(rows);
    }
});

router.get('/api/videos/group/:groupName', async function(req, res, next) {
    const groupName = oreore_mysql_escape(req.params.groupName);
    console.log(groupName);
    // dbにアクセス, Groupsから情報を取得
    let conn;
    let rows;
    try {
        conn = await pool.getConnection();
        rows = await conn.query(`SELECT id, channelId, title, thumbnailUrl, publishedAt, likeCount, dislikeCount, viewCount, commentCount, likeCountRate, groupName FROM Videos WHERE groupName = ?`, groupName);
    } catch (err) {
        res.status = 400;
        res.json({Error: err});
        throw err;
    } finally {
        if (conn) conn.release(); //release to pool
        res.status = 200
        res.json(rows);
    }
});
router.get('/api/videos/all', async function(req, res, next) {
    // dbにアクセス, 全ての情報を取得
    let conn;
    let rows;
    try {
        conn = await pool.getConnection();
        rows = await conn.query(`SELECT id, channelId, title, thumbnailUrl, publishedAt, likeCount, dislikeCount, viewCount, commentCount, likeCountRate, groupName FROM Videos`);
    } catch (err) {
        res.status = 400;
        res.json({Error: err});
        throw err;
    } finally {
        if (conn) conn.release(); //release to pool
        res.status = 200
        res.json(rows);
    }
});

module.exports = router;
