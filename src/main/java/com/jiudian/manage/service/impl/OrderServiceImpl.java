package com.jiudian.manage.service.impl;

import com.jiudian.manage.mapper.OrderMapper;
import com.jiudian.manage.mapper.RoomMapper;
import com.jiudian.manage.model.Order;
import com.jiudian.manage.model.Room;
import com.jiudian.manage.service.OrderService;
import com.jiudian.manage.until.TimeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    OrderMapper orderMapper;
    @Autowired
    RoomMapper roomMapper;

    @Override
    public boolean addOrder(String householdname, String id, String starttime, String endtime, int roomid, int userid) {
        Room room = roomMapper.selectByPrimaryKey(roomid);
        Order order = new Order();
        order.setHouseholdname(householdname);
        order.setId(id);
        order.setStarttime(TimeUtil.formatterTime(starttime));
        order.setEndtime(TimeUtil.formatterTime(endtime));
        order.setRoomid(roomid);
        order.setUserid(userid);
        order.setState(0);
        order.setMoney(TimeUtil.getBetweenDay(starttime,endtime)*room.getMoney());
        int insert = orderMapper.insertSelective(order);
        if(insert>0){
            Room room1 = new Room();
            room1.setRoomid(roomid);
            room1.setState(2);
            int i = roomMapper.updateByPrimaryKeySelective(room1);
            if(i>0){
                return true;
            }else{
                return false;
            }
        }else {
            return false;
        }
    }

    @Override
    public boolean DelOrder(int orderid) {
        return false;
    }
}
