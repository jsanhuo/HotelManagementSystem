package com.jiudian.manage.mapper;

import com.jiudian.manage.model.Room;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomMapper {
    int deleteByPrimaryKey(Integer roomid);

    int insert(Room record);

    int insertSelective(Room record);

    Room selectByPrimaryKey(Integer roomid);

    int updateByPrimaryKeySelective(Room record);

    int updateByPrimaryKey(Room record);
}