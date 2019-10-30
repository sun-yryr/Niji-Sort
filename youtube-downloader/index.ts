import mariadb from 'mariadb'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config();
import moment from 'moment'
import fs from 'fs'

const pool = mariadb.createPool({
    host: 'localhost',
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME,
    connectionLimit: 5
});

/* ただチャンネルidを取得するため */
async function getChannelId(primaryId: number): Promise<any> {
    let conn;
    let rows;
    try {
        conn = await pool.getConnection();
        rows = await conn.query(`SELECT * FROM InputChannels WHERE id = ${primaryId}`);
        // rows: [ {val: 1}, meta: ... ]
        //log_write(rows.length)
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release(); //release to pool
    }
    return rows.length !== 0 ? rows[0] : "";
}

/* チャンネル情報の取得 */
async function getChannelData(channelId: string, group: string) {
    let tmp = "items(id,snippet(title,publishedAt,description,thumbnails(medium),tags))";
    const options = {
        url: "https://www.googleapis.com/youtube/v3/channels",
        qs: {
            key: process.env.YOUTUBEKEY,
            id: channelId,
            part: "snippet,statistics",
            fields: "items(id,snippet(title,description,publishedAt,thumbnails(medium)),statistics)"
        }
    }
    const res = await axios.get(options.url, {
        params: options.qs
    });
    let body = res.data.items[0];
    body.statistics.subscriberCount = body.statistics.hiddenSubscriberCount ? 0 : body.statistics.subscriberCount;
    const { id, snippet, statistics } = body;
    log_write(`channelTitle: ${snippet.title}`);
    let conn;
    try {
        conn = await pool.getConnection();
        // チャンネルが既に存在するか確認する
        let rows = await conn.query(`SELECT channelId FROM Channels WHERE channelId = '${id}'`);
        let q: string;
        if (rows.length !== 0) {
            // 存在する
            q = `UPDATE Channels SET viewCount = ${statistics.viewCount}, subscriberCount = ${statistics.subscriberCount}, videoCount = ${statistics.videoCount} groupName = '${group}'  WHERE channelId = '${id}'`;
        } else {
            // チャンネル情報をdbに入れる
            q = `INSERT INTO Channels VALUES ( '${id}', '${oreore_mysql_escape(snippet.title)}', '${oreore_mysql_escape(snippet.description)}', '${snippet.thumbnails.medium.url}', '${snippet.publishedAt}'`;
            q += `, ${statistics.viewCount}, ${statistics.subscriberCount}, ${statistics.videoCount}, '${group}' )`;
        }
        rows = await conn.query(q);
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release(); //release to pool
    }
}

/* チャンネル動画の取得 */
async function getChannelVideos(channelId: string, nextPageToken: string): Promise<any> {
    const options = {
        url: "https://www.googleapis.com/youtube/v3/search",
        qs: {
            key: process.env.YOUTUBEKEY,
            channelId: channelId,
            type: "video",
            order: "date",
            part: "id",
            fields: "nextPageToken,items(id)",
            maxResults: 50,
            pageToken: nextPageToken === "" ? null : nextPageToken
        }
    }
    const res = await axios.get(options.url, {
        params: options.qs
    });
    return res.data
}

/* video情報を取得して，DBに代入 */
async function getVideoDataAndInsert(videoids: string, channelId: string, group: string) {
    const options = {
        url: "https://www.googleapis.com/youtube/v3/videos",
        qs: {
            key: process.env.YOUTUBEKEY,
            id: videoids,
            part: "snippet,statistics",
            fields: "items(id,snippet(title,description,publishedAt,thumbnails(medium),tags),statistics)"
        }
    }
    const res = await axios.get(options.url, {
        params: options.qs
    });
    let conn: any;
    try {
        conn = await pool.getConnection();
        // video情報をdbに入れる
        for(let item of res.data.items) {
            const { id, snippet } = item;
            let statistics = item.statistics;
            let likeCountRate: number | null = parseInt(statistics.likeCount) / (parseInt(statistics.likeCount) + parseInt(statistics.dislikeCount));
            let tags: string = "";
            if (Array.isArray(snippet.tags)) {
                tags = snippet.tags.join(",");
            }
            
            // statistics の undefined チェック
            statistics.likeCount = (statistics.likeCount !== undefined) ? statistics.likeCount : null;
            statistics.dislikeCount = (statistics.dislikeCount !== undefined) ? statistics.dislikeCount : null;
            statistics.viewCount = (statistics.viewCount !== undefined) ? statistics.viewCount : null;
            likeCountRate = isNaN(likeCountRate) ? null : likeCountRate;

            let rows = await conn.query(`SELECT * FROM Videos WHERE id = '${id}'`);
            let q: string;
            if (rows.length !== 0) {
                q = `UPDATE Videos SET likeCount = ${statistics.likeCount}, dislikeCount = ${statistics.dislikeCount}, commentCount = ${statistics.commentCount}`;
                q += `, viewCount = ${statistics.viewCount}, likeCountRate = ${likeCountRate} WHERE id = '${id}';`
            } else {
                q = `INSERT INTO Videos VALUES ( '${id}', '${channelId}', '${oreore_mysql_escape(snippet.title)}', '${oreore_mysql_escape(snippet.description)}', '${snippet.thumbnails.medium.url}', '${snippet.publishedAt}'`;
                q += `, ${statistics.likeCount}, ${statistics.dislikeCount}, ${statistics.commentCount}, ${statistics.viewCount}, ${likeCountRate}`;
                q += `, '${oreore_mysql_escape(tags)}', '${group}' )`;
            }
            conn.query(q)
                .then((e: any) => {
                    console.log(e);
                });
        }
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release(); //release to pool
    }
}


/* sleep */
function sleep(sec: number) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), sec*1000);
    });
}

/* sql escape */
function oreore_mysql_escape(query: string): string {
    return query.replace(/\'/g, "\\'");
}

function log_write(message: string) {
    console.log(message);
    const now = moment().format();
    fs.appendFile("./log.txt", `${now} - ${message}\n`, () => console.log("written"));
}

async function main() {
    /* 順番にチャンネルidを取得していく */
    let id: string;
    let index = 1;
    let quote_counter = 0;
    let max_quote = 15000;
    while(true) {
        log_write(`${quote_counter}`);
        const res = await getChannelId(index);
        if (res === "") {
            index = 1;
            continue;
        } else index += 1;
        const { channelId, groupName } = res;
        log_write(`Start  channelId: ${channelId}`);


        if (quote_counter + 5 > max_quote) {
            log_write("wait 24 hours");
            await sleep(24 * 60 * 60);  // 24時間待機
            quote_counter = 0;
        }
        await getChannelData(channelId, groupName);
        quote_counter += 5;


        let nextPageToken = "";
        do {
            if (quote_counter + 100 > max_quote) {
                log_write("wait 24 hours");
                await sleep(24 * 60 * 60);  // 24時間待機
                quote_counter = 0;
            }
            const res_videoIds = await getChannelVideos(channelId, nextPageToken);
            quote_counter += 100;
            nextPageToken = res_videoIds.nextPageToken;
            const ids: string = res_videoIds.items.map((item: any) => item.id.videoId).join(",");
            // log_write(`ids = [${ids}]`);
            if (res_videoIds.items.length * 5 + quote_counter > max_quote) {
                log_write("wait 24 hours");
                await sleep(24 * 60 * 60);
                quote_counter = 0;
            }
            getVideoDataAndInsert(ids, channelId, groupName);
            quote_counter += res_videoIds.items.length * 5;
        } while(nextPageToken != null);
        log_write("download finish");
        await sleep(10); // 10秒
    }
}
main();
