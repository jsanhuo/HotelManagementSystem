(function($){
	$.getData=function(name){
		var reg=new RegExp("(^|&)"+name+"=([^&]+)(&|$)?");
		var result = window.location.search.substr(1).match(reg);
		if (result!= null) return result[2]; return null;		
	}
})(jQuery);

var power=$.getData('power');
var userid=$.getData('userid');


$(document).ready(function(){
	$("#mainFrame").attr("src","all_infor.html?userid="+userid+"&power="+power);
	$("inputNone").attr("value",userid);
	var h=$(window).height();
	$("#tagList").css("height",h);
	$("#mainFrame").css("height",h);
	setList();
})

function setList(){
	var tagList=" ";
	if(power=="0"){
		tagList="<a href=\"all_infor.html?userid="+userid+"&power="+power+"\"  target=\"mainFrame\" class=\"list-group-item active\"><span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span>个人信息</a><a href=\"ad_manage.html\"  target=\"mainFrame\" class=\"list-group-item\"><span class=\"glyphicon glyphicon-list\" aria-hidden=\"true\"></span>人员管理</a><a href=\"ad_salary.html\"  target=\"mainFrame\" class=\"list-group-item\"><span class=\"glyphicon glyphicon-usd\" aria-hidden=\"true\"></span>工资管理</a><a href=\"ad_gather.html\"  target=\"mainFrame\" class=\"list-group-item\"><span class=\"glyphicon glyphicon-file\" aria-hidden=\"true\"></span>业绩查看</a>"
	}
	else if(power=="1"){
		tagList="<a href=\"all_infor.html?userid="+userid+"&power="+power+"\" target=\"mainFrame\" class=\"list-group-item active\"><span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span>个人信息</a><a href=\"ad_staff.html\" target=\"mainFrame\" class=\"list-group-item\"><span class=\"glyphicon glyphicon-list\" aria-hidden=\"true\"></span>员工管理</a><a href=\"ad_room.html\"  target=\"mainFrame\" class=\"list-group-item\"><span class=\"glyphicon glyphicon-home\" aria-hidden=\"true\"></span>房间管理</a><a href=\"ad_order.html\"  target=\"mainFrame\" class=\"list-group-item\"><span class=\"glyphicon glyphicon-shopping-cart\" aria-hidden=\"true\"></span> 查看订单</a>"
	}
	else if(power=="2"){
		tagList="<a href=\"all_infor.html?userid="+userid+"&power="+power+"\"  target=\"mainFrame\" class=\"list-group-item active\"><span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span>个人信息</a><a href=\"staff_add.html\"  target=\"mainFrame\" class=\"list-group-item\"><span class=\"glyphicon glyphicon-home\" aria-hidden=\"true\"></span>订房</a><a href=\"staff_order.html\"  target=\"mainFrame\" class=\"list-group-item\"><span class=\"glyphicon glyphicon-shopping-cart\" aria-hidden=\"true\"></span> 订单管理</a>"
	}
	else if(power=="3"){
		tagList="<a href=\"all_infor.html?userid="+userid+"&power="+power+"\"  target=\"mainFrame\" class=\"list-group-item active\"><span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span>个人信息</a><a href=\"staff_room.html\"  target=\"mainFrame\" class=\"list-group-item\"><span class=\"glyphicon glyphicon-home\" aria-hidden=\"true\"></span>房间管理</a>"
	}
	$("#tagList").append(tagList);
	tagList=$("#tagList").children("a");
	tagList.on('click',function(event){
		changeColor(event)
	});
}

function changeColor(event){
	var obj=event.target;
	var objSi=$(obj).siblings();
	$(obj).attr("class","list-group-item active");
	$(objSi).attr("class","list-group-item ");
}