(function($){
	$.getData=function(name){
		var reg=new RegExp("(^|&)"+name+"=([^&]+)(&|$)?");
		var result = window.location.search.substr(1).match(reg);
		if (result!= null) return result[2]; return null;		
	}
})(jQuery);


var userid=$.getData('userid');
var power=$.getData('power');


$(document).ready(function(){
	var w=$("#userpic").width();
  	$("#userpic").height(w);
	$("#inputNone").attr("value",userid);
	$("#showInfo").click(function(){
		changeTab();
	});
	$("#showAlter").click(function(){
		changeTab();
	});
	getInfo();
	getSalary();
	$("#alterInfoBtn").click(function(){
		alterInfo();
	});
	$("#alterPwdBtn").click(function(){
		alterPwd();
	})

})

//判断对象/JSON是否为空 空返回1 非空返回0
function isEmptyObject(e) {
	var t;
	for (t in e)
		return 0;
	return 1;
}

//判断字符串是否为空 空返回1 非空返回0
function isEmptyString(str){
	if(str=='null'||str=='')
		return 1;
	return 0;
}


function changeTab(){
	var info=$("#showInfodiv").css("display");
	var alter=$("#showAlterdiv").css("display");
	if(info=="block"){
		$("#showInfodiv").css("display","none");
		$("#showAlterdiv").fadeIn();	
	}
	else{
		$("#showAlterdiv").css("display","none")
		$("#showInfodiv").fadeIn();
	}
}

var info;

function getInfo(){
	$.ajax({
		type:"POST",
		url:"../user/getUserById.do",
		dataType:"JSON",
		data:{
			"userid":userid
		},
		success:function(data){
			if(data.code==0){
				info=data.user;
				var span=$("span");
				$("#userpic").attr("src",'../'+info.photourl)
				span.filter("#account").text(info.useraccount);
				span.filter("#idnum").text(info.idnumber);
				span.filter("#name").text(info.username);
				$("#inputName").val(info.username);
				span.filter("#age").text(info.age);
				$("#inputAge").val(info.age)
				span.filter("#phone").text(info.phonenumber);
				$("#inputPhone").val(info.phonenumber)
			}
			else{
				alert("获取信息失败");
			}
		},
		error:function(){
			alert("获取信息出现错误");
		}
	})
}

function alterInfo(){
	var name=$("#inputName").val();
	var age=$("#inputAge").val();
	var phone=$("#inputPhone").val();
	if(isEmptyString(name) || isEmptyString(age) || isEmptyString(phone)){
		alert("请填写全信息");
	}
	else{
		$.ajax({
			type:"POST",
			url:"../user/updateUser.do",
			dataType:"JSON",
			data:{
				"userid":userid,
				"password":info.password,
				"username":name,
				"age":age,
				"power":power,
				"IDnumber":info.idnumber,
				"phonenumber":phone

			},
			success:function(data){
				if(data.code==0){
					alert("修改成功");
					window.location.reload();
				}
				else
					alert("修改失败")
			},
			error:function(){
				alert("修改信息出现错误");
			}
		})
	}
}

function alterPwd(){
	var oldPwd=$("#inputoldPwd").val();
	var newPwd=$("#inputnewPwd").val();
	var renewPwd=$("#inputrenewPwd").val();
	if(isEmptyString(oldPwd) || isEmptyString(newPwd) || isEmptyString(renewPwd)){
		alert("请填写全信息");
	}
	else if(oldPwd!=info.password)
		alert("原密码不正确");
	else if(newPwd!=renewPwd)
		alert("新密码输入错误")
	else{
		$.ajax({
			type:"POST",
			url:"../user/updateUser.do",
			dataType:"JSON",
			data:{
				"userid":userid,
				"password":newPwd

			},
			success:function(data){
				if(data.code==0){
					alert("修改成功");
					window.location.reload();
				}
				else
					alert("修改失败")
			},
			error:function(){
				alert("修改密码出现错误");
			}
		})
	}
}

function getSalary(){
	if(power!="0"){
		$("#showS").css("display","block");
		$("#showC").css("display","block");
		$.ajax({
			type:"POST",
			url:"../config/getConfig.do",
			dataType:"JSON",
			data:{},
			success:function(data){
				if(data.code=="0"){
					var config=data.config;
					if(power=="1"){
						$("#salary").text(config.manage);
						$("#commission").text(config.managesalary);
					}
					else if(power=="2"){
						$("#salary").text(config.staff);
						$("#commission").text(config.staffsalary);
					}
					else{
						$("#salary").text(config.cleaner);
						$("#commission").text(config.cleanersalary);
					}
					
				}
				else{
					alert("获取配置错误");
				}

			},
			error:function(){
				alert("获取配置发生错误")
			}

		});
	}
}