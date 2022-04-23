import React, {Component} from 'react';
import "./MusicHeader.css"
import {Button, Drawer, InputNumber, List, message, Popconfirm} from 'antd';
import {SearchOutlined} from "@ant-design/icons";
import PubSub from 'pubsub-js'
//引入store
import store from "../../redux/store";
import {changeMusicAciton, getSongListAciton} from "../../redux/MusicAction";
import axios from "axios";
import {curWwwPath} from "../MusicPlayer/axioMusicList"

class MusicHeader extends Component {

    state = { visible: false }

    // componentDidMount() {
    //     //检测redux中的状态变化，只要变化就调用render (只作用目前js所在组件)
    //     // store.subscribe(()=>{
    //     //     this.setState({})
    //     // })
    // }

    showDrawer = (data) => {
        this.setState({
            visible: true,
        });
    };

    onClose = (data) => {
        this.setState({
            visible: false,
        });
    };

    changePosition =(id)=>{
        return (e)=>{
            console.dir(e.target)
            console.log(id)
            const {songList,musicPosition} = store.getState()
            store.dispatch(changeMusicAciton({songList,musicPosition,id}))
            PubSub.publish('DoubleClick')
        }
    }

    confirm = (e) => {

        let newId = this.idInput
        if (newId === undefined || newId === null){
            message.error('输入异常')
            return 0;
        }
        return  new Promise((resolve, reject) => {
            axios.get(`${curWwwPath}api1/playlist/track/all?id=${newId}`)
                .then(value =>
                    value.data.songs.map(value => ({
                            name: value.name,
                            id: value.id,
                            artists: value.ar[0].name,
                            fee: value.fee,
                            pic: value.al.picUrl,
                            url: `${curWwwPath}api2/song/media/outer/url?id=${value.id}.mp3`,
                        })
                    )
                )
                .then(value => resolve(value))
                .catch(reason => reject('404'))
        })
            .then(value => {
                let totalData = {
                    songList: value,
                    musicPosition: 0,
                }
                store.dispatch(getSongListAciton(totalData))
            })
            .catch(reason => {
                console.log('error')
                message.error('请求异常')
            })

    }

    render() {
        let curtainMusic;
        let songList2;
        if (!store.getState()){
            songList2 = []
            curtainMusic = 0
        }else {
            const {songList,musicPosition} = store.getState()
            curtainMusic = songList[musicPosition].id
            songList2 = songList.map((val,index) => ({...val,index:index + 1}))
        }



        // console.log(store.getState())
        return (
            <div>
                <div className={'MusicHeader'}>
                    <span>Music</span>
                    <div className={'middleHeader'}>
                        <a href="">NEWS</a>
                        <a onClick={this.showDrawer}>MUSICLIST</a>
                        <a href="">RADIO</a>
                        <a href="">EVENT</a>
                    </div>
                    <SearchOutlined style={{ fontSize: '25px' }} />
                </div>

                {/*Drawer的嵌合在当前节点使用需要配合position，overflow使用，不然会溢出影响体验*/}
                {/*这里将其相对定位在整个播放器外层，自然继承其高度*/}
                <Drawer
                    title={
                        <div style={{display:"flex",justifyContent:"space-between"}}>Music List
                        <Popconfirm
                            title={
                                <InputNumber addonBefore="歌单Id:" min={1}
                                             size={"small"} controls={false}
                                             onChange={c => this.idInput = c}
                                             required={true}/>}
                            onConfirm={e => this.confirm(e)}
                            onVisibleChange={() => console.log('visible change')}
                        >
                            <Button type="primary" size={"small"}>切换歌单</Button>
                        </Popconfirm>
                    </div>
                    }
                    placement="right"
                    closable={false}
                    maskStyle={{ borderRadius:30+'px'}}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    getContainer={false}
                    style={{ position: 'absolute'}}
                >

                    <List
                        bordered
                        dataSource={ songList2 }
                        renderItem={(item) => (
                            <List.Item onDoubleClick={this.changePosition(item.id)}
                                       key={item.id}
                                       style={ curtainMusic === item.id ?{backgroundColor:"#c7ebff"}:{}}>
                                <List.Item.Meta
                                    avatar={<span>{item.index}</span>}
                                    title={<div style={{fontWeight:'bold'}}>{item.name}</div>}
                                />
                                <div style={{fontSize:12+'px'}}>{item.artists}</div>
                            </List.Item>
                        )}
                    />
                </Drawer>
            </div>
        );
    }
}

export default MusicHeader;