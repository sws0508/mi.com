import $ from './library/jquery.js';
import {cookie} from './library/cookie.js';

$(function(){
    let shop = cookie.get('shop');
    if(shop){
        shop = JSON.parse(shop); // 有cookie数据 才转JSON
        let idList = shop.map(elm => elm.id).join(); //获取所有的id

        $.ajax({
            type:"get",
            url:"../interface/getitems.php",
            data:{
                idList:idList,
            },
            dataType:"json",
            success:function(res){
                var template = '';
                res.forEach((elm,i)=>{
                    let picture = JSON.parse(elm.pic);

                    //让ajax获得的数据结果的id 与 cookie中的id  一一对应
                    //索引值不同

                    //从cookie中去筛选数据
                    let arr = shop.filter(val => val.id == elm.id)

                    template += `
                        <div class="list_item" id="${elm.id}">
                            <div class="item_box">
                                <div class="col_check">
                                    <input class="itemcheck" type="checkbox" name="" id="">
                                </div>
                                <div class="col_img">
                                    <a href="">
                                        <img src="..${picture[0].src}" alt="">
                                    </a>
                                </div>
                                <div class="col_name">
                                    <h3><a href="">${elm.title}</a></h3>
                                </div>
                                <div class="col_price">${elm.price}</div>
                                <div class="col_num">
                                    <div class="change_num">
                                        <a class="reduce_count" href="javascript:;">-</a>
                                        <input id="car_count" class="subcount" type="text" value="${arr[0].num}">
                                        <a class="add_count" href="javascript:;">+</a>
                                    </div>
                                </div>
                                <div class="col_total subtotal">${(elm.price*arr[0].num).toFixed(2)}</div>
                                <div class="col_action remove">
                                    <a href="javascript:;">
                                        <i class="iconfont icon-shanchu"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    `
                })
                $('.list_body').append(template);

                checkBtn();
            }
        })
        
        // 事件
        function checkBtn(){
            // 全选
            $("#allcheck").on('click',function(){
                $(".itemcheck").prop("checked",this.checked);
                chkCount()
                total();
            })

            // 单选
            $(".itemcheck").on("click",function(){
                let allCHK = true;
                $(".itemcheck").each(function(){
                    if(this.checked != true){
                        allCHK = false;
                    } 
                })
                $("#allcheck").prop("checked",allCHK);
                chkCount()
                total();
            })

            //添加
            $(".add_count").on("click",function(){
                let count = parseInt($(this).prev().val());
                count++;
                $(this).prev().val(count);
                let subtotal = (parseInt($(this).parent().parent().prev().html()) * count).toFixed(2);
                $(this).parent().parent().parent().find(".subtotal").html(subtotal);
                chkCount()
                total();
                allCount();

                //实时改变cookie中购物车的数据
                let itemId = $(this).parent().parent().parent().parent().attr("id");
                shop.forEach(function(item,i){
                    if(item.id == itemId){
                        item.num = count;
                    }
                })
                cookie.set("shop",JSON.stringify(shop),1)
            })

            //减少
            $(".reduce_count").on("click",function(){
                let count = parseInt($(this).next().val());
                count--;
                if(count<1){
                    count = 1;
                }
                $(this).next().val(count);
                let subtotal = (parseInt($(this).parent().parent().prev().html()) * count).toFixed(2);
                $(this).parent().parent().parent().find(".subtotal").html(subtotal);
                chkCount()
                total();
                allCount();

                //实时改变cookie中购物车的数据
                let itemId = $(this).parent().parent().parent().parent().attr("id");
                shop.forEach(function(item,i){
                    if(item.id == itemId){
                        item.num = count;
                    }
                })
                cookie.set("shop",JSON.stringify(shop),1)
            })

            //删除
            $(".remove").on('click',function(){
                $(this).parent().parent().remove();
                //同时删除cookie购物车中对应的商品
                let itemId = $(this).parent().parent().attr("id");
                shop.forEach(function(item,i){
                    if(item.id == itemId){
                        shop.splice(i,1);
                    }
                })
                cookie.set("shop",JSON.stringify(shop),1)
                chkCount()
                total();
                allCount();
            })


        

            //购物车所有商品
            function allCount(){
                let num = 0;
                $(".subcount").each(function(elm,i){
                    num += parseInt($(this).val());
                })
                $(".all_count").html(num);  
            }
            allCount();
        
            // 已选商品总数
            function chkCount(){
                let num = 0;
                $(".itemcheck").each(function(){
                    if($(this).prop("checked") == true){
                        num += parseInt($(this).parent().parent().find(".subcount").val());
                    }
                })
                $(".chk_count").html(num);
            }


            // 商品总价
            function total(){
                let total = 0; //总价变量
                $(".itemcheck").each(function(){
                    if($(this).prop("checked") == true){
                        total += parseInt($(this).parent().parent().find(".subtotal").html());
                    }
                   
                })
                $("#total").html(total);    
            }
        }
    }
})