package com.jiudian.manage.controller;

import com.jiudian.manage.model.User;
import com.jiudian.manage.service.impl.UserServiceImpl;
import com.jiudian.manage.until.State;
import com.jiudian.manage.until.StateSignal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/user")
public class UserController {
    @Autowired
    UserServiceImpl userService;

    /**
     * 登录(已测试)
     * @param useraccount
     * @param password
     * @return
     */
    @RequestMapping(value = "/login.do")
    public Map login(@RequestParam String useraccount,@RequestParam String password){
        int[] login = userService.login(useraccount, password);
        StateSignal signal = new StateSignal();
        if(login!=null){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
            signal.put("userid",login[0]);
            signal.put("power",login[1]);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return signal.getResult();
    }

    /**
     * 添加用户(已测试)
     * @param useraccount  用户名
     * @param password  密码
     * @param power     权限
     * @return
     */
    @RequestMapping(value = "/addUser.do")
    public Map addUser(@RequestParam String useraccount, @RequestParam String password, @RequestParam String power){
        boolean add = userService.addUser(useraccount,password,Integer.parseInt(power));
        StateSignal signal = new StateSignal();
        if(add){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return signal.getResult();
    }

    /**
     * 修改用户数据(已测试)
     * @param userid
     * @param password
     * @param username
     * @param age
     * @param power
     * @param IDnumber
     * @return
     */
    @RequestMapping(value = "/updateUser.do")
    public Map updateUser(@RequestParam int userid,@RequestParam String password,@RequestParam String username,@RequestParam int age,@RequestParam int power,@RequestParam String IDnumber){
        boolean upd = userService.alterUser(userid, password, username, age, power, IDnumber);
        StateSignal signal = new StateSignal();
        if(upd){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return signal.getResult();
    }

    /**
     * 删除用户(已测试)
     * @param userid    用户id
     * @return
     */
    @RequestMapping(value = "/delUser.do")
    public Map delUser(@RequestParam("userid")Integer userid){
        boolean del = userService.delUser(userid);
        StateSignal signal = new StateSignal();
        if(del){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return signal.getResult();
    }

    /**
     * 获取用户列表(已测试)
     * @return
     */
    @RequestMapping(value = "/getAllUser.do")
    public Map getAllUser(){
        List<User> allUser = userService.getAllUser();
        StateSignal signal = new StateSignal();
        if(allUser!=null){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
            signal.put("List",allUser);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return  signal.getResult();
    }
    @RequestMapping(value = "/getUserByPower.do")
    public Map getUserByPower(@RequestParam int power){
        List<User> Users = userService.getUserByPower(power);
        StateSignal signal = new StateSignal();
        if(Users!=null){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
            signal.put("List",Users);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return  signal.getResult();
    }



}
