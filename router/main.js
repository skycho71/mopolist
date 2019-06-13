var express = require("express");
var router = express.Router();
var fs = require('fs');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var dbconfig = require('../config/database.js');
var getConnection = ()=>{
    return dbconfig;
}

router.get('/list/:cur', (req, res)=>{
    //페이지당 게시물 수는 10개
    var page_size = 10;
    var page_list_size = 10;
    var totalPageCount = 0;
    var no = 0;
    var queryString = 'Select count(*) as cnt from post';

    getConnection().query(queryString, (error2, data)=>{
        if(error2){
            console.log(error2 + "메인 화면에 나오는 mysql 조회 실패");
            return;
        }
        
        totalPageCount = data[0].cnt;

        var curPage = req.params.cur;
        console.log("현재페이지:" + curPage, "전체페이지:" + totalPageCount);
        // 전체 페이지 갯수
        if(totalPageCount < 0){
            totalPageCount = 0;
        }
        var totalPage = Math.ceil(totalPageCount/ page_size);
        var totalSet = Math.ceil(totalPage/page_list_size);
        var curSet = Math.ceil(curPage/page_list_size);
        var startPage = (curSet - 1) * 10 +1;
        var endPage = startPage + page_list_size - 1;

        if (curPage < 0) {
            no = 0;
        } else {
            no = (curPage -1) * 10;
        }
        console.log("[0] curPage : " + curPage +
              " | [1] page_list_size : " + page_list_size +
              " | [2] page_size : " + page_size +
              " | [3] totalPage : " + totalPage +
              " | [4] totalSet : " + totalSet +
              " | [5] curSet : " + curSet +
              " | [6] startPage : " + startPage +
              " | [7] endPage : " + endPage);
    });
});