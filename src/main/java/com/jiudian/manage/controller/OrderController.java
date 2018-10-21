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
        StateSignal signal = new StateSignal();
        if(false){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return  signal.getResult();
    }
}
