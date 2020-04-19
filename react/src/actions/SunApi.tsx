import axios from 'axios';
// Types
import { Channel } from '../types';

const SERVER_URL = 'https://ytsort.sun-yryr.com/api';

export async function getChannelsList(): Promise<Channel[] | null> {
    const requestUrl = `${SERVER_URL}/list/channels`;
    const res = await axios.get(requestUrl)
        // FIX: ちゃんとハンドリングしましょう
        .catch(() => null);
    return res ? res.data as Channel[] : res;
}


type getVideosListParams = {
    channel?: string
    group?: string
}
/**
 *
 * @param {Object} option channelIdが指定されている → channelの動画一覧
 *                        groupIdが指定されている → groupの動画一覧を取得
 *                        何も指定されていない → 全動画データの取得
 *                        [まだ] queryが指定されている → キーワード検索
 * @return {Object | null} 受け取ったデータ
 */
export async function getVideosList(option: getVideosListParams) {
    let requestUrl;
    if (option.channel) {
        requestUrl = `${SERVER_URL}/videos/channel/${option.channel}`;
    } else if (option.group) {
        requestUrl = `${SERVER_URL}/videos/group/${option.group}`;
    } else {
        requestUrl = `${SERVER_URL}/videos/all`;
    }
    // console.log(`URL = ${request_url}`);
    const res = await axios.get(requestUrl)
        // FIX: ちゃんとハンドリングしましょう
        .catch(() => null);
    return res ? res.data : null;
}


export async function getGroupsList() {
    const requestUrl = `${SERVER_URL}/list/groups`;
    const res = await axios.get(requestUrl)
        // FIX: ちゃんとハンドリングしましょう
        .catch(() => null);
    return res ? res.data : null;
}


function strLength(strSrc) {
    let len = 0;
    const escapedStr = escape(strSrc);
    for (let i = 0; i < escapedStr.length; i += 1, len += 1) {
        if (escapedStr.charAt(i) === '%') {
            i += 1;
            if (escapedStr.charAt(i) === 'u') {
                i += 3;
                len += 1;
            }
            i += 1;
        }
    }
    return len;
}

export function multByteStringSlice(str, strLimit) {
    let isSlice = false;
    let slicedStr: string = '';

    while (strLength(str) > strLimit) {
        slicedStr = str.slice(0, str.length - 1);
        isSlice = true;
    }

    if (isSlice) {
        slicedStr += '...';
    }

    return slicedStr;
}
