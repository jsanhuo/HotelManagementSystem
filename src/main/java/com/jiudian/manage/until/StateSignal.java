package com.jiudian.manage.until;

import java.util.HashMap;

public class StateSignal {
    HashMap<String,Object> result = new HashMap<String,Object>();

    public void put(State state){
        result.put(state.name,state.message);
    }
    public void put(String name,Object val){
        result.put(name,val);
    }
    public HashMap<String, Object> getResult() {
        return result;
    }
}
