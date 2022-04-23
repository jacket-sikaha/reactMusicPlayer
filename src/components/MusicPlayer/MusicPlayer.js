import React, {Component} from 'react';
import "./MusicPlayer.css"
import {
    CaretRightOutlined,
    FastBackwardOutlined,
    FastForwardOutlined,
    PauseOutlined,
    ReloadOutlined,
    RetweetOutlined,
} from '@ant-design/icons';
import {getSongList, throttle, curWwwPath} from "./axioMusicList";
import axios from "axios";
import store from "../../redux/store";
import {getSongListAciton, nextMusicAciton, preMusicAciton} from "../../redux/MusicAction";
import PubSub from 'pubsub-js'



class MusicPlayer extends Component {

     constructor(props) {
        super(props)

        this.state = {
            linePosition: 0,//每次实际渲染的滚动条位置
            startDragX: 0,//拖拽初始位置
            lastPosition: 0,//上一次渲染完成的滚动条位置
            musicStatus: true,//音乐的播放状态对应按钮表示
            moveFlag: false,//拖拽的判断条件
            clickTime: true, //避免点击事件触发条件

            audioCanplay:false,//歌曲是否加载完成/能否加载
        }

    }



    //开始播放
    playMusic = ()=>{

        let {duration } = this.audio
        console.log(duration)
        if (!duration || this.state.audioCanplay){
            this.setState({musicStatus:true})
            return
        }
        console.dir(this.audio)
        this.audio.play().then(r => this.setState({musicStatus:false}))
    }
    //暂停播放
    pauseMusic = ()=>{
        let {duration} = this.audio
        if (!duration){
            this.setState({musicStatus:true})
            return
        }
        this.audio.pause()
        this.setState({musicStatus:true})
    }
    //重新播放
    musicReload = ()=>{
        let {duration} = this.audio
        if (!duration){
            this.setState({musicStatus:true})
            return
        }
        this.audio.load()
        this.setState({musicStatus:false,linePosition:0,lastPosition:0})
    }
    //点击调整位置
    clickChange = (e)=>{
        // console.log(e.nativeEvent.offsetX);
        // console.log(this.linePosition.offsetWidth);
        const {timeLineWidth,moveFlag} = this.state
        let audio = this.audio
        if (moveFlag || !audio.duration )return
        let clickOffsetX = e.nativeEvent.offsetX
        let newTime = Math.floor(clickOffsetX / timeLineWidth * audio.duration);
        audio.currentTime = newTime
        // console.log('new', timeLineWidth)
        //lastPosition 对于点击拖拽混合使用情况，lastPosition也是需要记录准备避免点击之后拖动出现抖动问题
        this.setState({linePosition:clickOffsetX,lastPosition:clickOffsetX})

    }

    //对于window事件绑定，react需要这种写法
    componentDidMount() {
        this.token = PubSub.subscribe('DoubleClick',this.handleDoubleClick)
        this.NextMusic = PubSub.subscribe('FootPreMusicClick',this.preMusic)
        this.PreMusic = PubSub.subscribe('FootNextMusicClick',this.nextMusic)


        window.addEventListener('mousemove',ev => this.dragMove(ev) )
        window.addEventListener('mouseup',this.dragEnd )
        // this.forceUpdate()
        //promise对象里的数据只能通过then方法获取
        getSongList().then(value => {
            let totalData ={
                songList: value,
                musicPosition:0,
            }
            console.log(value)
            store.dispatch(getSongListAciton(totalData))
        })
        this.setState({timeLineWidth:this.timeLine.offsetWidth})
    }

    componentWillUnmount() {
         //组件卸载时记得取消订阅，避免状态泄露
         PubSub.unsubscribe(this.token)
         PubSub.unsubscribe(this.NextMusic)
         PubSub.unsubscribe(this.PreMusic)
    }

    //拖拽调整位置
    dragMove = throttle((e)=>{
        const {startDragX,lastPosition,timeLineWidth,moveFlag} = this.state
        if (!moveFlag )return
        let totalLineWidth = timeLineWidth
        let newPosition = (e.clientX - startDragX) + lastPosition

        newPosition >= 0 && newPosition <= totalLineWidth &&
        this.setState({linePosition:newPosition})

    },100)

    dragStart = (e)=>{
        let {duration} = this.audio
        if (!duration){
            this.setState({musicStatus:true})
            return
        }
        this.setState({moveFlag:true,startDragX:e.clientX})
    }


    dragEnd =
        (e)=>{
        const {linePosition,timeLineWidth,moveFlag} = this.state
        let audio = this.audio
        //只有确保只有move事件才能触发，避免与click事件冲突
        if (!moveFlag || !audio.duration)return
        audio.currentTime = (Math.floor(linePosition / timeLineWidth * audio.duration))
        this.setState({moveFlag:false,lastPosition:linePosition})
    }

    //音乐正常播放
    musicTimeUpdate = throttle(()=>{
        const {timeLineWidth,moveFlag} = this.state
        if (moveFlag)return
        let audio = this.audio
        this.setState({linePosition: audio.currentTime / audio.duration * timeLineWidth})
    },1000)

