

this.audio = new Audio();
this.audio.src = '../assets/alert.mp3';
let playPromise; 
playPromise = this.audio.play();
if (playPromise) {
    playPromise.then(() => {
        // 音频加载成功
        // 音频的播放需要耗时
        that.tiemr = setInterval(() => {
        second--;
        if (second <= 0) {
            that.audio.pause()
            clearInterval(that.tiemr);
        }
        }, 1000);
    }).catch((e) => {
        // 音频加载失败
        console.error(e);
    });
}