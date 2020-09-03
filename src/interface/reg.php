<?php
    include("./conn.php");

    //1、接收前端发送的数据
    $username = $_REQUEST["username"];
    $password = $_REQUEST["password"];
   
    //2、验证用户名是否存在
    // $sql = "select * from vip where username='$username'";

    //执行sql语句
    // $result = $mysqli->query($sql);

    //var_dump($result);
    //print_r($result);
    // die();

    // if($result->num_rows>0){
    //     echo "<script>alert('用户名已存在');</script>";
    //     echo "<script>location.href='../reg.php'</script>";

    //     $mysqli->close();//关闭数据库
    //     die();
    // }

    //3、将数据写入数据库
    $insert = "insert into users(username,password) values('$username','$password')";
    // echo $insert;

    $res = $mysqli->query($insert);

    $mysqli->close();

    if($res){
        echo "1";
        // echo "<script>alert('注册成功')</script>";
        // echo "<script>location.href='../index.html'</script>";
    }
    
?>