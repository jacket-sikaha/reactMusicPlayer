import React, {Component} from 'react';
import axios from "axios";
import {Input, Select} from 'antd';
const { Option } = Select;
const { Search } = Input;

class MusicSearch extends Component {
    state = {songList:[]}

    onSearch = (value) => {
        axios.get(
            //`http://www.huagecloud.top:8091/login/statusttps://tenapi.cn/wyylist/?id=${value}`,
            `http://localhost:4000/playlist/track/all?id=${value}`,
            {
                timeout:3000,
                withCredentials: true}
        )
            .then((res) =>{
                // let songList = res.data.result.tracks.map(value => {
                //     return {
                //         name:value.name,
                //         id:value.id,
                //         artists:value.artists,
                //         url: `https://music.163.com/song/media/outer/url?id=${value.id}.mp3`,
                //     }
                // })
                let songList = res.data.songs.map(value => {


                    return {
                        name:value.name,
                        id:value.id,
                        artists:value.ar.name,
                        fee:value.fee,
                        pic:value.al.picUrl,
                        url: `https://music.163.com/song/media/outer/url?id=${value.id}.mp3`,
                    }


                })
                console.log(songList)
                this.setState({songList})
            })
            .catch(error => console.log(error))
    }
    render() {
        return (
            <div>
                <Input.Group compact>
                    <Select defaultValue="songList">
                        <Option value="songList">歌单 ID</Option>
                        <Option value="song">歌曲 ID</Option>
                    </Select>
                    <Search style={{ width: '75%' }} enterButton allowClear placeholder="请输入"
                                 onSearch={this.onSearch}/>
                </Input.Group>
                {/*<audio  controls>*/}
                {/*    {this.state.songList.map(value =>*/}
                {/*        <source src={value.url} />*/}
                {/*    )}*/}
                {/*</audio>*/}


                {this.state.songList.map(value =>
                    <audio   src={value.url} controls/>
                )}
            </div>
        );
    }
}

export default MusicSearch;