package com.jiudian.manage.service;

import com.jiudian.manage.model.Room;

import java.util.List;

public interface RoomService {
    /**
     * 添加一个新房间
     * @param local 位置
     * @param money 价格
     * @param state 状态
     * @param type  类型
     * @return
     */
    public boolean addRoom(String local,double money,int state,int type);

    /**
     * 删除一个房间
     * @param roomid    房间id
     * @return
     */
    public boolean delRoom(int roomid);

    /**
     * 修改房间信息
     * @param roomid    房间id
     * @param local     房间位置
     * @param money     房间价格
     * @param state     房间状态
     * @param type      房间类型
     * @return
     */
    public boolean updateRoom(int roomid,String local,double money,int state,int type);

    /**
     * 修改房间状态
     * @param roomid    房间id
     * @param state     房间状态
     * @return
     */
    public boolean updateRoomState(int roomid,int state);

    /**
     * 获取某一状态或者类型的房间
     * @param state
     * @return
     */
    public List<Room> getRoomByState(int state,int type);


}
