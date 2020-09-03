import $ from './library/jquery.js';
import {cookie} from './library/cookie.js'
import {mover03} from './library/move2001.js';


$(function(){
    let id = location.search.split("=")[1];

    $.ajax({
        type:"get",
        url:"../interface/getitem.php",
        data:{id:id},
        dataType:"json",
        success:function(res){
            let imgs = res.pic;
            console.log(imgs)
            let picture = JSON.parse(imgs);
            
            let template = `
            <div class="page_info">
                <div class="product_box container clear_fix">
                    <div class="img-left float_left">
                        <div class="slide">
                            <div class="imgbox">
                                <a href="javascript:;"><img src="..${picture[0].src}" alt=""></a>
                                <a href="javascript:;"><img src="..${picture[1].src}" alt=""></a>
                                <a href="javascript:;"><img src="..${picture[2].src}" alt=""></a>
                            </div>
                    
                            <span>&lt;</span>
                            <span>&gt;</span>
                    
                            <ul>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                            
                            <div id="mirror-box"></div>
                            <div id="show-box"></div>
                        </div>
                        
                    </div>
                    <div class="product-con float_left">
                        <h2>${res.title}</h2>
                        <p class="sale_desc">智能语音唤醒，解放双手 / 蓝牙5.0芯片，稳定无线连接 / 分体式真无线设计，无主从限制，单双耳灵活切换 / 双麦克风降噪，有效降低通话时环境噪音 / LHDC蓝牙解码高清音质 / 复合振膜动圈，还原声音细节</p>
                        <p class="mi_title">小米自营</p>
                        <div class="priceinfo">
                            <span>${res.price} 元<del>899元</del></span>
                        </div>
                        <div class="line"></div>
                        <div class="addres_box">
                            <i class="iconfont icon-wangdian"></i>
                            <div class="addres_con">
                                <div class="clear_fix">
                                    <div class="float_left">
                                        <span>北京</span>
                                        <span>北京市</span>
                                        <span>海定区</span>
                                        <span>清河街道</span>
                                    </div>
                                    <a class="float_left" href=""> 修改 </a>
                                </div>
                                <p>${res.num}件</p>
                            </div>
                        </div>
                        <div class="opction_box">
                            <div class="title">选择颜色</div>
                            <div class="item">白色</div>
                        </div>
                        <div class="selected">
                            <div>
                                小米真无线蓝牙耳机 Air 2 白色<span>299元 <del> 399元</del></span>
                            </div>
                            <p>总计：<span>${res.price}</span>元</p>
                        </div>
                        <div class="btn_box clear_fix">
                            <div class="sale_btn float_left">
                                <a href="./cart.html" id="additem">加入购物车</a>
                            </div>
                            <div class="favorite_btn float_left">
                                <a href=""><i></i>喜欢</a>
                            </div>
                        </div>
                        <div class="sale_info">
                            <span>
                                <a href="">
                                    <i class="iconfont icon-gou"></i><em>小米自营</em>
                                </a>
                            </span>
                            <span>
                                <a href="">
                                    <i class="iconfont icon-gou"></i><em>小米发货</em>
                                </a>
                            </span>
                            <span>
                                <a href="">
                                    <i class="iconfont icon-gou"></i><em>7天无理由退货</em>
                                </a>
                            </span>
                            <span>
                                <a href="">
                                    <i class="iconfont icon-gou"></i><em>运费说明</em>
                                </a>
                            </span>
                            <span>
                                <a href="">
                                    <i class="iconfont icon-gou"></i><em>企业信息</em>
                                </a>
                            </span>
                            <span>
                                <a href="">
                                    <i class="iconfont icon-gou"></i><em>售后服务政策</em>
                                </a>
                            </span>
                            <span>
                                <a href="">
                                    <i class="iconfont icon-gou"></i><em>7天价格保护</em>
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            
            `;
            $(".page").prepend(template).find("#additem").on("click",function(){
                addItem(res.id,res.price,1);
            })
            
            slide();//轮播图

            
            //放大镜功能实现
            $(".img-left").mousemove(function (event) {
                //显示放大镜
                $("#show-box").css({
                    "display": "block",
                    "background-position": "0 0"
                })
                $("#mirror-box").css({
                    "display": "block"
                })
                //获取放大镜宽高
                let mir_w = $("#mirror-box")[0].offsetWidth;
                let mir_h = $("#mirror-box")[0].offsetHeight;

        
                let e = event || window.event;
                // 1、计算mirror-box应该出现的位置(基于父盒子oBox的left和top)
                // 鼠标距离页面的坐标的距离-大盒子距离页面的距离-放大镜的宽度的一半
                let left1 = e.pageX - this.offsetLeft - mir_w / 2;
                let top1 = e.pageY - this.offsetTop - mir_h / 2;
                //边界值判断
                if (left1 < 50) {
                    left1 = 50;
                } else if (left1 + mir_w > 510) {
                    left1 = 510 - mir_w;
                }
        
                if (top1 < 0) {
                    top1 = 0;
                } else if (top1 + mir_h > 460) {
                    top1 = 460 - mir_h;
                }
    
                //效果显示
                $("#mirror-box").css({
                    "left": left1 + "px",
                    "top": top1 + "px",
                })
        
                $("#show-box").css({
                    "background-position": `-${left1 *3 -30}px -${top1 * 3 +30}px`,
                    "display": "block"
                })
            })
            $(".img-left").mouseout(function(){
                console.log(1)
                $("#show-box").css({
                    "display": "none"
                })
                $("#mirror-box").css({
                    "display": "none"
                })
            })
        },
    })

    // 添加购物车
    function addItem(id,price,num){
        let shop = cookie.get("shop");

        let product = {
            id:id,
            price:price,
            num:num
        };

        if(shop){//判断是否存有购物车数据
            shop = JSON.parse(shop);
            //购物车中是否已经存在当前这件商品
            if(shop.some(elm => elm.id == id)){
                //修改数量
                shop.forEach(elm => {
                    elm.id === id ? elm.num += num : null;
                });
            }else{
                //添加商品
                shop.push(product);
            }

        }else{
            shop = [];
            shop.push(product);
        }

        cookie.set("shop",JSON.stringify(shop),1)

    }

    //轮播图部分
    function slide(){
        // console.log(000);
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
            $(".slide ul li").css({"background":"#5a5f5f"});
            $(".slide ul li").eq(ord).css({"background":"red"});

            let show_src = $(".imgbox a").eq(ord).find("img").attr("src");
            $("#show-box").css({
                "background": `url(${show_src}) no-repeat 0 0`
            })

        }

        function stopPlay(){
            window.clearInterval(myTimer)
            myTimer = null;
        }
        
        function addEvent(){
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
        }
        addEvent();

        
    }




    // $(".img-left").mousemove(function (event) {
    //     //显示放大镜
    //     // $("#mirror-box").css({
    //     //     "display": "block"
    //     // })
    //     //获取放大镜宽高
    //     console.log(1)
    //     let mir_w = $(".img-left")[0].offsetWidth;
    //     let mir_h = $(".img-left")[0].offsetHeight;

    //     let e = event || window.event;
    //     // 1、计算mirror-box应该出现的位置(基于父盒子oBox的left和top)
    //     // 鼠标距离页面的坐标的距离-大盒子距离页面的距离-放大镜的宽度的一半
    //     let left1 = e.pageX - this.offsetLeft - mir_w / 2;
    //     let top1 = e.pageY - this.offsetTop - mir_h / 2;

    //     //边界值判断
    //     if (left1 < 0) {
    //         left1 = 0;
    //     } else if (left1 + mir_w > 350) {
    //         left1 = 350 - mir_w;
    //     }

    //     if (top1 < 0) {
    //         top1 = 0;
    //     } else if (top1 + mir_h > 350) {
    //         top1 = 350 - mir_h;
    //     }

    //     // $("#mirror-box")[0].style.left = left1+"px";
    //     // $("#mirror-box")[0].style.top = top1+"px";

    //     //效果显示
    //     $("#mirror-box").css({
    //         "left": left1 + "px",
    //         "top": top1 + "px",
    //     })

    //     $("#show-box").css({
    //         "background-position": `-${left1 * 3}px -${top1 * 3}px`,
    //         "display": "block"
    //     })
    // })
})