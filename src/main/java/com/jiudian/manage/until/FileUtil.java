package com.jiudian.manage.until;

import java.io.File;
import java.io.FileOutputStream;

public class FileUtil {
    public static boolean uploadFile(byte[] file, String filePath, String fileName) throws Exception {
        File targetFile = new File(filePath);
        if(!targetFile.exists()){
            targetFile.mkdirs();
        }
        FileOutputStream out = new FileOutputStream(filePath+fileName);
        out.write(file);
        out.flush();
        out.close();
        return true;
    }
}
