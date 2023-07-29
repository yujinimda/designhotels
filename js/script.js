//menu
const appbar=$('.app-bar-wrap .appbarBt');
const mobileMenu=$('.mobile-menu')
const appbarCloseBt=$('.appbarCloseBt')

appbar.on('click', function(){
    mobileMenu.stop().animate({left: 0},500);
    $('.header-mobile-menu').stop().animate({left:'100%'},500)
})

appbarCloseBt.on('click', function(){
    mobileMenu.stop().animate({left: -100+'%'},500);
    $('.header-mobile-menu').stop().animate({left:0},500)
})

//video
let winW=$(window).innerWidth();
let winH=$(window).innerHeight();
let vdW=$("#mainVideo").innerWidth();
let vdH=$("#mainVideo").innerHeight();

let videoPlay="on";
let soundNuted="off";

$('#mainVideo').get(0).autoplay=true;
$('#mainVideo').get(0).loop=0;
$('#mainVideo').get(0).muted=true;

$('.video').css({width:"100%", height:winH})

//시작시 video 배경잡기
if(winH>vdH){
    $("#mainVideo").css({width:"auto", height:"auto"})
}
/*if(winH>vdH){
    $("#mainVideo").css({width:"auto", height:winH})
}*/
if(winW>vdW){
    $("#mainVideo").css({width:winW,height:"auto"})
}

//반응형 video 배경잡기
$(window).resize(videoResizeFn);

function videoResizeFn(){
    winW=$(window).innerWidth();
    winH=$(window).innerHeight();
    vdW=$("#mainVideo").innerWidth();
    vdH=$("#mainVideo").innerHeight();

    $('.video').css({width:"100%",height:winH})
    if(winH>vdH){
        $("#mainVideo").css({width:"auto", height:winH})
    }
    if(winW>vdW){
        $("#mainVideo").css({width:winW,height:"auto"})
    }
    
}

$(".m-again").hide();

//비디오 재생 toggle 버튼
$(".pauseIcon").on({click:function(){
    if(videoPlay==='on'){
        //켜진상태
        videoPlay="off";
        $("#mainVideo").get(0).pause();
        $(this).find('i').attr('class','fas fa-play');
    } else {
        //꺼진상태
        videoPlay="on";
        $("#mainVideo").get(0).play();
        $(this).find('i').attr('class','fas fa-pause')
    }
}});

$(document).keypress(function(e){
    if(e.keyCode===32 && videoPlay === 'on'){
        e.preventDefault();
        videoPlay="off";
        $("#mainVideo").get(0).pause();
        $('.pauseIcon').find('i').attr('class','fas fa-play');
    } else if (e.keyCode===32 && videoPlay === 'off'){
        videoPlay="on";
        $("#mainVideo").get(0).play();
        $('.pauseIcon').find('i').attr('class','fas fa-pause')
    }
})

//소리 재생 toggle 버튼
$('.mutedIcon').on({click:function(){
    if(soundNuted === "off") {
        //소리 꺼진 상태
        soundNuted="on"
        $('#mainVideo').get(0).muted=false;
        $(this).find('i').attr('class','fas fa-volume-up');
    } else {
        //소리 켜진 상태
        soundNuted="off"
        $('#mainVideo').get(0).muted=true;
        $(this).find('i').attr('class','fas fa-volume-mute');
    }
}})


$(document).keypress(function(e){
    if(e.keyCode===13 && soundNuted === 'on'){
        e.preventDefault();
        soundNuted="off"
        $('#mainVideo').get(0).muted=true;
        $('.mutedIcon').find('i').attr('class','fas fa-volume-mute');
        
    } else if (e.keyCode===13 && soundNuted === 'off'){
        soundNuted="on"
        $('#mainVideo').get(0).muted=false;
        $('.mutedIcon').find('i').attr('class','fas fa-volume-up');
    }
})


let setId = setInterval(videoTimeCountFn,100)
videoTimeCountFn()

function videoTimeCountFn(){
    //console.log('비디오 진행 시간:' + $('#mainVideo').get(0).currentTime) - 37.44
    //console.log('비디오 진행 시간:' + $('#mainVideo').get(0).duration)
    //console.log('정지여부:' + $('#mainVideo').get(0).ended)
    if($("#mainVideo").get(0).ended==true){
        $(".m-again").show();
        videoPlay="off";
        $('.pauseIcon').find('i').attr('class','fas fa-play');
        clearInterval(setId)
    }
}

$(".m-again").on({click:function(){
    $(".m-again").hide();
    videoPlay="on";
    $("#mainVideo").get(0).play();
    $('.pauseIcon').find('i').attr('class','fas fa-pause')
}})

const TrendingWrap = $(".tranding-wrap");
let offset = TrendingWrap.offset().left;

TrendingWrap.on({mousemove(e){
    //console.log(e.pageX)
    if(e.pageX>=1560){
        return flase

    } else {
        $(this).css({left:-e.pageX})
    }
}})
