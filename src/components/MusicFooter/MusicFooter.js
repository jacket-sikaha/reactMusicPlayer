import React, {Component} from 'react';
import "./MusicFooter.css"
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import store from "../../redux/store";
import {nextMusicAciton, preMusicAciton} from "../../redux/MusicAction";
import PubSub from "pubsub-js";


class MusicFooter extends Component {

    handleFootPreMusic = ()=>{
        PubSub.publish('FootPreMusicClick')
    }

    handleFootNextMusic = ()=>{
        PubSub.publish('FootNextMusicClick')
    }

    render() {
        return (
            <div className={'MusicFooter'}>
                <div className={'pre'} onClick={this.handleFootPreMusic}>
                   <LeftOutlined  style={{fontSize:25+'px'}} />PREV
                </div>
                <div className={'next'} onClick={this.handleFootNextMusic}>
                    NEXT<RightOutlined  style={{fontSize:25+'px'}}/>
                </div>
            </div>
        );
    }
}

export default MusicFooter;