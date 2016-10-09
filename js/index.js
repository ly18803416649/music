/**
 * Created by yy on 2016/9/24.
 */
$(function () {

    var $audio = $('#audio');
    var audio = $('#audio').get(0);


    var musics=[
        {path:'media/曾子岚 - 青春的颜色.mp3',name:'青春的颜色',artistan:'曾子岚',duration:'03:18'},
        {path:'media/陈奕迅 - 红玫瑰.mp3',name:'红玫瑰',artistan:'陈奕迅',duration:'03:15'},
        {path:'media/蒙面哥 - 一亿个伤心.mp3',name:'一亿个伤心',artistan:'蒙面哥',duration:'03:18'},
        {path:'media/孙露 - 让我一次爱个够.mp3',name:'让我一次爱个够',artistan:'孙露',duration:'04:13'},
        {path:'media/刘思涵 - 走在冷风中 (Bonus Track).mp3',name:'走在冷风中 (Bonus Track)',artistan:'刘思涵',duration:'02:10'},
        {path:'media/陶喆 - 寂寞的季节.mp3',name:'寂寞的季节',artistan:'陶喆',duration:'05:10'},
        {path:'media/中島美嘉 - Fighter.mp3',name:'Fighter',artistan:'中島美嘉',duration:'03:20'},
        {path:'media/周杰伦-一路向北.mp3',name:'一路向北',artistan:'周杰伦',duration:'03:20'}
    ]

    var currentIndex=4;
    var list = $('.head .head-nav .list');
    var menuBiao = $('.music .menu .menu-biao')
    // console.dir(list);

    function drawback() {
        $(musics).each(function (i,v) {
            $('<li id="'+i+'"class="row"><span class="col s1">'+v.name+'</span><span class="col s2">'+v.artistan+'</span><span class="col s3">'+v.duration+'</span><span class="col s4"><span class="ss1"></span><span class="ss2"></span><span class="ss3"></span><span class="ss4"></span></span></li>').appendTo(list);
            $('<li id="'+i+'"class="row"><span class="col s1">'+v.name+'</span><span class="col s2">'+v.artistan+'</span><span class="col s3">'+v.duration+'</span><span class="col s4"><span class="ss1"></span><span class="ss2"></span><span class="ss3"></span><span class="ss4"></span></span></li>').appendTo(menuBiao);

        })
    }
    drawback();

    var lists = $('.head .head-nav .lists');
    lists.on('click',function () {
         list.slideToggle("slow");
    })

    var start = $('.music .start');
    start.on('click',function () {
        if(audio.paused){
            audio.play();

        }else{
            audio.pause();

        }
        // $('.music .start img').toggleClass('xiaoshi');
    })
    $audio.on('pause',function () {
        $('.music .start .img2').addClass('xiaoshi');
        $('.music .start .img1').removeClass('xiaoshi');
    })
    $audio.on('play',function () {
        $('.music .start .img1').addClass('xiaoshi');
        $('.music .start .img2').removeClass('xiaoshi');
    })

//进度条
    var jindu = $('.music .jindu');
    var jinduyuan = $('.music .jindu .yuan');
    var bgw = $('.music .jindu').width();
    var du = $('.music .jindu .du');
    $audio.on('timeupdate',function(){
        var ll=audio.currentTime/audio.duration*bgw;
        du.width(ll);
        jinduyuan.css({left:ll-jinduyuan.width()/2})
    })
    //拖动
    jinduyuan.on('mousedown',function(e){
        e.preventDefault();

        $(document).on('mousemove',function(e){
            var ww=(e.pageX-jindu.offset().left)/bgw*audio.duration;
            ww=ww>=audio.duration?audio.duration:ww;
            ww=ww<=0?0:ww;
            audio.currentTime=ww;
        });
        $(document).on('mouseup',function(){
            $(document).off('mousemove')
            $(document).off('mouseup')
        })
    })

    //点击列表换歌
    var bg = $('.bg');
    var musicnav = $('.music .music-nav');


    list.on('click','li',function(e){
        e.preventDefault();
        currentIndex=$(this).index();
        audio.src=musics[currentIndex].path;
        audio.play();
    })

    menuBiao.on('click','li',function(e){
        e.preventDefault();
        currentIndex=$(this).index();
        audio.src=musics[currentIndex].path;
        audio.play();
    })


    $audio.on('play',function(){
        list.find('li').removeClass("playing");//首先全部移除
        list.find('li').eq(currentIndex).addClass('playing');//找到点击的那个添加class
        menuBiao.find('li').removeClass("playing");//首先全部移除
        menuBiao.find('li').eq(currentIndex).addClass('playing');//找到点击的那个添加class
        var v=musics[currentIndex];
        $('.music .geming').text(v.name);
        bg.css({
            "background":"url('image/"+currentIndex+".jpg') no-repeat center center",
            "background-size":"100% 100%",
            "filter":"blur(10px)"
        });
        musicnav.css({
            "background":"url('image/"+currentIndex+".jpg') no-repeat center center",
            "background-size":"100% 100%",
            "filter":"blur(2px)"
        });
        start.css({
            "background":"url('image/"+currentIndex+".jpg') no-repeat center center",
            "cursor": "pointer"
        });
    })

//切歌
    var butLeft = $('.music .left');
    var butRight = $('.music .right');
    var moshi = $('.music .moshi');
    var moshichang = $('.music .moshichang');

    butRight.on('click',function () {
        // currentIndex+=1;
        if(moshi.hasClass('suiji')){
            currentIndex=Math.floor(Math.random()*musics.length);
        }
        if(moshi.hasClass('danqu')){

        }
        if(moshi.hasClass('xunhuan')){
            currentIndex+=1;
        }
        if(!currentIndex||currentIndex>=musics.length){
            currentIndex=0;
        }
        audio.src=musics[currentIndex].path;
        audio.play();
    })
    butLeft.on('click',function () {
        if(!currentIndex||currentIndex<=0){
            currentIndex=musics.length;
        }
        currentIndex -=1;
        audio.src=musics[currentIndex].path;
        audio.play();
    })

    // 在播放完成之后
    $audio.on('ended',function(){
        butRight.trigger('click');
    })

    // 获取时间的函数
    var gettime=function(time){
        if(isNaN(time)){
            return '--:--';
        };
        var min=Math.floor(time/60);
        var sec=parseInt(time%60);
        if(sec<10){
            sec='0'+sec
        }
        if(min<10){
            min='0'+min
        }
        return min+':'+sec;
    }

    var time = $('.music .time');

    $audio.on('timeupdate',function () {
        time.text(gettime(audio.currentTime));
    })

    jindu.on('click',function(e){
        audio.currentTime=(e.pageX-$(this).offset().left)/bgw*audio.duration;
    })


    //音量
    var yintiao = $('.music .tiao');
    var yinliang = $('.music .yinliang');
    var yindu = $('.music .tiao .yindu');
    var yinyuan = $('.music .tiao .tiaoyuan');
    var w = yintiao.width();
    
    yinliang.on('click',function () {
        if(!$(this).attr('ov')){
            $(this).attr('ov',audio.volume)
            audio.volume=0;
        }else{
            audio.volume=$(this).attr('ov');
            $(this).removeAttr('ov');
        }
    })

    // 调节音量
    yintiao.on('click',function(e){
        if(e.offsetX<=0){
            e.offsetX=0
        }
        audio.volume=e.offsetX/w;
    })

    //点击改变音量条的界面
    $audio.on('volumechange',function(){
        if(audio.volume===0){
            yinliang.addClass('jingyin')
        }else{
            yinliang.removeClass('jingyin')
        }
        yindu.width(audio.volume*w);
        yinyuan.css({left:audio.volume*w-yinyuan.width()/2})

    })

    yinyuan.on('click',function(e){
        e.stopPropagation();
    })

    yinyuan.on('mousedown',function(e){
        e.preventDefault();


        $(document).on('mousemove',function(e){

            var v=(e.pageX-yintiao.offset().left)/yintiao.width();
            v=(v>1)?1:v;
            v=(v<0)?0:v;
            audio.volume=v
        })
        $(document).on('mouseup',function(){

            $(document).off('mousemove')
        })

    })

    var biao = $('.music .biao');
    var menu = $('.music .menu')
    var music = $('.music');
    biao.on('click',function () {
        // menu.slideToggle("slow");
        if(music.hasClass('zuohua')){
            music.removeClass('zuohua');
            menu.addClass('youhua').delay(800).hide('slow');
        }else{
            music.addClass('zuohua');
            menu.show().removeClass('youhua');
        }

    })



//播放模式
        moshi.on('click',function () {
            moshichang.show('slow');
        })
        moshichang.find('.d1').on('click',function () {
            moshi.attr('class','moshi xunhuan');
            moshichang.hide('slow');
        })
    moshichang.find('.d2').on('click',function () {
        moshi.attr('class','moshi danqu');
        moshichang.hide('slow');
    })
    moshichang.find('.d3').on('click',function () {
        moshi.attr('class','moshi suiji');
        moshichang.hide('slow');
    })


})