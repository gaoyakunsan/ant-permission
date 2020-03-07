package com.gao.channelcore.business.service;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gao.channelcore.business.dao.ScoreMapper;
import com.gao.channelcore.pojo.Score;
import com.gao.channelcore.utils.ServiceUtil;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ScoreService {

    private static final Logger logger = LoggerFactory.getLogger(ScoreService.class);

    @Autowired
    private ScoreMapper scoreMapper;

    public String getScoreDetail(Map<String, Object> map) {
        PageHelper.startPage(Integer.parseInt(map.get("pageNo") + ""),
                Integer.parseInt(map.get("pageSize") + ""));
        List<Score> list = scoreMapper.getScoreDetail(map);
        PageInfo<Score> pageInfo = new PageInfo<>(list);
        return JSONObject.toJSONString(ServiceUtil.returnSuccessData(pageInfo));
    }

    public Score getLatestSchoolId(){
        return scoreMapper.getScoreDetail(new HashMap<>()).get(0);
    }

    public void insertSelective(Score score) {
        scoreMapper.insertSelective(score);
    }

    public void updateByPrimaryKeySelective(Score score) {
        scoreMapper.updateByPrimaryKeySelective(score);
    }

    public void exportExcel(HttpServletResponse response, Map<String, Object> map) {
        try {
            HSSFWorkbook wb = new HSSFWorkbook();
            OutputStream output = response.getOutputStream();
            List<Score> list = scoreMapper.getScoreDetail(map);

            HSSFCellStyle setBorderBody = wb.createCellStyle();
            setBorderBody.setAlignment(HorizontalAlignment.CENTER); // 居中ALIGN_CENTER
            HSSFCellStyle setBorderHead = wb.createCellStyle();
            setBorderHead.setAlignment(HorizontalAlignment.CENTER); // 居中ALIGN_CENTER
            HSSFFont font = wb.createFont();
            font.setFontName("黑体");
            font.setFontHeightInPoints((short) 10);//设置字体大小
            setBorderHead.setFont(font);
            setBorderHead.setWrapText(true);//自动换行
            int totle = list.size();// 获取List集合的size
            int mus = 65535;// ：excel表格一个工作表可以存储65536条）
            int avg = totle / mus;
            for (int i = 0; i < avg + 1; i++) {
                HSSFSheet sheet = wb.createSheet("sheet" + (i + 1));
                HSSFRow row = sheet.createRow(0);
                // 第一行标题
                String[] head = new String[]{"姓名", "性别", "年龄", "身高", "体重", "十米折返跑(s)", "十米折返跑成绩", "立定跳远(cm)", "立定跳远成绩",
                        "网球投远(cm)", "网球投远成绩", "双脚连续跳(s)", "双脚连续跳成绩", "坐位体前屈(cm)", "坐位体前屈成绩", "走平衡木(s)", "走平衡木成绩", "总分", "平均", "等级"};
                int headInt = 0;
                for (String title : head) {
                    HSSFCell cell = row.createCell(headInt++);
                    cell.setCellStyle(setBorderHead);
                    cell.setCellValue(title);
                }
                int num = i * mus;
                int index = 0;
                int rowInt = 1;
                for (int m = num; m < list.size(); m++) {
                    if (index == mus) {// 判断index == mus的时候跳出当前for循环
                        break;
                    }
                    Score score = list.get(m);
                    // 每列对应的字段
                    row = sheet.createRow(rowInt++); // 创建行
                    HSSFCell cell0 = row.createCell(0);
                    cell0.setCellStyle(setBorderBody);
                    cell0.setCellValue(score.getName());
                    HSSFCell cell1 = row.createCell(1);
                    cell1.setCellStyle(setBorderBody);
                    cell1.setCellValue(score.getSex() == 0 ? "男" : "女");
                    HSSFCell cell2 = row.createCell(2);
                    cell2.setCellStyle(setBorderBody);
                    cell2.setCellValue(score.getAge());
                    HSSFCell cell3 = row.createCell(3);
                    cell3.setCellStyle(setBorderBody);
                    cell3.setCellValue(score.getHeight());
                    HSSFCell cell4 = row.createCell(4);
                    cell4.setCellStyle(setBorderBody);
                    cell4.setCellValue(score.getWeight());
                    HSSFCell cell5 = row.createCell(5);
                    cell5.setCellStyle(setBorderBody);
                    cell5.setCellValue(score.getZfp());
                    HSSFCell cell6 = row.createCell(6);
                    cell6.setCellStyle(setBorderBody);
                    cell6.setCellValue(score.getZfpScore());
                    HSSFCell cell7 = row.createCell(7);
                    cell7.setCellStyle(setBorderBody);
                    cell7.setCellValue(score.getLdty());
                    HSSFCell cell8 = row.createCell(8);
                    cell8.setCellStyle(setBorderBody);
                    cell8.setCellValue(score.getLdtyScore());
                    HSSFCell cell9 = row.createCell(9);
                    cell9.setCellStyle(setBorderBody);
                    cell9.setCellValue(score.getWqty());
                    HSSFCell cell10 = row.createCell(10);
                    cell10.setCellStyle(setBorderBody);
                    cell10.setCellValue(score.getWqtyScore());
                    HSSFCell cell11 = row.createCell(11);
                    cell11.setCellStyle(setBorderBody);
                    cell11.setCellValue(score.getLxt());
                    HSSFCell cell12 = row.createCell(12);
                    cell12.setCellStyle(setBorderBody);
                    cell12.setCellValue(score.getLxtScore());
                    HSSFCell cell13 = row.createCell(13);
                    cell13.setCellStyle(setBorderBody);
                    cell13.setCellValue(score.getTqq());
                    HSSFCell cell14 = row.createCell(14);
                    cell14.setCellStyle(setBorderBody);
                    cell14.setCellValue(score.getTqqScore());
                    HSSFCell cell15 = row.createCell(15);
                    cell15.setCellStyle(setBorderBody);
                    cell15.setCellValue(score.getPhm());
                    HSSFCell cell16 = row.createCell(16);
                    cell16.setCellStyle(setBorderBody);
                    cell16.setCellValue(score.getPhmScore());
                    HSSFCell cell17 = row.createCell(17);
                    cell17.setCellStyle(setBorderBody);
                    cell17.setCellValue(score.getTotalScore());
                    HSSFCell cell18 = row.createCell(18);
                    cell18.setCellStyle(setBorderBody);
                    cell18.setCellValue(score.getAvgScore());
                    HSSFCell cell19 = row.createCell(19);
                    cell19.setCellStyle(setBorderBody);
                    cell19.setCellValue(score.getLevel());
                    index++;
                }
            }
            response.setHeader("Content-Disposition", "attachment;filename=测试成绩.xls");
            response.setContentType("application/ms-excel");
            wb.write(output);
            output.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
