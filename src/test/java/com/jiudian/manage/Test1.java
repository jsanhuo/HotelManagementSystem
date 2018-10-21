package com.jiudian.manage;


import com.jiudian.manage.until.TimeUtil;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.TimeUnit;

public class Test1 {
    public static void main(String[] args) throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        int betweenDay = TimeUtil.getBetweenDay("2018-9-10", "2018-10-10");
        System.out.println(betweenDay);
    }
}
