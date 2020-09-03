import $ from './library/jquery.js';
import './library/jquery-md5.js'; 

$(function(){
    $("#login_btn").on('click',function(){
        $.ajax({
            type:"post",
            url:"../interface/login.php",
            data:{
                username:$.md5($(".username").val()),
                password:$.md5($(".userpass").val())
            },
            dataType:"json",
            success:function(res){
                if(res=="1"){
                    $(".err_tip").css({
                        "display":"block",
                        "color":"green",
                    }).html("恭喜您登录成功，2秒后自动跳转至首页")
                    setTimeout(function(){
                        location.href = "./index.html";
                    },2000)
                }else if(res=="0"){
                    $(".err_tip").css({
                        "display":"block"
                    }).find("span").html("登录失败，账号或密码错误")
                }
            }
        })
        
    })

    

})