var pageNum=1;
var pageSize=8;
var l;

$(document).ready(function(){
	getroomList();
	$("#pre").on('click',function(){
		getPre();
	});
	$("#next").on('click',function(){
		getNext();
	});
	$("#addRoomBtn").on('click',function(){
		addRoom();
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
function getroomList(){
	$.ajax({
		type:"post",
		url:"../room/getRoom.do",
		dataType:"JSON",
		data:{
			"state":"-1",
			"type":"-1",
			"pageNum":pageNum,
			"pageSize":pageSize		
		},
		success:function(data){
			if(isEmptyObject(data.List)&&pageNum>0){
				pageNum=pageNum-1;
				getroomList();
			}
			else{
				list=data.List;
				var power=" ";
				var htmlStr=" ";
				var btnStr=" ";
				var state=" ";
				var type=" ";
				l=0;
				$("#pre").css("display","block");
				$("#next").css("display","block");
				$("#roomList").empty();
				$("#roomList").append("<tr><th>位置</th><th>价格</th><th>状态</th><th>类型</th><th>操作</th></tr>")
				for(i in list){
					if(list[i].state=="0"){
						state="停用";
						btnStr="<input type=\"button\" class=\"btn btn-info\" data-roomid=\""+list[i].roomid+"\" id=\"setStart\" value=\"开始使用\"> <input type=\"button\" class=\"btn btn-success\"  data-toggle=\"modal\" data-target=\"#alterRoom\"  data-roomid=\""+list[i].roomid+"\" id=\"setRoom\" value=\"修改信息\"> <input type=\"button\" class=\"btn btn-danger\" data-roomid=\""+list[i].roomid+"\" value=\"删除\" id=\"delRoom\">";
					}
					else if(list[i].state=="1"){
						state="未预定";
						btnStr="<input type=\"button\" class=\"btn btn-info\" data-roomid=\""+list[i].roomid+"\" id=\"setStop\" value=\"改为停用\"> <input type=\"button\" class=\"btn btn-success\"  data-toggle=\"modal\" data-target=\"#alterRoom\"  data-roomid=\""+list[i].roomid+"\" id=\"setRoom\" value=\"修改信息\"> <input type=\"button\" class=\"btn btn-danger\" data-roomid=\""+list[i].roomid+"\" value=\"删除\" id=\"delRoom\">";
					}
					else if(list[i].state=="2"){
						state="已预定(入住)";
						btnStr="<input type=\"button\" class=\"btn btn-success\"  data-toggle=\"modal\" data-target=\"#alterRoom\"  data-roomid=\""+list[i].roomid+"\" id=\"setRoom\" value=\"修改信息\">";
					}
					else{
						state="待清扫";
						btnStr="<input type=\"button\" class=\"btn btn-info\" data-roomid=\""+list[i].roomid+"\" id=\"setStop\" value=\"改为停用\"> <input type=\"button\" class=\"btn btn-success\"  data-toggle=\"modal\" data-target=\"#alterRoom\"  data-roomid=\""+list[i].roomid+"\" id=\"setRoom\" value=\"修改信息\"> <input type=\"button\" class=\"btn btn-danger\" data-roomid=\""+list[i].roomid+"\" value=\"删除\" id=\"delRoom\">";
					}

					if(list[i].type=="1")
						type="单人间";
					else if(list[i].type=="2")
						type="双人间";
					else if(list[i].type=="3")
						type="大床房";
					else
						type="套房"

					htmlStr="<tr data-roomid=\""+list[i].roomid+"\"><td>"+list[i].local+"</td><td>"+list[i].money+"</td><td>"+state+"</td><td>"+type+"</td><td>"+btnStr+"</td></tr>";
					$("#roomList").append(htmlStr);
					l++;
				}
				if(pageNum=="1") $("#pre").css("display","none");
				if(pageSize>l) $("#next").css("display","none");
				btnOn();
			}

		},
		error:function(){
			alert("获取房间列表发生错误")
		}
	})
}

function btnOn(){
	$("input").filter("#delRoom").on('click',function(event){
		delRoom(event);
	});
	$("input").filter("#setPageBtn").on('click',function( ){
		setPage( );
	})
	$("input").filter("#setStop").on('click',function(event){
		setState(event,"0");
	});
	$("input").filter("#setStart").on('click',function(event){
		setState(event,"1");
	});
	$("input").filter("#setRoomBtn").on('click',function( ){
		setRoomajax( );
	});
	$("input").filter("#setRoom").on('click',function(event){
		setRoom(event);
	});
}

function getPre(){
	pageNum=pageNum-1;
	getroomList();
}

function getNext(){
	pageNum=pageNum+1;
	getroomList();	
}

function setRoom(event){
	var roomid=$(event.target).data("roomid");
	var info;
	for(i in list){
		if(list[i].roomid==roomid){
			info=list[i];
		}
	}
	$("#reinputLocal").val(info.local);
	$("#reinputPrice").val(info.money);
	$("#reinputType").val(info.type);
	$("#reinputid").val(roomid);
}

function setRoomajax( ){
	$.ajax({
		type:"POST",
		url:"../room/updateRoom.do",
		dataType:"JSON",
		data:{
			"roomid":$("#reinputid").val(),
			"money":$("#reinputPrice").val(),
			"type":$("#reinputType").val(),
			"local":$("#reinputLocal").val()
		},
		success:function(data){
			if(data.code==0){
				alert("修改成功");
				$("#reinputLocal").val("");
				$("#reinputPrice").val("");
				$("#reinputType").val("");
				$("#reinputid").val("");
				$('#alterRoom').modal('toggle');
				getroomList();
			}
			else{
				alert("修改失败");
				getroomList();
			}
		},
		error:function(){
			alert("修改信息出现错误");
		}
	})
}

function setState(event,alter){
	var roomid=$(event.target).data("roomid");
	$.ajax({
		type:"POST",
		url:"../room/updateRoom.do",
		dataType:"JSON",
		data:{
			"roomid":roomid,
			"state":alter
		},
		success:function(data){
			if(data.code==0){
				alert("修改成功");
				getroomList();
			}
			else
				alert("修改失败")
		},
		error:function(){
			alert("修改信息出现错误");
		}
	})
}

function setPage(){
	
	if($("#inputPage").val()<0 || $("#inputPage").val()==0)
		alert("请输入正确页码");
	else{
		pageNum=$("#inputPage").val();
		getroomList();
	}
	
}


function delRoom(event){
	var roomid=$(event.target).data("roomid");
	$.ajax({
		type:"POST",
		url:"../room/delRoom.do",
		dataType:"JSON",
		data:{
			"roomid":roomid
		},
		success:function(data){
				if(data.code==0){
					alert("删除成功");
				if(l==1)
					pageNum=pageNum-1;
				getroomList();
			}
			else
				alert("删除失败")
		},
		error:function(){
			alert("删除出现错误");
		}
	})

}

function addRoom(){
	if(isEmptyString($("#inputLocal").val())||isEmptyString($("#inputLocal").val())||isEmptyString($("#inputType").val()))
		alert("请填写全内容");
	else{
		$.ajax({ 
			type:"POST",
			url:"../room/addRoom.do",
			dataType:"JSON",
			data:{
				"local":$("#inputLocal").val(),
				"money":$("#inputPrice").val(),
				"state":"1",
				"type":$("#inputType").val()
			},
			success:function(data){
				if(data.code==0){
					alert("添加成功");
					$('#addRoom').modal('toggle');
					$("#inputLocal").val();
					$("#inputPrice").val();
					$("#inputType").val();
					window.location.reload();
				}
				else{
					alert("添加失败");
					window.location.reload();
				}
			},
			error:function(){
				alert("添加出现错误");
			}
		})
	}
	
}
