import React, {Component} from 'react';
import {getSongList, throttle} from "../MusicPlayer/axioMusicList";

class Musicdemo extends Component {

    musicTimeUpdate = throttle(()=>{
        let audio = this.audio
        console.log(audio.currentTime)
        // this.setState({linePosition: audio.currentTime / audio.duration * timeLineWidth})
    },1000)


    render() {
        return (
            <div>
                <audio controls src={'http://localhost:3000/api2/song/media/outer/url?id=33894312.mp3'} ref={c => this.audio = c}  onTimeUpdate={this.musicTimeUpdate}/>
            </div>
        );
    }
}

export default Musicdemo;