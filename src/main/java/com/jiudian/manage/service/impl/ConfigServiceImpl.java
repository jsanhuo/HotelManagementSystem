package com.jiudian.manage.service.impl;

import com.jiudian.manage.mapper.ConfigMapper;
import com.jiudian.manage.model.Config;
import com.jiudian.manage.service.ConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConfigServiceImpl implements ConfigService {
    @Autowired
    ConfigMapper configMapper;

    @Override
    public Config get() {
        return configMapper.selectByPrimaryKey(1);
    }

    @Override
    public boolean update(double managesalary, double staffsalary, double cleanerssalary, double manage, double staff, double cleaner, double totalmoney, double totalroom) {
        Config config = new Config();
        config.setId(1);
        config.setManagesalary(managesalary);
        config.setStaffsalary(staffsalary);
        config.setCleanerssalary(cleanerssalary);
        config.setManage(manage);
        config.setStaff(staff);
        config.setCleaner(cleaner);
        config.setTotalmoney(totalmoney);
        config.setTotalroom(totalroom);
        int i = configMapper.updateByPrimaryKey(config);
        return i>0?true:false;
    }
}
