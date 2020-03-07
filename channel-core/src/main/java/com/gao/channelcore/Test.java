package com.gao.channelcore;

import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Test {

  public static void main(String[] args) {
    /*String url = "http://sf3-ttcdn-tos.pstatp.com/obj/mosaic-legacy/194460003762779c3bd27";
    String path = "d:/test/pic.jpg";
    downloadPicture(url, path);*/
    /*String[] strArr = new String[4];
    strArr[0] = "000";
    strArr[1] = "1111";
    strArr[2] = "2222";
    strArr[3] = "3333";
    StringBuffer sb = new StringBuffer("[");
    for (int i = 0; i < strArr.length; i++) {
      if(i == strArr.length - 1){
        sb.append(strArr[i]);
      }else {
        sb.append(strArr[i]).append(",");
      }
    }
    sb.append("]");
    System.out.println(sb.toString());*/
    List<String> listAll = new ArrayList<>();
    for (int i = 1; i < 30; i++) {
      listAll.add(String.valueOf(i));
    }

    List<String> listSub = new ArrayList<>();
    for (int i = 10; i < 30; i++) {
      listSub.add(String.valueOf(i));
    }

    List<String> list = getDffList(listAll, listSub);
    for (String str : list) {
      System.out.println(str);
    }


  }

  public static List<String> getDffList(List<String> mAllList, List<String> mSubList) {
    Map<String, Integer> map = new HashMap<>();
    for (int i = 0; i < mAllList.size(); i++) {
      map.put(mAllList.get(i), i);
    }
    for (int i = 0; i < mSubList.size(); i++) {
      Integer pos = map.get(mSubList.get(i));
      if (pos == null) {
        continue;
      }
      mAllList.set(pos, null);
    }
    for (int i = mAllList.size() - 1; i >= 0; i--) {
      if (mAllList.get(i) == null) {
        mAllList.remove(i);
      }
    }
    return mAllList;
  }


  //链接url下载图片
  private static void downloadPicture(String urlList, String path) {
    URL url = null;
    try {
      url = new URL(urlList);
      DataInputStream dataInputStream = new DataInputStream(url.openStream());

      FileOutputStream fileOutputStream = new FileOutputStream(new File(path));
      ByteArrayOutputStream output = new ByteArrayOutputStream();

      byte[] buffer = new byte[1024];
      int length;

      while ((length = dataInputStream.read(buffer)) > 0) {
        output.write(buffer, 0, length);
      }
      fileOutputStream.write(output.toByteArray());
      dataInputStream.close();
      fileOutputStream.close();
    } catch (MalformedURLException e) {
      e.printStackTrace();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }


}
