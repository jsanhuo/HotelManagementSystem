$(document).ready(function(){
	$("#loginBtn").click(function(){
		login();
	})
	$("#code").click(function(){
		getCode();
	})
})


//获取验证码
function getCode(){
    $("#code").attr("src","/user/createImage?code="+Math.random());
}

//登录
function login(){
	var user=$("#inputName").val();
	var pwd=$("#inputPassword").val();
	var code=$("#inputCode").val();
	$.ajax({
		type:"POST",
		url:"./user/login.do",
		dataType:"JSON",
		data:{
			"useraccount":user,
			"password":pwd,
			"icode":code
		},
		success:function(data){
			if(data.code=="-1"){
				alert("账号或密码错误");
			}
			else{
				var urlString="";
				window.location.href=urlString;
			}
		},
		error:function(){
			alert("登录 发生错误");
		}
	});
}