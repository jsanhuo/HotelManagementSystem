package com.jiudian.manage.controller;

import com.google.gson.JsonObject;
import com.jiudian.manage.model.User;
import com.jiudian.manage.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    UserService userService;
    @RequestMapping(value = "/Test")
    public String Test(@RequestParam("username") String username,@RequestParam("password")String password){
        User user = new User();
        user.setUserid(1);
        user.setUsername(username);
        user.setPassword(password);
        userService.add(user);
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("username",username);
        jsonObject.addProperty("password",password);
        return jsonObject.toString();
    }

}
