<?php
    include("./conn.php");
    
    //1、接收前端发送的数据
    $username = $_REQUEST["username"];
    $password = $_REQUEST["password"];
   
    $sql = "select * from users where username='$username' and password='$password'";

    $result = $mysqli->query($sql);

    $mysqli->close();

    if($result->num_rows >0){
        // echo "<script>alert('登录成功')</script>";
        // echo "<script>location.href='../index.html'</script>";
        echo "1";
    }else{
        // echo "<script>alert('登录失败，用户名或密码失败!')</script>";
        // echo "<script>location.href='../04login.html'</script>";
        echo "0";
    }

?>