var pageNum=1;
var pageSize=3;
var l;

$(document).ready(function(){
	getroomList();
	$("#pre").on('click',function(){
		getPre();
	});
	$("#next").on('click',function(){
		getNext();
	});

})

//判断对象/JSON是否为空 空返回1 非空返回0
function isEmptyObject(e) {
	var t;
	for (t in e)
		return 0;
	return 1;
}


var list;
function getroomList(){
	$.ajax({
		type:"post",
		url:"../room/getRoom.do",
		dataType:"JSON",
		data:{
			"state":"3",
			"type":"-1",
			"pageNum":pageNum,
			"pageSize":pageSize			
		},
		success:function(data){
			if(isEmptyObject(data.List)){
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
				$("#roomList").append("<tr><th>位置</th><th>价格</th><th>状态</th><th>类型</th><th>操作</th></tr>");
				state="未清扫";
				for(i in list){		
					if(list[i].type=="1")
						type="单人间";
					else if(list[i].type=="2")
						type="双人间";
					else if(list[i].type=="3")
						type="大床房";
					else
						type="套房"
					btnStr="<input class=\"btn btn-success\" data-roomid=\""+list[i].roomid+"\" id=\"setRoom\" value=\"已清扫\">";
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

function btnOn(){;
	$("input").filter("#setPageBtn").on('click',function( ){
		setPage( );
	});
	$("input").filter("#setRoom").on('click',function(event ){
		setRoom(event);
	});
}

function setRoom(event){
	var roomid=$(event.target).data("roomid");
	$.ajax({
		type:"POST",
		url:"../room/updateRoom.do",
		dataType:"JSON",
		data:{
			"roomid":roomid,
			"state":"1"
		},
		success:function(data){
			if(data.code==0){
				alert("修改成功");
				getRoomList();
			}
			else
				alert("修改失败")
		},
		error:function(){
			alert("修改信息出现错误");
		}
	})
}

function getPre(){
	pageNum=pageNum-1;
	getroomList();
}

function getNext(){
	pageNum=pageNum+1;
	getroomList();	
}

function setPage(){
	if($("#inputPage").val()<0 || $("#inputPage").val()==0)
		alert("请输入正确页码");
	else{
		pageNum=$("#inputPage").val();
		getroomList();
	}
	
}

