$(document).ready(function(){
	getCode();
	var h=$(window).height();
	$("#main").css("height",h);
	$("#loginBtn").click(function(){
		login();
	})
	$("#code").click(function(){
		getCode();
	})
})


//获取验证码
function getCode(){
	$("#code").attr("src","./user/createImage?code="+Math.random());
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
			console.log(data)
			if(data.code=="0"){
				var urlString="pages/myCenter.html?power="+data.power+"&userid="+data.userid;
				window.location.href=urlString;
			}
			else if(data.code=="-1"){
				alert("验证码或密码错误")
			}
		},
		error:function(){
			alert("登录 发生错误");
		}
	});
}