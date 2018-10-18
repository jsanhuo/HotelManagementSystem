package com.jiudian.manage.service;

import com.jiudian.manage.model.User;

import java.util.List;

public interface UserService {
    /**
     * 添加用户
     * @param account 用户名
     * @param password  密码
     * @param power 权限
     * @return  是否添加成功
     */
    public boolean addUser(String account,String password,int power);

    /**
     * 删除用户
     * @param userid 账户名
     * @return 是否删除成功
     */
    public boolean delUser(int userid);

    /**
     * 修改用户信息
     * @param userid    用户id
     * @param password      用户面
     * @param username      用户真实姓名
     * @param age           用户年龄
     * @param power         用户权限
     * @param IDnumber      工号
     * @return              是否修改成功
     */
    public boolean alterUser(int userid,String password,String username,int age,int power,String IDnumber);

    /**
     * 修改用户的业绩(服务器内部调用)
     * @param userid    用户id
     * @param money     增加的业绩额
     * @return          是否成功
     */
    public boolean addSlary(int userid,double money);

    /**
     * 获得所有的用户
     * @return  返回List集合
     */
    public List<User> getAllUser();

    /**
     * 获取相应权限的用户
     * @param power
     * @return
     */
    public List<User> getUserByPower(int power);


    public int[] login(String username,String password);

}
