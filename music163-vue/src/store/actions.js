import {
    SET_CURRENT_INDEX,
    SET_CURRENT_TIME,
    SET_DEL_SONG,
    SET_FAVORITE_LIST,
    SET_FAVORITE_SONG,
    SET_FULL_SCREEN,
    SET_HISTORY_LIST,
    SET_HISTORY_SONG,
    SET_IS_PLAYING,
    SET_LIST_PLAYER,
    SET_MINI_PLAYER,
    SET_MODE_TYPE,
    SET_SONG_DETAIL,
    SET_SONG_LYRIC
} from './mutation-type'
import { getSongDetail, getSongLyric, getSongUrl } from '../api/index'

export default {
    setFullScreen ({ commit }, flag) {
        commit(SET_FULL_SCREEN, flag)
    },
    setIsPlaying ({ commit }, flag) {
        commit(SET_IS_PLAYING, flag)
    },
    setListPlayer ({ commit }, flag) {
        commit(SET_LIST_PLAYER, flag)
    },
    setMiniPlayer ({ commit }, flag) {
        commit(SET_MINI_PLAYER, flag)
    },
    setModeType ({ commit }, flag) {
        commit(SET_MODE_TYPE, flag)
    },
    setSongsDetail: async function ({ commit }, ids) {
        const result = await getSongDetail({ ids: ids.join(',') })
        const urls = await getSongUrl({ id: ids.join(',') })
        const list = []
        result.songs.forEach(function (value, index) {
            const obj = {}
            obj.url = urls.data[index].url
            obj.name = value.name
            obj.id = value.id
            let singer = ''
            const { ar } = value
            ar.forEach(function (item, index) {
                if (index === 0) {
                    singer = item.name
                } else {
                    singer += '-' + item.name
                }
            })
            obj.singer = singer
            const { al } = value
            obj.picUrl = al.picUrl
            list.push(obj)
        })
        commit(SET_SONG_DETAIL, list)
    },
    async setSongLyric ({ commit }, id) {
        if (id) {
            const result = await getSongLyric({ id: id })
            const { lyric } = result.lrc
            const obj = parseLyric(lyric)
            commit(SET_SONG_LYRIC, obj)
        }
    },
    setDelSong ({ commit }, index) {
        commit(SET_DEL_SONG, index)
    },
    setCurrentIndex ({ commit }, index) {
        commit(SET_CURRENT_INDEX, index)
    },
    setCurrentTime ({ commit }, index) {
        commit(SET_CURRENT_TIME, index)
    },
    setFavoriteSong ({ commit }, index) {
        commit(SET_FAVORITE_SONG, index)
    },
    setFavoriteList ({ commit }, list) {
        commit(SET_FAVORITE_LIST, list)
    },
    setHistorySong ({ commit }, list) {
        commit(SET_HISTORY_SONG, list)
    },
    setHistoryList ({ commit }, list) {
        commit(SET_HISTORY_LIST, list)
    }
}
// 格式化歌词方法
function parseLyric (lrc) {
    const lyrics = lrc.split('\n')
    // [00:00.000] 作曲 : 林俊杰
    // 1.定义正则表达式提取[00:00.000]
    const reg1 = /\[\d*:\d*\.\d*]/g
    // 2.定义正则表达式提取 [00
    const reg2 = /\[\d*/i
    // 3.定义正则表达式提取 :00
    const reg3 = /:\d*/i
    // 4.定义对象保存处理好的歌词
    const lyricObj = {}
    lyrics.forEach(function (lyric) {
        // 1.提取时间
        let timeStr = lyric.match(reg1)
        if (!timeStr) { return }
        timeStr = timeStr[0]
        // 2.提取分钟
        const minStr = timeStr.match(reg2)[0].substr(1)
        // 3.提取秒钟
        const secondStr = timeStr.match(reg3)[0].substr(1)
        // 4.合并时间, 将分钟和秒钟都合并为秒钟
        const time = parseInt(minStr) * 60 + parseInt(secondStr)
        // 5.处理歌词
        // 6.保存数据
        lyricObj[time] = lyric.replace(reg1, '').trim()
    })
    return lyricObj
}
