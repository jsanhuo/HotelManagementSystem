var pageNum=1;
var pageSize=8;
var l;

$(document).ready(function(){
	getStaffList();
	$("#pre").on('click',function(){
		getPre();
	});
	$("#next").on('click',function(){
		getNext();
	});
	$("#addUserBtn").on('click',function(){
		addUser();
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



var list;
function getStaffList(){
	$.ajax({
		type:"post",
		url:"../user/getUserByPower.do",
		dataType:"JSON",
		data:{
			"pageNum":pageNum,
			"pageSize":pageSize,
			"power":"2"
		},
		success:function(data){
			if(data.code=="0"){
				if(isEmptyObject(data.List)&&pageNum>0){
					pageNum=pageNum-1;
					getStaffList();
				}
				else{
					var power=" ";
					var htmlStr=" ";
					var btnStr=" ";
					list=data.List;
					l=0;
					$("#pre").css("display","block");
					$("#next").css("display","block");
					$("#staffList").empty();
					$("#staffList").append("<tr><th>账号</th><th>员工号</th><th>姓名</th><th>年龄</th><th>职位</th><th>联系方式</th><th>操作</th></tr>")
					for(i in list){
						btnStr="<input type=\"button\" id=\"delUser\" data-userid=\""+list[i].userid+"\" class=\"btn btn-danger\" value=\"删除\"/>"
						htmlStr="<tr data-userid=\""+list[i].userid+"\"><td>"+list[i].useraccount+"</td><td>"+list[i].idnumber+"</td><td>"+list[i].username+"</td><td>"+list[i].age+"</td><td>"+"员工"+"</td><td>"+list[i].phonenumber+"</td><td>"+btnStr+"</td></tr>";
						$("#staffList").append(htmlStr);
						//console.log(htmlStr);
						l++;
					}
					if(pageNum=="1") $("#pre").css("display","none");
					if(pageSize>l) $("#next").css("display","none");
					btnOn();
				}
			}
			else{
				alert("获取员工列表失败");
			}
			

		},
		error:function(){
			alert("获取员工列表发生错误")
		}
	})
}

function btnOn(){
	$("input").filter("#delUser").on('click',function(event){
		delUser(event);
	});
	$("input").filter("#setPageBtn").on('click',function( ){
		setPage( );
	})
}

function getPre(){
	pageNum=pageNum-1;
	getStaffList();
}

function getNext(){
	pageNum=pageNum+1;
	getStaffList();	
}


function setPage(){
	
	if($("#inputPage").val()<0 || $("#inputPage").val()==0)
		alert("请输入正确页码");
	else{
		pageNum=$("#inputPage").val();
		getStaffList();
	}
	
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
					alert("删除成功");
				if(l==1)
					pageNum=pageNum-1;
				getStaffList();
			}
			else
				alert("删除失败")
		},
		error:function(){
			alert("删除出现错误");
		}
	})

}

function addUser(){
	if(isEmptyString($("#inputAccount").val())||isEmptyString($("#inputPwd").val()))
		alert("请填写全内容");
	else{
		$.ajax({
			type:"POST",
			url:"../user/addUser.do",
			dataType:"JSON",
			data:{
				"useraccount":$("#inputAccount").val(),
				"password":$("#inputPwd").val(),
				"power":"2"
			},
			success:function(data){
				if(data.code==0){
					alert("添加成功");
					$('#addUser').modal('toggle');
					$("#inputAccount").val("");
					$("#inputPwd").val("")
					getStaffList();
				}
				else
					alert("添加失败")
			},
			error:function(){
				alert("添加用户出现错误");
			}
		})
	}
	
}