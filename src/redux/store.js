//引入createStore，专门用于创建redux中最为核心的store对象
import {createStore} from "redux";
//引入为MusicPlayer组件服务的reducer
import musicReducer from "./MusicPlayer_reducer"

export default createStore(musicReducer)