package com.jiudian.manage.mapper;

import com.jiudian.manage.model.Config;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfigMapper {
    int insert(Config record);

    int insertSelective(Config record);
}