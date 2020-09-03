import $ from './library/jquery.js';
import './library/jquery-md5.js';

$(function(){
    let reg = {
        "password": /^.{6,16}$/,
        "phone": /^1[3-9]\d{9}$/
    };

    //手机号码
    $("#phone").on('input',function(){
        // 手机号码格式验证
        if(reg[$(this).attr("id")].test($(this).val())){
            $(".reg_step1 .err1").css({
                "display":"none"
            });
            $(".reg_step1 .err1 span").html("");
            $(".reg_step1 .fixed_bot").on('click',function(){
                $(".reg_step1").css("display","none").next().css("display","block")
                $("#ph").html("+86 " + $("#phone").val());
                let count = 100;//100秒后重新发送短信
                let mytime = setInterval(() => {
                    count--
                    if(count==0){
                        $("#Interval").remove();
                        clearInterval(mytime);
                    }
                    $("#Interval").html(`(${count}s)`);
                }, 1000);

                //发送手机短信
                $.ajax({
                    type: "get",
                    url: "../interface/dysms/api_demo/SmsDemo.php",
                    data: {"phonenumber":$("#phone").val()},
                    dataType: "json",
                    success: function (res) {
                        console.log(res)
                        console.log(111)
                        if(res.Code == "OK"){
                            $(".err2").html("短信发送成功！").css("color","#999").css("display","block")
                        }else{
                            $(".err2").html("短信发送失败！").css("color","red").css("display","block")
                        }
                    }
                });

            })
        }else{
            $(".reg_step1 .err1").css({
               "display":"block",
            });
            $(".reg_step1 .err1 span").html("手机号码格式错误");
        }
    })

    //短信验证
    $(".reg_step2 .fixed_bot input").eq(0).on("click",function(){
        $.ajax({
            type: "post",
            url: "../interface/msuser.php",
            data: {"phoneCode":$("#server_code").val()},
            // dataType: "json",
            success: function (res) {
                if(res == "ok"){
                    $(".err2").css({'display':'none'});
                    $(".reg_step2").css("display","none").next().css("display","block")
                    $("#ph2").html($("#phone").val());
                }else if(res == "codefail"){
                    $(".err2").css({'display':'block'});
                    $(".err2 span").html("短信验证错误");
                }
               
            }
        });
    })
    

    //密码
    $("#password").on('blur',function(){
        if($(this).val() != ''){
            if(reg[$(this).attr("id")].test($(this).val())){
                $(".err3").css("display","none")
            }else{
                $(".err3").css("display","block").find("span").html("请输入6-16位密码")
            }
        }
    })

    // checkpass
    $("#checkpass").on('blur',function(){
        if($("#checkpass").val()!= ''){
            if($(this).val() != $("#password").val()){
                $(".err3").css("display","block").find("span").html("两次密码不一致");
            }else{
                $("#reg_btn").on('click',function(){
                    $(".err3").css("display","none")
                    console.log($.md5($("#phone").val()))
                    console.log($.md5($("#password").val()))
                    //格式无误后发送ajax登录注册
                    $.ajax({
                        type:"post",
                        url:"../interface/reg.php",
                        data:{
                            username:$.md5($("#phone").val()),
                            password:$.md5($("#password").val())
                        },
                        dataType:"json",
                        success:function(res){
                            if(res==1){
                                $(".err3").css({
                                    "display":"block",
                                    "color":"green",
                                }).html("恭喜您注册成功，2秒后自动跳转至首页")
                                setTimeout(function(){
                                    location.href = "./index.html";
                                },2000)
                            }
                        }
                    })
                })
            }
        }
    })

    //提交注册
    if($("#password").val()=="" || $("#checkpass").val()==""){//密码框为空的时候输出提示信息
        $("#reg_btn").on('click',function(){
            $(".err3").css("display","block").find("span").html("请输入密码");       
        })    
    }else{
        // $("#reg_btn").on('click',function(){
            
        // })    
    }
})