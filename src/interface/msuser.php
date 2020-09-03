<?php
	
	header("content-type","text/html;charset=utf-8");
	
	//一、接收前端传来的数据
	// $username = $_POST["username"];
    // $userpass = $_POST["userpass"];
    
	$phoneCode = $_POST["phoneCode"]; //用户输入的短信验证码
   
	//启动 Session
	session_start();
    $code = $_SESSION["code"];
        
    if($phoneCode==$code){
        echo 'ok';
    }else{
        echo 'codefail';
    }
    die();
	
	
?>