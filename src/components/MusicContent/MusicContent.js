import React, {Component} from 'react';
import "./MusicContent.css"
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import {CommentOutlined, HeartOutlined, ShareAltOutlined} from "@ant-design/icons";
import {Drawer, List} from "antd";
import store from "../../redux/store";

class MusicContent extends Component {
    state ={
        name:'',
        artists:'',
    }
    handleMusicchange = (data)=>{
        this.setState({...data})
        console.log(this)
    }
    render() {
        let name;
        let artists;
        let description;
        if (!store.getState()){
            name = ''
            artists = ''
            description = ''
        }else {
            const {songList,musicPosition} = store.getState()
            name = songList[musicPosition].name
            artists = songList[musicPosition].artists
            description = songList[musicPosition].fee
        }

        return (
            <div className={'MusicContent'}>
                <h1>{name}</h1>
                <h3>{artists}</h3>
                <MusicPlayer handleMusicchange={this.handleMusicchange}/>
                <div className={'McBottom'}>

                    <div className={'subscribeList'}>
                        <HeartOutlined />
                        <CommentOutlined />
                        <ShareAltOutlined />
                    </div>
                    <div className={'description'}>
                        {description}
                    </div>
                </div>

            </div>
        );
    }
}

export default MusicContent;