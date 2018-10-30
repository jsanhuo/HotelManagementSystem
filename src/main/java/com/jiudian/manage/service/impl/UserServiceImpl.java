package com.jiudian.manage.service.impl;

import com.github.pagehelper.PageHelper;
import com.jiudian.manage.mapper.UserMapper;
import com.jiudian.manage.model.User;
import com.jiudian.manage.service.UserService;
import com.jiudian.manage.until.UUIDUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserMapper userMapper;

    @Override
    public User selectUser(int userid) {
        return userMapper.selectByPrimaryKey(userid);
    }

    public boolean addUser(String account, String password, int power){
        User user = new User();
        user.setUseraccount(account);
        user.setPassword(password);
        user.setPower(power);
        user.setIdnumber(UUIDUtil.generateShortUuid());
        int insert = userMapper.insertSelective(user);
        return insert>0?true:false;
    }

    @Override
    public boolean delUser(int userid) {
        int i = userMapper.deleteByPrimaryKey(userid);
        return i>0?true:false;
    }

    @Override
    public boolean alterUser(int userid, String password, String username, int age, int power, String IDnumber,String phonenumber) {
        User user = new User();
        user.setUserid(userid);
        if(!password.equals("null")){
            user.setPassword(password);
        }
        if(!username.equals("null")){
            user.setUsername(username);
        }
        if(age!=-1){
            user.setAge(age);
        }
        if(power!=-1){
            user.setPower(power);
        }
        if(!IDnumber.equals("null")){
            user.setIdnumber(IDnumber);
        }
        if(!phonenumber.equals("null")){
            user.setPhonenumber(phonenumber);
        }
        int i = userMapper.updateByPrimaryKeySelective(user);
        return i>0?true:false;
    }

    @Override
    public boolean addSlary(int userid, double money) {
        User user = userMapper.selectByPrimaryKey(userid);
        Double money1 = user.getMoney();
        user.setMoney(money+money1);
        int i = userMapper.updateByPrimaryKey(user);
        return i>0?true:false;
    }

    @Override
    public List<User> getAllUser(int pageNum,int pageSize) {
        PageHelper.startPage(pageNum,pageSize);
        return userMapper.getAllUser();
    }

    @Override
    public List<User> getUserByPower(int power,int pageNum,int pageSize) {
        PageHelper.startPage(pageNum,pageSize);
        return userMapper.selectByPower(power);
    }

    @Override
    public int[] login(String username, String password) {
        User user = userMapper.selectByAccount(username);
        if(user!=null&&user.getPassword().equals(password)){
            return new int[]{user.getUserid(),user.getPower()};
        }else{
            return null;
        }
    }

    @Override
    public boolean photo(int userid, String url) {
        User user = new User();
        user.setUserid(userid);
        user.setPhotourl(url);
        int i = userMapper.updateByPrimaryKeySelective(user);
        return i>0?true:false;
    }


}
