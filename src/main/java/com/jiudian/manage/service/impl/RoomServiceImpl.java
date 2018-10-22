package com.jiudian.manage.service.impl;

import com.github.pagehelper.PageHelper;
import com.jiudian.manage.mapper.RoomMapper;
import com.jiudian.manage.model.Room;
import com.jiudian.manage.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomServiceImpl implements RoomService {
    @Autowired
    RoomMapper roomMapper;

    @Override
    public boolean addRoom(String local, double money, int state, int type) {
        Room room = new Room();
        room.setLocal(local);
        room.setMoney(money);
        room.setState(state);
        room.setType(type);
        int i = roomMapper.insertSelective(room);
        return i>0?true:false;
    }

    @Override
    public boolean delRoom(int roomid) {
        int i = roomMapper.deleteByPrimaryKey(roomid);
        return i>0?true:false;
    }

    @Override
    public boolean updateRoom(int roomid, String local, double money, int state, int type) {
        Room room = new Room();
        room.setRoomid(roomid);
        room.setLocal(local);
        room.setMoney(money);
        room.setState(state);
        room.setType(type);
        int i = roomMapper.updateByPrimaryKeySelective(room);
        return i>0?true:false;
    }

    @Override
    public boolean updateRoomState(int roomid, int state) {
        Room room = new Room();
        room.setRoomid(roomid);
        room.setState(state);
        int i = roomMapper.updateByPrimaryKeySelective(room);
        return i>0?true:false;
    }

    @Override
    public List<Room> getRoomByState(int state, int type,int pageNum,int pageSize) {
        Room room = new Room();
        if(state!=-1){
            room.setState(state);
        }
        if(type!=-1){
            room.setType(type);
        }
        PageHelper.startPage(pageNum,pageSize);
        return roomMapper.selectRoomByStateType(room);
    }
}
