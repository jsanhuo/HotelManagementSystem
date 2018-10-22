package com.jiudian.manage.controller;

import com.jiudian.manage.model.User;
import com.jiudian.manage.service.impl.UserServiceImpl;
import com.jiudian.manage.until.ImageCode;
import com.jiudian.manage.until.State;
import com.jiudian.manage.until.StateSignal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
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
    public Map login(@RequestParam String useraccount, @RequestParam String password,@RequestParam String icode,HttpSession session){
        StateSignal signal = new StateSignal();
        String code = (String) session.getAttribute(ImageCode.CODENAME);
        System.out.println("session: "+code+"   实际"+icode);
        if(icode!=null&&code!=null&&icode.equals(code)){
            int[] login = userService.login(useraccount, password);
            if(login!=null){
                signal.put(State.SuccessCode);
                signal.put(State.SuccessMessage);
                signal.put("userid",login[0]);
                signal.put("power",login[1]);
            }else {
                signal.put(State.ErrorCode);
                signal.put(State.ErrorMessage);
            }
        }else{
            signal.put(State.ErrorCode);
            signal.put("message","验证码输入错误");
        }
        return signal.getResult();
    }

    @GetMapping("/createImage")
    public void createImage(@RequestParam String code, HttpServletResponse response, HttpSession session) throws IOException {
        ImageCode.createImage(response,session);
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
    public Map updateUser(@RequestParam int userid,@RequestParam String password,@RequestParam String username,@RequestParam int age,@RequestParam int power,@RequestParam String IDnumber,@RequestParam String phonenumber){
        boolean upd = userService.alterUser(userid, password, username, age, power, IDnumber,phonenumber);
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
    public Map getAllUser(@RequestParam int pageNum,@RequestParam int pageSize){
        List<User> allUser = userService.getAllUser(pageNum,pageSize);
        StateSignal signal = new StateSignal();
        if(allUser!=null){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
            signal.put("List",allUser);
            signal.put("pageNum",pageNum);
            signal.put("pageSize",pageSize);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }

        return  signal.getResult();
    }

    /**
     * 获取对应权限的用户列表
     * @param power
     * @return
     */
    @RequestMapping(value = "/getUserByPower.do")
    public Map getUserByPower(@RequestParam int power,@RequestParam int pageNum,@RequestParam int pageSize){
        List<User> Users = userService.getUserByPower(power,pageNum,pageSize);
        StateSignal signal = new StateSignal();
        if(Users!=null){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
            signal.put("List",Users);
            signal.put("pageNum",pageNum);
            signal.put("pageSize",pageSize);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return  signal.getResult();
    }

    /**
     * 通过userid获取信息
     * @param userid 用户id
     * @return
     */
    @RequestMapping(value = "/getUserById.do")
    public Map getUserById(@RequestParam int userid){
        User user = userService.selectUser(userid);
        StateSignal signal = new StateSignal();
        if(user!=null){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
            signal.put("user",user);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return  signal.getResult();
    }


}
