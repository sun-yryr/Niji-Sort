import axios from 'axios';

const SERVER_URL = "https://ytsort.sun-yryr.com/api";

export async function getChannelsList() {
    const request_url = SERVER_URL + "/list/channels";
    const res = await axios.get(request_url)
        .catch(e => {
            console.log(e);
            return null;
        });
    return res ? res.data : null;
}

/**
 * 
 * @param {Object} option channelIdが指定されている → channelの動画一覧
 *                        groupIdが指定されている → groupの動画一覧を取得
 *                        何も指定されていない → 全動画データの取得
 *                        [まだ] queryが指定されている → キーワード検索
 * @return {Object | null} 受け取ったデータ
 */
export async function getVideosList(option) {
    let request_url;
    if (option.channel) {
        request_url = SERVER_URL + `/videos/channel/${option.channel}`;
    } else if (option.group) {
        request_url = SERVER_URL + `/videos/group/${option.group}`;
    } else {
        request_url = SERVER_URL + `/videos/all`;
    }
    //console.log(`URL = ${request_url}`);
    const res = await axios.get(request_url)
        .catch(e => {
            console.log(e);
            return null;
        });
    return res ? res.data : null;
}


export async function getGroupsList() {
    const request_url = SERVER_URL + "/list/groups";
    const res = await axios.get(request_url)
        .catch(e => {
            console.log(e);
            return null;
        });
    return res ? res.data : null;
}


function strLength( strSrc ){
	let len = 0;
	strSrc = escape(strSrc);
	for(let i = 0; i < strSrc.length; i++, len++){
		if(strSrc.charAt(i) === "%"){
			if(strSrc.charAt(++i) === "u"){
				i += 3;
				len++;
			}
			i++;
		}
	}
	return len;
}

export function multByteStringSlice( str , strLimit ){
	
	var isSlice = false;

	while( strLength(str) > strLimit ){
		str = str.slice(0, str.length-1);
		isSlice = true;
	}

	if( isSlice ){
		str += '...';
	}

	return str;
}