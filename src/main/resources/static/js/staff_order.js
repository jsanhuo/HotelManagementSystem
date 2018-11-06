var pageNum=1;
var pageSize=8;
var l;

$(document).ready(function(){
	getorderList();
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
		return 1;
	return 0;
}



var list;
function getorderList(){
	$.ajax({
		type:"post",
		url:"../order/getAllOrder.do",
		dataType:"JSON",
		data:{
			"pageNum":pageNum,
			"pageSize":pageSize		
		},
		success:function(data){
			if(isEmptyObject(data.List)&&pageNum>0){
				pageNum=pageNum-1;
				getorderList();
			}
			else{
				list=data.List;
				var htmlStr=" ";
				var btnStr=" ";
				var state=" ";
				var sdate;
				var edate;
				l=0;
				$("#pre").css("display","block");
				$("#next").css("display","block");
				$("#orderList").empty();
				$("#orderList").append("<tr><th>入住人</th><th>身份证号</th><th>开始时间</th><th>结束时间</th><th>总金额</th><th>状态</th><th>操作</th></tr>")
				for(i in list){
					sdate=/\d{4}-\d{1,2}-\d{1,2}/g.exec(list[i].starttime);
					edate=/\d{4}-\d{1,2}-\d{1,2}/g.exec(list[i].endtime);
					if(list[i].state=="0"){
						state="未付款";
						btnStr="<input type=\"button\"  class=\"btn btn-info\" data-roomid=\""+list[i].roomid+"\" id=\"showRoom\"  data-toggle=\"modal\" data-target=\"#showRoomT\" value=\"查看房间\"> <input type=\"button\"  class=\"btn btn-success\"  data-orderid=\""+list[i].orderid+"\" id=\"setPaied\" value=\"已收款\"> <input type=\"button\"  class=\"btn btn-danger\"  data-orderid=\""+list[i].orderid+"\" id=\"setNone\" value=\"取消\">";
					}
					else if(list[i].state=="1"){
						state="已付款";
						btnStr="<input type=\"button\"  class=\"btn btn-info\" data-roomid=\""+list[i].roomid+"\" id=\"showRoom\"  data-toggle=\"modal\" data-target=\"#showRoomT\" value=\"查看房间\"> <input type=\"button\"  class=\"btn btn-success\"  data-orderid=\""+list[i].orderid+"\" id=\"setFinish\" value=\"退房\">";
					}
					else if(list[i].state=="2"){
						state="已完成";
						btnStr="<input type=\"button\"  class=\"btn btn-info\" data-roomid=\""+list[i].roomid+"\" id=\"showRoom\"  data-toggle=\"modal\" data-target=\"#showRoomT\" value=\"查看房间\">";
					}
					else{
						state="已取消";
						btnStr="<input type=\"button\"  class=\"btn btn-info\" data-roomid=\""+list[i].roomid+"\" id=\"showRoom\"  data-toggle=\"modal\" data-target=\"#showRoomT\" value=\"查看房间\">";
					}
					htmlStr="<tr data-orderid=\""+list[i].orderid+"\"><td>"+list[i].householdname+"</td><td>"+list[i].id+"</td><td>"+sdate+"</td><td>"+edate+"</td><td>"+list[i].money+"</td><td>"+state+"</td><td>"+btnStr+"</td></tr>";
					$("#orderList").append(htmlStr);
					l++;
				}
				if(pageNum=="1") $("#pre").css("display","none");
				if(pageSize>l) $("#next").css("display","none");
				btnOn();
			}

		},
		error:function(){
			alert("获取订单列表发生错误")
		}
	})
}

function btnOn(){

	$("input").filter("#setPageBtn").on('click',function( ){
		setPage( );
	});
	$("input").filter("#showRoom").on('click',function(event){
		showRoom(event);
	})
	$("input").filter("#setPaied").on('click',function(event){
		setState(event,"1");
	});
	$("input").filter("#setFinish").on('click',function(event){
		setState(event,"2");
	});
	$("input").filter("#setNone").on('click',function(event){
		setState(event,"3");
	});

}

function getPre(){
	pageNum=pageNum-1;
	getorderList();
}

function getNext(){
	pageNum=pageNum+1;
	getorderList();	
}

function setState(event,alter){
	var orderid=$(event.target).data("orderid");
	$.ajax({
		type:"POST",
		url:"../order/updateOrderState.do",
		dataType:"JSON",
		data:{
			"orderid":orderid,
			"state":alter
		},
		success:function(data){
			if(data.code==0){
				alert("修改成功");
				getorderList();
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
		getorderList();
	}
	
}

function showRoom(event){
	var roomid=$(event.target).data("roomid");
	$.ajax({
		type:"POST",
		url:"../room/getRoomById.do",
		dataType:"JSON",
		data:{
			"roomid":roomid
		},
		success:function(data){
			if(data.code==0){
				var htmlStr=" ";
				var state=" ";
				var type=" ";
				var room=data.room;
				$("#roomTable").empty();
				if(room.state=="0")
					state="停用";
				else if(room.state=="1")
					state="未预定";
				else if(room.state=="2")
					state="已预定(入住)";
				else
					state="待清扫";
				if(room.type=="1")
					type="单人间";
				else if(room.type=="2")
					type="双人间";
				else if(room.type=="3")
					type="大床房";
				else
					type="套房";
				htmlStr="<tr><th>位置</th><td>"+room.local+"</td></tr><tr><th>价格</th><td>"+room.money+"</td></tr><tr><th>类型</th><td>"+type+"</td></tr><tr><th>状态</th><td>"+state+"</td></tr>"
				$("#roomTable").append(htmlStr);
			}
			else
				alert("获取失败")
		},
		error:function(){
			alert("获取信息出现错误");
		}
	})
}