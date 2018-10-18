package com.jiudian.manage.controller;

import com.jiudian.manage.service.impl.UserServiceImpl;
import com.jiudian.manage.until.CodeMessage;
import com.jiudian.manage.until.Signal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/user",produces="text/plain;charset=UTF-8")
public class UserController {
    @Autowired
    UserServiceImpl userService;
    @RequestMapping(value = "/add")
    public String AddUser(@RequestParam("username") String username,@RequestParam("password")String password,@RequestParam("power")String power){
        boolean add = userService.addUser(username,password,power);
        Signal signal = new Signal();
        if(add){
            signal.put(CodeMessage.SuccessCode);
            signal.put(CodeMessage.SuccessMessage);
        }else {
            signal.put(CodeMessage.ErrorCode);
            signal.put(CodeMessage.ErrorMessage);
        }
        return signal.getResult();
    }



}
