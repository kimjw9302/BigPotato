//함수명(인자1,인자2,..) 인자들은 action의 별명!
module.exports.function = function getItemInfo(myLocation, itemName, searchKeyword) {
  var config = require('config');
  var fail = require('fail');
  var http = require('http');
  var console = require('console');
  var tool = require('lib/tool.js');
  console.log("latitude : " + myLocation.latitude);
  console.log("longitude : " + myLocation.longitude);
  let result = tool.getItem(myLocation, itemName);
  //console.log(result);

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
