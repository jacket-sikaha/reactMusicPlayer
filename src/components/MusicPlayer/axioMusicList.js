import axios from "axios";
axios.defaults.withCredentials = true
export const curWwwPath=window.document.location.href;
export function getSongList() {
   return new Promise((resolve, reject) => {
        loginCheck().then(value1 => {
                axios.get(`${curWwwPath}api1/playlist/track/all?id=24381616`,)
                    .then(value =>
                         value.data.songs.map(value => ({
                                name: value.name,
                                id: value.id,
                                artists: value.ar[0].name,
                                fee: value.fee === 0 || value.fee === 8 ? '免费或无版权':'不支持播放',
                                pic: value.al.picUrl,
                                url: `${curWwwPath}api2/song/media/outer/url?id=${value.id}.mp3`,
                            })
                        )
                    )
                .then(value => resolve(value))
            })
        })
       .catch(reason => console.log(reason))




    //初始化数据
    //let url = timestamp('${curWwwPath}api1/login/cellphone');
    // axios.get('${curWwwPath}api1/login/status').then(
    //     res =>{
    //         if (!res.data.account){
    //             console.log(res.data)
    //             return 'fail'
    //         }
    //             //promise返回一个非promise对象，默认调用成功，
    //         // 这里then方法返回的promise实例的值就是fail,状态就是成功
    //         else { return new Promise(() => {})}
    //     })
    //     .then(
    //         (res) =>{//因为是成功所以这里会获取到上一个then返回的值
    //             console.log(res)
    //             axios.post(url,{'phone':'15918186123','password':'h85504618'})
    //                 .then((res)=>{
    //                     console.log(res.data)
    //                 })
    //                 .catch(error => console.log(error))
    //         }
    //
    //     )
    //     .finally(() => {
    //         axios.get(
    //             `${curWwwPath}api1/playlist/track/all?id=24381616`,
    //         )
    //             .then(
    //                 //成功
    //                 (res) =>{
    //                     return res.data.songs.map(value => {
    //                         return {
    //                             name: value.name,
    //                             id: value.id,
    //                             artists: value.ar[0].name,
    //                             fee: value.fee,
    //                             pic: value.al.picUrl,
    //                             url: `${curWwwPath}api2/song/media/outer/url?id=${value.id}.mp3`,
    //                         }
    //                     });
    //                 })
    //             .then(res =>{
    //                 console.log(res)
    //                 let totalData ={
    //                     songList: res,
    //                     musicPosition:0,
    //                 }
    //                 store.dispatch(getSongListAciton(totalData))
    //             })
    //             .catch(error => {
    //                 console.log(error)
    //             })
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
}

function loginCheck() {
    let url = timestamp(`${curWwwPath}api1/login/cellphone`);
    return new Promise((resolve, reject) => {
        axios.get(
            `${curWwwPath}api1/login/status`,
        ).then(value => {
            // console.log(value.data.data)
            if (value.data.data.account !== null){
                console.log(1111)
                resolve('active')
            }else {
                console.log(222)
                axios.post(url,{'phone':'15918186123','password':'h85504618'})
                    .then((res)=>{
                        resolve('login Success')
                    })
            }
        })
    })
}


//节流（throttle）就是指连续触发事件但是在 n 秒中只执行一次函数------时间戳版
export function throttle(func, wait) {
    let previous = 0;
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

function debounce(func,wait) {
    let timeout;
    return function () {
        const context = this;
        const args = [...arguments];
        if (timeout) clearTimeout(timeout);
        const callNow = !timeout;
        timeout = setTimeout(() => {
            timeout = null;
        }, wait)
        if (callNow) func.apply(context, args)
    }
}

//解决浏览器缓存
export function timestamp(url){
    //  var getTimestamp=Math.random();
    const getTimestamp = new Date().getTime();
    url=url+"?timestamp="+getTimestamp
    return url;
}