    //播放结束回到原点
    musicEnd = ()=>{
        let {duration} = this.audio
        if (!duration){
            this.setState({musicStatus:true})
            return
        }
        // this.audio.load()
        this.setState({musicStatus:true,linePosition:0,lastPosition:0})
     }
    //
    // componentDidMount() {
    //     //组件渲染顺序问题，会导致有些参数对象传递出现问题，强制刷新解决
    //     this.forceUpdate()
    // }

    test = ()=>{
        axios.get(`${curWwwPath}api1/logout`).then(
            res =>console.log(res)
        )
    }

    preMusic = (msg,data)=>{
         //未用redux代码
        // let {musicPosition} = this.state;
        // const {songList} = store.getState()
        // let listLength = songList.length
        // musicPosition--
        // if (musicPosition === -1)musicPosition = listLength - 1
        // let {name,artists,url,pic} = songList[musicPosition]
        // this.props.handleMusicchange({name,artists})
        // this.setState({musicPosition,audioUrl:url,musicStatus:true,pic})
        // new Promise((resolve, reject)=>resolve(()=>this.musicEnd())).then(()=>this.playMusic())

        store.dispatch(preMusicAciton( store.getState()))
        let {songList,musicPosition} = store.getState()
        let {name,artists} = songList[musicPosition]
        this.props.handleMusicchange({name,artists})
        this.musicEnd()
    }

    nextMusic = (msg,data)=>{
        //未用redux代码
        // let {musicPosition} = this.state;
        // const {songList} = store.getState()
        // let listLength = songList.length
        // musicPosition++
        // if (musicPosition === listLength){musicPosition = 0}
        // let {name,artists,url,pic} = songList[musicPosition]
        // this.props.handleMusicchange({name,artists})
        // this.setState({musicPosition,audioUrl:url,musicStatus:true,pic})
        // new Promise((resolve, reject)=>resolve(()=>this.musicEnd())).then(()=>this.playMusic())

        store.dispatch(nextMusicAciton( store.getState()))
        const {songList,musicPosition} = store.getState()
        let {name,artists} = songList[musicPosition]
        this.props.handleMusicchange({name,artists})
        this.musicEnd()
    }

    handleDoubleClick = (msg,data)=>{
        console.log(msg)
        this.musicEnd()
    }

    musicChangeStart = (msg,data)=>{
        console.log(1)
        this.setState({musicCanplay:true})
        // const {songList,musicPosition} = store.getState()
        // let {fee} = songList[musicPosition]
        // if (fee === 0 || fee === 8)this.playMusic()
        // this.playMusic()
    }

    musicCanplay = (msg,data)=>{
        console.log(2)
        if (this.state.musicCanplay)this.playMusic()
        this.setState({musicCanplay:false})
    }


    render() {
        const {linePosition,musicStatus} = this.state
        let audioUrl,pic;
        if (!store.getState()){
            audioUrl=''
            pic=''
        }else {
            const {songList,musicPosition}  = store.getState()
            audioUrl = songList[musicPosition].url
            pic=songList[musicPosition].pic
            // console.log(musicPosition)
        }

        return (
            <div className={'PlayerLayout'}>
                {/*<audio src={'http://localhost:3000/api2/song/media/outer/url?id=33894312.mp3 '} ref={c => this.audio = c}*/}
                <audio src={audioUrl} ref={c => this.audio = c}
                       onEnded={this.musicEnd} onTimeUpdate={this.musicTimeUpdate}
                       onEmptied={event => this.musicChangeStart(event)} //每次切歌都会触发,且触发时机在onLoadedData之前
                       onLoadedData={event => this.musicCanplay(event)} //只有能加载的歌才会触发
                preload={'auto'} />

                <div className={'img'}><img src={pic}  /></div>
                {/*<button onClick={this.test}>ss</button>*/}
                <div className={'MusicPlayer'}  >
                    <div className={'buttonList'}>
                        <ReloadOutlined style={{ fontSize: '20px' }} onClick={this.musicReload}/>
                         <FastBackwardOutlined style={{ fontSize: '20px' }}
                         onClick={this.preMusic}/>
                        {
                            musicStatus ?
                                <CaretRightOutlined style={{ fontSize: '20px' }} onClick={this.playMusic}/>
                                :<PauseOutlined style={{ fontSize: '20px' }} onClick={this.pauseMusic}/>
                        }
                        <FastForwardOutlined style={{ fontSize: '20px' }}
                        onClick={this.nextMusic}/>
                        <RetweetOutlined style={{ fontSize: '20px' }}/>
                    </div>
                    {/*<TimeLine linePosition={linePosition} audio={this.audio} linePositionChange={this.linePositionChange}/>*/}
                    <div className={'timeLine'}
                         ref={c => this.timeLine = c}
                         onClick={event => this.clickChange(event)}
                    >
                        <div className={'linePosition'} style={{width:linePosition+'px'}}>
                            <div className={'point'}  onMouseDown={event => this.dragStart(event)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MusicPlayer;