import $ from './library/jquery.js';
import {mover03} from './library/move2001.js';

//导入jquery插件时 无需指定名称 不需要调用
//在该写时 需要在插件中引入jquery作为模块
import './library/jquery.lazyload.js';
import './library/jquery-md5.js';   //MD5插件，可以对字符串进行MD5算法加密

// console.log($.md5('abc'));  //MD5插件使用语法 "900150983cd24fb0d6963f7d28e17f72"



function lz(){
    $("img.lazy").lazyload({
        placeholder: "img/timg.gif", //用图片提前占位
        // placeholder,值为某一图片路径.此图片用来占据将要加载的图片的位置,待图片加载时,占位图则会隐藏
        effect: "fadeIn", // 载入使用何种效果
        // effect(特效),值有show(直接显示),fadeIn(淡入),slideDown(下拉)等,常用fadeIn
        // threshold: 200, // 提前开始加载
        // threshold,值为数字,代表页面高度.如设置为200,表示滚动条在离目标位置还有200的高度时就开始加载图片,可以做到不让用户察觉
        // event: 'click', // 事件触发时才加载
        // event,值有click(点击),mouseover(鼠标划过),sporty(运动的),foobar(…).可以实现鼠标莫过或点击图片才开始加载,后两个值未测试…
        // container: $("#container"), // 对某容器中的图片实现效果
        // container,值为某容器.lazyload默认在拉动浏览器滚动条时生效,这个参数可以让你在拉动某DIV的滚动条时依次加载其中的图片
        // failurelimit: 10 // 图片排序混乱时
        // failurelimit,值为数字.lazyload默认在找到第一张不在可见区域里的图片时则不再继续加载,但当HTML容器混乱的时候可能出现可见区域内图片并没加载出来的情况,failurelimit意在加载N张可见区域外的图片,以避免出现这个问题.
    });
}

$(function(){
    $.ajax({
        type: "get",
        url: "../interface/getproduct.php",
        dataType: "json",
        success: function (res) {
             let temp = '';
             res.forEach((elm,i)=> {
                let picture = JSON.parse(elm.pic);
                temp += `<li>
                <a href="./details.html?id=${elm.id}">
                    <div class="img">
                         <img class="lazy" src="..${picture[0].src}" alt="">
                    </div>
                    <h3>${elm.title}</h3>
                    <p class="desc">${elm.title.split(" ")[0]}</p>
                    <p class="price">${elm.price}元起</p>
                </a>
            </li>
                `
             });
             $("#list").append(temp);
             lz()
        }
    });

    //轮播图部分
    slide();

    function slide(){
        let ord = 0;
        let myTimer = null;

        function autoPlay(){
            myTimer = setInterval(function(){
                goImg(ord+1)
            },3000)
        }
        function goImg(transOrd){
            //健壮性
            if(transOrd==ord){
                return;
            }

            let outOrd = ord;
            ord = transOrd;

            //边界处理
            if(ord>$(".imgbox>a").length-1){
                ord = 0;
            }else if(ord<0){
                ord = $(".imgbox>a").length-1;
            }

            //外观呈现
            // a、让一张图片淡出，一张图片淡入
            
            mover03($(".imgbox a")[outOrd],"opacity", 0,1000)
            mover03($(".imgbox a")[ord],"opacity", 1,1000)
            //b、改变豆豆颜色、
            $(".slide ul li").css({"background":"#5a5f5f"})
            $(".slide ul li").eq(ord).css({"background":"red"})

        }

        function stopPlay(){
            window.clearInterval(myTimer)
            myTimer = null;
        }
        
        $(function(){
            autoPlay();

            $(".slide ul li").click(function(){
                stopPlay();
                goImg($(this).index()) ;   
                    
            })

            $(".slide>span").eq(0).click(function(){
                stopPlay();
                goImg(ord-1);
            })
            $(".slide>span").eq(1).click(function(){
                stopPlay();
                goImg(ord+1);
            })

            $(".imgbox").mouseover(function(){
                stopPlay()
            })
            $(".imgbox").mouseout(function(){
                autoPlay()
            })
        })
    }

    //秒杀倒计时模块
    timeDiff()
    function timeDiff(){
        function Time(H,m,S){
            let b =new Date()
            b.setHours(H)
            b.setMinutes(m)
            b.setSeconds(S)
            return b;
        }

        //时间差值函数
        function diff(a,b){
            let s = (b.getTime()-a.getTime())/1000%60
            let m = (b.getTime()-a.getTime()-s*1000)/(1000*60)%60
            let h = (b.getTime()-a.getTime()-s*1000-m*60*1000)/(60*60*1000)%24

            s = Math.abs(parseInt(s));//秒数为浮点数时转化为整数
            m = Math.abs(m);
            h = Math.abs(h);
            //当时 分 秒的数值为个位数时，十位补0 拼接成两位数
            if(s<10){
                s = "0" + s;
            }
            if(m<10){
                m =  "0" + m;
            }  
            if(b.getTime()<a.getTime()){
                h = 24 - h;
            }
            if(h<10){
                h = "0" + h;
            }

            //将时间差值显示在页面中
            $("#h").html(h);//时差
            $("#m").html(m);//分差
            $("#s").html(s);//秒差
        }
       
        setInterval(function(){
            //a当前时间对象
            let a = new Date();
            let h = $("#h").html(a.getHours());//时
            let m = $("#m").html(a.getMinutes());//分
            let s = $("#s").html(a.getSeconds());//秒
            
            //b目标时间对象
            let b = Time(parseInt($("#t_diff").html().split(":")[0]),parseInt($("#t_diff").html().split(":")[1]),0)
           
            diff(a,b)
        },1000)	
    
    }

})

