package com.jiudian.manage.controller;

import com.jiudian.manage.service.UserService;
import com.jiudian.manage.until.FileUtil;
import com.jiudian.manage.until.State;
import com.jiudian.manage.until.StateSignal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

@RestController
@RequestMapping(value = "/upFile")
public class FileController {
    @Autowired
    UserService userService;

    @RequestMapping("/upFilePhoto.do")
    public Map upFilePhoto(@RequestParam MultipartFile file,@RequestParam int userid){
        String fileName = UUID.randomUUID().toString()+file.getOriginalFilename();
        String filePath = ".\\src\\main\\resources\\static\\File\\";
        String RealfilePath = "File\\"+fileName;
        boolean photo = userService.photo(userid, RealfilePath);
        boolean b = false;
        try {
           b = FileUtil.uploadFile(file.getBytes(), filePath, fileName);
        } catch (Exception e) {
            e.printStackTrace();
        }
        StateSignal signal = new StateSignal();
        if(b&&photo){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return signal.getResult();
    }


}
