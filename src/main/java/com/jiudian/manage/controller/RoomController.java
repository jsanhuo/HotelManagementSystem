package com.jiudian.manage.controller;

import com.jiudian.manage.model.Room;
import com.jiudian.manage.service.RoomService;
import com.jiudian.manage.until.State;
import com.jiudian.manage.until.StateSignal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/room")
public class RoomController {
    @Autowired
    RoomService roomService;
    @RequestMapping("/addRoom.do")
    public Map addRoom(@RequestParam String local,@RequestParam double money,@RequestParam int state,@RequestParam int type){
        boolean b = roomService.addRoom(local, money, state, type);
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

    @RequestMapping("/delRoom.do")
    public Map delRoom(@RequestParam int roomid){
        boolean b = roomService.delRoom(roomid);
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
    @RequestMapping("/getRoom.do")
    public Map selectRoom(@RequestParam int state,@RequestParam int type,@RequestParam int pageNum,@RequestParam int pageSize){
        List<Room> roomByState = roomService.getRoomByState(state, type,pageNum,pageSize);
        StateSignal signal = new StateSignal();
        if(roomByState!=null){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
            signal.put("List",roomByState);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return  signal.getResult();
    }

    @RequestMapping("/updateRoom.do")
    public Map updateRoom(@RequestParam int roomid,@RequestParam(required = false,defaultValue = "null") String local,@RequestParam(required = false,defaultValue = "-1") double money,@RequestParam(required = false,defaultValue = "-1") int state,@RequestParam(required = false,defaultValue = "-1") int type){
        boolean b = roomService.updateRoom(roomid, local, money, state, type);
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
    @RequestMapping("/getRoomById.do")
    public Map getRoomById(@RequestParam int roomid){
        Room b = roomService.getRoomById(roomid);
        StateSignal signal = new StateSignal();
        if(b!=null){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
            signal.put("room",b);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return  signal.getResult();
    }



}
