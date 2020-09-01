import $ from './library/jquery.js';

//导入jquery插件时 无需指定名称 不需要调用
//在该写时 需要在插件中引入jquery作为模块
import './library/jquery.lazyload.js';
import './library/jquery-md5.js';   //MD5插件，可以对字符串进行MD5算法加密

// console.log($.md5('abc'));  //MD5插件使用语法 "900150983cd24fb0d6963f7d28e17f72"

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

$(function(){
    $.ajax({
        type: "get",
        url: "../interface/getproduct.php",
        dataType: "json",
        success: function (res) {
             let temp = '';
             console.log(res)
             res.forEach((elm,i)=> {
                 let picture = JSON.parse(elm.picture);
                 
                 console.log(picture[0].src);
                temp += `<li>
                <a href="./details.html?id=${elm.id}">
                    <div class="img">
                        <img class="lazy" data-original="..${picture[0].src}" alt="">
                    </div>
                    <h3>${elm.title}</h3>
                    <p class="desc">${elm.title.split(" ")[0]}</p>
                    <p class="price">${elm.price}元起</p>
                </a>
            </li>
                `
             });
             $("#list").append(temp);
        }
    });


})

{/* <li>
<a href="">
    <div class="img">
        <img class="lazy" data-original="../images/zhineng01.webp" alt="">
    </div>
    <h3>米家驱蚊基础版 3个装 白色</h3>
    <p class="desc">三个装 长效驱蚊</p>
    <p class="price">5299元起</p>
</a>
</li> */}