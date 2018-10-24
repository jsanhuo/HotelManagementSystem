var pageNum=1;
var pageSize=8;

$(document).ready(function(){
	getStaffList();
	$("#pre").on('click',function(){
		getPre();
	});
	$("#next").on('click',function(){
		getNext();
	});

})


var list;
function getStaffList(){
	$.ajax({
		type:"post",
		url:"../user/getAllUser.do",
		dataType:"JSON",
		data:{
			"pageNum":pageNum,
			"pageSize":pageSize
		},
		success:function(data){
			var power=" ";
			var htmlStr=" ";
			var btnStr=" ";
			list=data.list;
			var l=0;
			$("#pre").css("display","block");
			$("#next").css("display","block");
			$("#staffList").empty();
			$("#staffList").append("<tr><th>账号</th><th>员工号</th><th>姓名</th><th>年龄</th><th>职位</th><th>联系方式</th><th>操作</th></tr>")
			for(i in list){
				if(list[i].power=="0") {
					power="管理员";
					btnStr=" ";
				}
				else if(list[i].power=="1") {
					power="经理";
					btnStr="<input type=\"button\" id=\"setStaff\" data-userid=\""+list[i].userid+"\" class=\"btn btn-success\" value=\"设置为员工\"/> <input type=\"button\" id=\"delUser\" data-userid=\""+list[i].userid+"\" class=\"btn btn-danger\" value=\"删除\"/>"
				}
				else if(list[i].power=="2") {
					power="员工";
					btnStr="<input type=\"button\" id=\"setManage\" data-userid=\""+list[i].userid+"\" class=\"btn btn-success\" value=\"设置为经理\"/> <input type=\"button\" id=\"setPwd\" data-userid=\""+list[i].userid+"\" class=\"btn btn-info\" value=\"重置密码\"/> <input type=\"button\" id=\"delUser\" data-userid=\""+list[i].userid+"\" class=\"btn btn-danger\" value=\"删除\"/>"
				}
				else {
					power="清洁工";
					btnStr="<input type=\"button\" id=\"setPwd\" data-userid=\""+list[i].userid+"\" class=\"btn btn-info\" value=\"重置密码\"/> <input type=\"button\" id=\"delUser\" data-userid=\""+list[i].userid+"\" class=\"btn btn-danger\" value=\"删除\"/> "
				}
				
				htmlStr="<tr data-userid=\""+list[i].userid+"\"><td>"+list[i].useraccount+"</td><td>"+list[i].idnumber+"</td><td>"+list[i].username+"</td><td>"+list[i].age+"</td><td>"+power+"</td><td>"+list[i].phonenumber+"</td><td>"+btnStr+"</td></tr>";
				$("#staffList").append(htmlStr);
				l++;
				console.log(htmlStr)
			}
			if(pageNum=="1") $("#pre").css("display","none");
			if(pageSize>l) $("#next").css("display","none");
			btnOn();

		},
		error:function(){
			alert("获取员工列表发生错误")
		}
	})
}

function btnOn(){
	$("input").filter("#setStaff").on('click',function(event){
		setStaff(event);
	});
	$("input").filter("#setManage").on('click',function(event){
		setManage(event);
	});
	$("input").filter("#setPwd").on('click',function(event){
		setPwd(event);
	});
	$("input").filter("#delUser").on('click',function(event){
		delUser(event);
	});
}

function getPre(){
	pageNum=pageNum-1;
	getStaffList();
}

function getNext(){
	pageNum=pageNum+1;
	getStaffList();
	
}

function setStaff(event){
	var userid=$(event.target).data("userid");
	var info;
	for(i in list){
		if(list[i].userid==userid){
			info=list[i];
		}
	}
	info.power="2";
	info=JSON.stringify(info);
	$.ajax({
		type:"POST",
		url:"../user/updateUser.do",
		dataType:"JSON",
		data:{
			info
		},
		success:function(data){
			if(data.code==0){
				alert("修改成功");
				getStaffList();
			}
			else
				alert("修改失败")
		},
		error:function(){
			alert("修改信息出现错误");
		}
	})

}

function setManage(event){
	var userid=$(event.target).data("userid");
	var info;
	for(i in list){
		if(list[i].userid==userid){
			info=list[i];
		}
	}
	info.power="1";
	info=JSON.stringify(info);
	$.ajax({
		type:"POST",
		url:"../user/updateUser.do",
		dataType:"JSON",
		data:{
			info
		},
		success:function(data){
			if(data.code==0){
				alert("修改成功");
				getStaffList();
			}
			else
				alert("修改失败")
		},
		error:function(){
			alert("修改信息出现错误");
		}
	})

}

function setPwd(event){
	var userid=$(event.target).data("userid");
	var info;
	for(i in list){
		if(list[i].userid==userid){
			info=list[i];
		}
	}
	info.password="111111";
	info=JSON.stringify(info);
	$.ajax({
		type:"POST",
		url:"../user/updateUser.do",
		dataType:"JSON",
		data:{
			info
		},
		success:function(data){
			if(data.code==0){
				alert("修改成功");
				getStaffList();
			}
			else
				alert("修改失败")
		},
		error:function(){
			alert("修改信息出现错误");
		}
	})
}

function delUser(event){
	var userid=$(event.target).data("userid");
	$.ajax({
		type:"POST",
		url:"../user/delUser.do",
		dataType:"JSON",
		data:{
			"userid":userid
		},
		success:function(data){
			if(data.code==0){
				alert("修改成功");
				getStaffList();
			}
			else
				alert("修改失败")
		},
		error:function(){
			alert("修改信息出现错误");
		}
	})

}