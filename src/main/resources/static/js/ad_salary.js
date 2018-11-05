$(document).ready(function(){
	getConfig();
	$("#showConfig").click(function(){
		changeTab();
	});
	$("#alterConfig").click(function(){
		changeTab();
	});
	$("#alterConfigBtn").click(function(){
		alterConfig();
	})
})

var config;

//判断字符串是否为空 空返回1 非空返回0
function isEmptyString(str){
	if(str=='null'||str=='')
		return 1;
	return 0;
}


function getConfig(){
	$.ajax({
		type:"POST",
		url:"../config/getConfig.do",
		dataType:"JSON",
		data:{},
		success:function(data){
			if(data.code=="0"){
				config=data.config;
				var htmlStr="<tr><td>经理</td><td>"+config.manage+"</td><td>"+config.managesalary+"%</td></tr>"+
				"<tr><td>员工</td><td>"+config.staff+"</td><td>"+config.staffsalary+"<%/td></tr>"+
				"<tr><td>清洁工</td><td>"+config.cleaner+"</td><td>"+config.cleanersalary+"<%/td></tr>";
				$("#configList").append(htmlStr);
				$("#inputMS").val(config.manage);
				$("#inputSS").val(config.staff);
				$("#inputCS").val(config.cleaner);
				$("#inputM").val(config.managesalary);
				$("#inputS").val(config.staffsalary);
				$("#inputC").val(config.cleanersalary);
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

function changeTab(){
	var info=$("#showConfigDiv").css("display");
	var alter=$("#alterConfigDiv").css("display");
	if(info=="block"){
		$("#showConfigDiv").css("display","none");
		$("#alterConfigDiv").fadeIn();	
	}
	else{
		$("#alterConfigDiv").css("display","none")
		$("#showConfigDiv").fadeIn();
	}
}

function alterConfig(){
	if(isEmptyString($("#inputMS").val())||isEmptyString($("#inputM").val())||isEmptyString($("#inputSS").val())||isEmptyString($("#inputS").val())||isEmptyString($("#inputCS").val())||isEmptyString($("#inputC").val()))
		alert("请填写全内容");
	else{
		$.ajax({
			type:"POST",
			url:"../config/updateConfig.do",
			dataType:"JSON",
			data:{
				"managesalary":$("#inputM").val(),
				"staffsalary":$("#inputS").val(),
				"cleanersalary":$("#inputC").val(),
				"manage":$("#inputMS").val(),
				"staff":$("#inputSS").val(),
				"cleaner":$("#inputCS").val()
			},
			success:function(data){
				if(code=="0"){
					alert("修改成功");
					window.location.reload();
				}
				else{
					alert("修改配置错误");
				}

			},
			error:function(){
				alert("修改配置发生错误")
			}

		});

	}
}