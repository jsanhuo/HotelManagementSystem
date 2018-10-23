package com.jiudian.manage.controller;

import com.jiudian.manage.service.OrderService;
import com.jiudian.manage.service.impl.OrderServiceImpl;
import com.jiudian.manage.until.State;
import com.jiudian.manage.until.StateSignal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping(value = "/order")
public class OrderController {
    @Autowired
    OrderServiceImpl orderService;

    /**
     * 添加订单
     * @param householdname 入住人姓名
     * @param id            入住人身份证号
     * @param starttime     开始时间
     * @param endtime       结束时间
     * @param roomid        房间id
     * @param userid        用户id
     * @return
     */
    @RequestMapping("/addOrder.do")
    public Map addOrder(@RequestParam String householdname,@RequestParam String id,@RequestParam String starttime,@RequestParam String endtime,@RequestParam int roomid,@RequestParam int userid){
        boolean b = orderService.addOrder(householdname, id, starttime, endtime, roomid, userid);
        StateSignal signal = new StateSignal();
        if(b){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return  signal.getResult();
    }

    /**
     * 删除订单（管理员权限）
     * @param orderid 订单id
     * @return
     */
    @RequestMapping("/delOrder.do")
    public Map delOrder(@RequestParam int orderid){
        boolean b = orderService.delOrder(orderid);
        StateSignal signal = new StateSignal();
        if(b){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return  signal.getResult();
    }

    /**
     * 修改订单的状态
     * @param orderid   订单id
     * @param state     状态码
     * @return
     */
    @RequestMapping("/updateOrderState.do")
    public Map updateOrderState(@RequestParam int orderid,@RequestParam int state){
        boolean b = orderService.updateOrderState(orderid, state);
        StateSignal signal = new StateSignal();
        if(b){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return  signal.getResult();
    }

}
