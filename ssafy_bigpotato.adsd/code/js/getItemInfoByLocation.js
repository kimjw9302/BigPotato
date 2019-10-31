
//아이템 정보를 지역이름과 같이 검색.
module.exports.function = function getItemInfoByLocation(locaName, itemName, searchKeyword) {
  var config = require('config');
  var fail = require('fail');
  var http = require('http');
  var console = require('console');
  var tool = require('lib/tool.js');
  console.log("itemName : " + itemName);
  console.log("locaName : " + locaName);
  let result = tool.getItemInfoByLocation(locaName, itemName);
  console.log(result);
  if (result == "NotFoundData") {
    throw fail.checkedError("Kamis에서 제공하지 않는 데이터", "NotFoundData", null);
  }
  if (result == "NotReceiveJson") {
    throw fail.checkedError("This error is not found exception", "NotFoundItemInfo", null);
  }
  if (result != undefined && result.length > 0) {
    return result;
  }

}
