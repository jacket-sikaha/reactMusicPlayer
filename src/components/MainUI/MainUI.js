import React, {Component} from 'react';
import "./MainUI.css"
import MusicHeader from "../MusicHeader/MusicHeader";
import MusicContent from "../MusicContent/MusicContent";
import MusicFooter from "../MusicFooter/MusicFooter";

import {Button, InputNumber , Popconfirm,message} from 'antd';
import store from "../../redux/store";
import {getSongListAciton} from "../../redux/MusicAction";
import axios from "axios";


let testdata = [
    {
        artists:"海龟先生",
        fee:8,
        id:25731320,
        name:"男孩别哭",
        pic:"https://p1.music.126.net/g3iuiLZVhrr_RQjcbBm1ww==/109951166580938676.jpg",
        url:"http://localhost:3000/api2/song/media/outer/url?id=1907969476.mp3"
    },
    {
        name: 'Watching Me',
        id: 25888537,
        artists: 'Barcelona',
        fee: 0,
        pic: "https://p1.music.126.net/8thmNwwMp47UZCGIN5eS9w==/2568459162517758.jpg",
        url:"http://localhost:3000/api2/song/media/outer/url?id=25888537.mp3"
    },
    {
        name: 'Shivers', id: 1885131100, artists: 'Ed Sheeran', fee: 4,
        pic: "https://p1.music.126.net/kGSU7wbU2-Pd6kXr7ibrZQ==/109951166567793994.jpg",
        url: "http://localhost:3000/api2/song/media/outer/url?id=1885131100.mp3"
    },
    {
        name: 'remember', id: 1311347592, artists: 'Uru', fee: 8,
        pic: "https://p1.music.126.net/oGAFl40HQRJSnevq3j-DFg==/109951165050155419.jpg",
        url: "http://localhost:3000/api2/song/media/outer/url?id=1311347592.mp3"
    },
    {
        name: 'Natural', id: 1482101374, artists: 'Imagine Dragons', fee: 1,
        pic: "https://p1.music.126.net/HJKWfmGRVAUZ3tBUxSWPxQ==/109951165342769587.jpg"
        ,url: "http://localhost:3000/api2/song/media/outer/url?id=1482101374.mp3"
    }

]
class MainUi extends Component {
    constructor(props) {
        super(props)
        // let totalData ={
        //     songList: testdata,
        //     musicPosition:0,
        // }
        // store.dispatch(getSongListAciton(totalData))
    }



    render() {
        return (
            <div className={'mainBg'}>
                    <MusicHeader/>
                    <MusicContent/>
                    <MusicFooter/>
            </div>
        );
    }
}

export default MainUi;