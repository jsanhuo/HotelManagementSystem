package com.jiudian.manage.service.impl;

import com.jiudian.manage.mapper.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl {
    @Autowired
    OrderMapper orderMapper;

}
