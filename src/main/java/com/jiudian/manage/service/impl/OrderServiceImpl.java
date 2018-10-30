package com.jiudian.manage.service.impl;

import com.github.pagehelper.PageHelper;
import com.jiudian.manage.mapper.OrderMapper;
import com.jiudian.manage.mapper.RoomMapper;
import com.jiudian.manage.model.Order;
import com.jiudian.manage.model.Room;
import com.jiudian.manage.service.OrderService;
import com.jiudian.manage.until.TimeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    OrderMapper orderMapper;
    @Autowired
    RoomMapper roomMapper;

    @Override
    public boolean addOrder(String householdname, String id, String starttime, String endtime, int roomid, int userid) {
        Room room = roomMapper.selectByPrimaryKey(roomid);
        if(room.getState()!=1){
            return false;
        }
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
    public boolean delOrder(int orderid) {
        Order order = orderMapper.selectByPrimaryKey(orderid);
        Integer roomid = order.getRoomid();
        Room room = new Room();
        room.setRoomid(roomid);
        room.setState(1);
        int i = roomMapper.updateByPrimaryKeySelective(room);
        if(i>0){
            int i1 = orderMapper.deleteByPrimaryKey(orderid);
            if(i1>0){
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean updateOrderState(int orderid, int state) {
        Order order = orderMapper.selectByPrimaryKey(orderid);
        if(order==null){
            return false;
        }
        Integer roomid = order.getRoomid();
        Room room = new Room();
        room.setRoomid(roomid);
        if(state==2){
            room.setState(3);
        }
        if(state==3){
            room.setState(1);
        }
        order.setState(state);
        int i = roomMapper.updateByPrimaryKeySelective(room);
        if(i>0){
            int i1 = orderMapper.updateByPrimaryKeySelective(order);
            if(i1>0){
                return true;
            }
        }
        return false;
    }

    @Override
    public List<Order> getAllOrder(int pageNum, int pageSize) {
        PageHelper.startPage(pageNum,pageSize);
        return orderMapper.getAllUser();
    }
}
