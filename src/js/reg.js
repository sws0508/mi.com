import $ from './library/jquery.js';

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
            })
        }else{
            $(".reg_step1 .err1").css({
               "display":"block",
            });
            $(".reg_step1 .err1 span").html("手机号码格式错误");
        }
    })

    //短信验证
    $("#server_code").on("blur",function(){
        if($(this).val()!="10086"){//失败
            $(".err2").css({'display':'block'});
            $(".err2 span").html("短信验证错误");
        }else{//成功
            $(".err2").css({'display':'none'});
            $(".reg_step2 .fixed_bot input").eq(0).on('click',function(){
                $(".reg_step2").css("display","none").next().css("display","block")
            })
        }
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
                    location.href = "./index.html";
                })
            }
        }
    })

    //提交注册
    if($("#password").val()=="" || $("#checkpass").val()==""){//密码框为空的时候输出提示信息
        $("#reg_btn").on('click',function(){
            $(".err3").css("display","block").find("span").html("请输入密码");       
        })    
    }
})