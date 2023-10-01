import Network from './network'

/* // 省略花括号时,箭头函数会自动将表达式的结果作为函数的返回值; 所以，这个函数等价于以下形式:
export const getBanner = () => {
    return Network.get('/banner', {})
} */

export const getBanner = () => Network.get('/banner?type=2')
export const getPersonalized = () => Network.get('/personalized?limit=6')
export const getNewAlbum = () => Network.get('/album/newest')
export const getNewSongs = () => Network.get('/personalized/newsong')
export const getPlayList = (data) => Network.get('/playlist/detail', data)
export const getAlbum = (data) => Network.get('/album', data)
export const getSongDetail = (data) => Network.get('/song/detail', data)
export const getSongLyric = (data) => Network.get('/lyric', data)
export const getSongUrl = (data) => Network.get('/song/url', data)
export const getArtistsSongs = (data) => Network.get('artists', data)
export const getHotArtists = () => {
    return new Promise((resolve, reject) => {
        Network.get('/top/artists?offset=0&limit=5').then(result => {
            resolve(result.artists)
        }).catch(err => {
            reject(err)
        })
    })
}
export const getLetterArtists = (letter) => {
    return new Promise((resolve, reject) => {
        const letterArtists = []
        Network.all([
            Network.get(`artist/list?offset=0&limit=10&initial=${letter}`)
        ]).then(result => {
            result.forEach(function (item) {
                letterArtists.push(...item.artists)
            })
            resolve(letterArtists)
        }).catch(err => {
            reject(err)
        })
    })
}
export const getAllArtists = () => {
    return new Promise((resolve, reject) => {
        const keys = ['热']
        const list = [getHotArtists()]
        for (let i = 65; i < 91; i++) {
            const char = String.fromCharCode(i)
            keys.push(char)
            list.push(getLetterArtists(char))
        }
        Network.all(list).then(result => {
            const obj = {}
            obj.keys = keys
            obj.list = result
            resolve(obj)
        }).catch(err => {
            reject(err)
        })
    })
}
export const getTopListDetail = () => {
    return new Promise((resolve, reject) => {
        const category = {
            officialList: [
                { name: '飙升榜', id: 3 },
                { name: '新歌榜', id: 0 },
                { name: '原创榜', id: 2 },
                { name: '热歌榜', id: 1 }
            ],
            recList: [
                { name: '云音乐说唱榜', id: 23 },
                { name: '云音乐电音榜', id: 25 },
                { name: '云音乐欧美新歌榜', id: 32 },
                { name: '云音乐ACG榜', id: 22 },
                { name: '云音乐古典榜', id: 24 },
                { name: '法国 NRJ Vos Hits 周榜', id: 19 }
            ],
            globalList: [
                { name: '美国Billboard榜', id: 6 },
                { name: 'UK排行榜周榜', id: 5 },
                { name: 'Beatport全球电子舞曲榜', id: 21 }
            ],
            otherList: [
                { name: 'KTV唛榜', id: 7 },
                { name: '云音乐摇滚榜', id: 27 },
                { name: '云音乐韩语榜', id: 28 },
                { name: '云音乐国电榜', id: 30 },
                { name: '云音乐欧美热歌榜', id: 31 },
                { name: '云音乐日语榜', id: 29 }
            ],
            titles: {
                officialList: '官方榜',
                recList: '推荐榜',
                globalList: '全球榜',
                otherList: '更多榜单'
            }
        }
        Network.get('toplist/detail').then(data => {
            data.list.forEach(obj => {
                let flag = false
                for (const key in category) {
                    for (let i = 0; i < category[key].length; i++) {
                        if (category[key][i].name === obj.name) {
                            category[key][i].rank = {}
                            category[key][i].rank.coverImgUrl = obj.coverImgUrl
                            category[key][i].rank.id = obj.id
                            category[key][i].rank.name = obj.name
                            category[key][i].rank.updateFrequency = obj.updateFrequency
                            if (obj.tracks.length !== 0) {
                                category[key][i].rank.tracks = obj.tracks
                            }
                            flag = true
                            break
                        }
                    }
                    if (flag) {
                        break
                    }
                }
            })
            resolve(category)
        }).catch(err => {
            reject(err)
        })
    })
}
export const getSearchList = (data) => Network.get('search?type=1', data)
export const getSearchHot = () => Network.get('search/hot')
