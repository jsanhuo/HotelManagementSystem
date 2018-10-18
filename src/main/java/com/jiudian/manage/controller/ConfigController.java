package com.jiudian.manage.controller;

import com.jiudian.manage.model.Config;
import com.jiudian.manage.service.ConfigService;
import com.jiudian.manage.until.State;
import com.jiudian.manage.until.StateSignal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping(value = "/config")
public class ConfigController {
    @Autowired
    ConfigService configService;

    @RequestMapping(value = "/getConfig.do")
    public Map getConfig(){
        Config config = configService.get();
        StateSignal signal = new StateSignal();
        if(config!=null){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
            signal.put("config",config);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return signal.getResult();
    }
}
