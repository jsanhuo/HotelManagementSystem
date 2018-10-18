package com.jiudian.manage.until;

import com.google.gson.JsonObject;

public class Signal {
    JsonObject json=new JsonObject();
    public void put(CodeMessage state){
        json.addProperty(state.name,state.message);
    }
    public void put(String name,String val){
        json.addProperty(name,val);
    }
    public String getResult() {
        return json.toString();
    }
}
