import React, {Component} from 'react';

class TimeLine extends Component {

    state = {
        startPosition:0,
        moveFlag:false,
    }

    clickChange = (e)=>{
        // console.log(e.nativeEvent.offsetX);
        // console.log(this.finishTime.offsetWidth);
        const {audio,finishTimeChange} = this.props
        let clickOffsetX = e.nativeEvent.offsetX
        let totalLineWidth = this.timeLine.offsetWidth
        let newTime = clickOffsetX / totalLineWidth * audio.duration;
        audio.currentTime = newTime
        audio.play();
        finishTimeChange(clickOffsetX)

    }

    componentDidMount() {
        console.log(this)
        window.addEventListener('mousemove',ev => this.dragMove(ev) )
        window.addEventListener('mouseup',()=>this.setState({moveFlag:false}) )
    }

    dragMove = throttle((e)=>{
        const {audio,finishTimeChange} = this.props
        if (!this.state.moveFlag)return
        if (e.target === this.timeLine.parentElement) {
            let newPosition = e.clientX / window.outerWidth * 2
            console.log(this.timeLine.parentElement.offsetWidth, e.target.clientX)
        }
        // let newTime = e.clientX / window.outerWidth * audio.duration
        // audio.currentTime = newTime
        // finishTimeChange(newPosition)
    },150)

    dragStart = (e)=>{
        this.setState({moveFlag:true})
    }


    render() {
        const {finishTime} = this.props
        return (
            <div className={'timeLine'}
                 ref={c => this.timeLine = c}
                 onClick={event => this.clickChange(event)}
                >
                <div className={'finishTime'} style={{width:finishTime+'px'}}>
                    <div className={'point'}  onMouseDown={event => this.dragStart(event)}
                    />
                </div>
            </div>
        );
    }
}


function throttle(func, wait) {
    var previous = 0;
    console.log(func)
    return function() {
        let now = Date.now();
        let context = this;
        let args = arguments;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    }
}

export default TimeLine;