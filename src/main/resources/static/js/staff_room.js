(function($){
	$.getData=function(name){
		var reg=new RegExp("(^|&)"+name+"=([^&]+)(&|$)?");
		var result = window.location.search.substr(1).match(reg);
		if (result!= null) return result[2]; return null;		
	}
})(jQuery);

var staffid=$.getData("userid");
var pageNum=1;
var pageSize=3;
var l;

$(document).ready(function(){
	getroomList();

	$('#dateStart').datepicker({
		language: 'zh-CN',
		format: 'yyyy-mm-dd',
		autoclose: true
	}).on('changeDate',function(e){
		var startTime = e.date;
		$('#dateEnd').datepicker('setStartDate',startTime);
	});

	$('#dateEnd').datepicker({
		language: 'zh-CN',
		format: 'yyyy-mm-dd',
		autoclose: true
	}).on('changeDate',function(e){
		var endTime = e.date;
		$('#dateStart').datepicker('setEndDate',endTime);
	});


	$("#pre").on('click',function(){
		getPre();
	});
	$("#next").on('click',function(){
		getNext();
	});
	$("#addOrder").on('click',function(){
		addOrder();
	});

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
			"state":"1",
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
				state="未预定";
				for(i in list){		
					if(list[i].type=="1")
						type="单人间";
					else if(list[i].type=="2")
						type="双人间";
					else if(list[i].type=="3")
						type="大床房";
					else
						type="套房"
					btnStr="<input class=\"btn btn-success\" data-roomid=\""+list[i].roomid+"\" id=\"chooseRoom\" data-toggle=\"modal\" data-target=\"#chooseRoom\" value=\"生成订单\">";
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
	$("input").filter("#chooseRoom").on('click',function(event){
		chooseRoom(event);
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

function chooseRoom(event){
	var roomid=$(event.target).data("roomid");
	$("#inputRoom").val(roomid);
	for(i in list){
		if(list[i].roomid=roomid){
			$("span").filter("#inputLocal").text(list[i].local);
		}
	}
}

function addOrder(){
	if(isEmptyString($("#inputName").val())||isEmptyString($("#inputId").val())||isEmptyString($("#dateStart").val())||isEmptyString($("#dateEnd").val()))
		alert("请填写全内容");
	else{
		$.ajax({
			type:"POST",
			url:"../order/addOrder.do",
			dataType:"JSON",
			data:{
				"userid":userid,
				"roomid":$("#inputRoom").val(),
				"householdname":$("#inputName").val(),
				"id":$("#inputId").val(),
				"starttime":$("#dateStart").val(),
				"endtime":$("#dateEnd").val()
			},
			success:function(data){
				if(data.code==0){
					alert("添加成功");
					$("#inputRoom").val("");
					$("#inputName").val("");
					$("#inputId").val("");
					$("#dateStart").val("");
					$("#dateEnd").val("");
					$('#chooseRoom').modal('toggle');
					window.location.href="staff_order.html";
				}
			},
			error:function(){
				alert("添加订单出现错误");
			}
		})
	}
	

}

