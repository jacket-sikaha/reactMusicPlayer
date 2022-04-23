
//1. 该文件是用于创建一个为MusicPlayer组件服务的reducer，reducer本质是一个函数
//2. reducer函数会接收两个参数，分别是：之前的状态(preState)，动作对象(action)


import store from "./store";

const initState = {}
export default function musicReducer(preState=initState,action) {
    //从action对象获取type，data
    const {type,data} = action
    //根据type决定如何加工数据
    // console.log(action,preState)
    switch (type) {
        case 'prev':{
            let {songList,musicPosition} = preState
            let listLength = songList.length
            musicPosition--
            if (musicPosition === -1)musicPosition = listLength - 1
            return {...preState,musicPosition}
        }
        case 'next':{
            let {songList,musicPosition} = preState
            let listLength = songList.length
            musicPosition++
            if (musicPosition === listLength){musicPosition = 0}
            return {songList,musicPosition}
        }
        case 'change':{
            let {songList,id} = data
            let newMusicPosition;
            for (let i = 0; i <songList.length; i++) {
                if (songList[i].id === id){
                    newMusicPosition = i
                    return {...preState,musicPosition:newMusicPosition}
                }
            }
            return {...preState}
        }
        default:
            return data
    }

}