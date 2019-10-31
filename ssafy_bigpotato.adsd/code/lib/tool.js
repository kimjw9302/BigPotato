  var http = require('http');
var config = require('config');
var console = require('console');
var fail = require('fail');
var url = "http://106.10.52.164:8080/bixby/main"; //서버 URL

//나의 위치정보와 아이템 이름으로 아이템리스트를 뿌려주기
module.exports.getItem = function (myLocation, itemName) {
  var result = [];
  var response;
  if (itemName == undefined || itemName.length == 0 || itemName == "") {
    throw fail.checkedError('아이템이 없습니다.', 'NotFoundProcesses', null);
  } else {
    if (itemName == "소고기") {
      itemName = "쇠고기";
    }

    itemName = encodeURI(itemName);
    var params = {
      action: "getItemList",
      itemname: itemName,
      lat: myLocation.latitude,
      rat: myLocation.longitude
    };

    var options = {
      format: 'json',
      query: {
        action: "getItemList",
        itemname: itemName,
        lat: myLocation.latitude,
        rat: myLocation.longitude
      }
    };
    //웹서버와 연결.
    response = http.postUrl(url, params, options);



    console.log(response);
    var count = response["count"]; //서버에서 던져주는 데이터 갯수
    var data = response["data"]; // 서버에서 보내주는 item Name들
    var info = response["food"]; // 서버에서 보내주는 item 정보들        data와 food는 위치로 매핑된다.
    var haveData = response["msg"]; //데이터가 있는지
    if(haveData =="404"){
       return "NotFoundData";
    }
    if(haveData =="500"){
      return "NotReceiveJson";
    }
    
    console.log(itemName);
    console.log(count + "개");

    for (var i = 0; i < data.length; i++) {
      var i_name = data[i].itemname;
      var k_name = data[i].kindname;
      var i_code = data[i].itemcode;
      var k_code = data[i].kindcode;
      var i_g_code = data[i].itemgroupcode;
      var imageURL = data[i].imgURL;
      var maxP = info[i].maxP;
      var minP = info[i].minP;
      var medP = info[i].medP;
      var unit = info[i].unit;
      var recentP = info[i].resentP;
      var msg = info[i].msg;
      var chartURL = info[i].chartURL;
      var locaName = response["location"];
      var todate = info[i].date;
      var full = data[i].itemname;
      if (i_name != k_name) {
        i_name += ("(" + k_name + ")");
      }

      if (imageURL == undefined || imageURL == "") {
        imageURL = "images/bixby_logo.png";
      }
      
      console.log(i_name+ "//" +chartURL);
      result[i] = {
        itemName: i_name,
        itemCode: i_code,
        kindName: k_name,
        kindCode: k_code,
        locaName: locaName,
        maxP: maxP,
        minP: minP,
        medP: medP,
        recentP: recentP,
        msg: msg,
        chartURL: chartURL,
        todate: todate,
        itemgroupcode: i_g_code,
        imageURL: imageURL,
        fullName: full,
        unit: unit
      }
    }
  }
  console.log(result);
  return result;
}

//나의 위치정보와 아이템 이름으로 아이템리스트를 뿌려주기
module.exports.getItemInfoByLocation = function (locaName, itemName, searchKeyword) {
  var result = [];
  var response;
  if (itemName == undefined || itemName.length == 0 || itemName == "") {
    throw fail.checkedError('아이템이 없습니다.', 'NotFoundProcesses', null);
  } else {
    if (itemName == "소고기") {
      itemName = "쇠고기";
    }
    itemName = encodeURI(itemName);
    locaName = encodeURI(locaName);
    console.log(locaName);

    var params = {
      action: "getItemListandlocation",
      itemname: itemName,
      lat: "",
      rat: "",
      location: locaName
    };

    var options = {
      format: 'json',
      query: {
        action: "getItemListandlocation",
        itemname: itemName,
        lat: "",
        rat: "",
        location: locaName
      }
    };

    //웹서버와 연결.
    response = http.postUrl(url, params, options);
    
    console.log(response);
    var count = response["count"]; //서버에서 던져주는 데이터 갯수
    var data = response["data"]; // 서버에서 보내주는 item Name들
    var info = response["food"]; // 서버에서 보내주는 item 정보들        data와 food는 위치로 매핑된다.
    var haveData = response["msg"];
    if(haveData =="404"){

       return "NotFoundData";
    }
      if(haveData =="500"){
      return "NotReceiveJson";
    }
    console.log(response);
    console.log(count + "개");

    for (var i = 0; i < data.length; i++) {
      var i_name = data[i].itemname;
      var k_name = data[i].kindname;
      var i_code = data[i].itemcode;
      var k_code = data[i].kindcode;
      var i_g_code = data[i].itemgroupcode;
      var imageURL = data[i].imgURL;
      var maxP = info[i].maxP;
      var minP = info[i].minP;
      var medP = info[i].medP;
      var recentP = info[i].resentP;
      var msg = info[i].msg;
      var chartURL = info[i].chartURL;
      var unit = info[i].unit;
      var locaName = response["location"];
      var todate = info[i].date;
      if (i_name != k_name) {
        i_name += ("(" + k_name + ")");
      }
      var full = data[i].itemname;
      if (imageURL == undefined || imageURL == "") {
        imageURL = "images/bixby_logo.png";
      }
      console.log(i_name+ "//" +chartURL);
      result[i] = {
        itemName: i_name,
        itemCode: i_code,
        kindName: k_name,
        kindCode: k_code,
        locaName: locaName,
        maxP: maxP,
        minP: minP,
        medP: medP,
        recentP: recentP,
        msg: msg,
        chartURL: chartURL,
        todate: todate,
        itemgroupcode: i_g_code,
        imageURL: imageURL,
        fullName: full,
        unit: unit
      }
    }
  }
  return result;
}

