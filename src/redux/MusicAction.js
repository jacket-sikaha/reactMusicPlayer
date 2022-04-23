//该文件专门为MusicPlayer组件生成action对象

// function getSongListAciton(data){
//     return {type:'get',data}
// }

//箭头简写，返回对象要用（）括起来
import store from "./store";

export const getSongListAciton = (data)=>{
    return {type:'init',data:data}
}

export const preMusicAciton = (data)=>{
    return {type:'prev',data:data}
}

export const nextMusicAciton = (data)=>{
    return {type:'next',data:data}
}

export const changeMusicAciton = (data)=>{
     return {type:'change',data}
}

