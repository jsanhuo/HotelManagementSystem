package com.jiudian.manage.service;

import com.jiudian.manage.model.Config;

public interface ConfigService {
    public Config get();
    public boolean update(double managesalary,double  staffsalary, double cleanerssalary, double manage, double staff, double cleaner, double totalmoney, double totalroom);
}
