'use strict'

const { func } = require('@hapi/joi');
var crypto = require('crypto');

exports.hash = (str) => {
    return crypto.createHash('sha256').update(str).digest('base64');
}

exports.duplicateObject = (orgObj, propList = [], ignoreUndefined = false, prefix = "", ignoreList = []) => {
    let copyObj = {};
  
    let keysToCopy = Object.keys(orgObj);
  
    if (propList.length) {
      keysToCopy = propList;
    }
  
    if (ignoreList.length) {
      for (let k of ignoreList) {
        let index = keysToCopy.indexOf(k);
        keysToCopy.splice(index, 1);
      }
    }
  
    if (!ignoreUndefined) {
      for (let k of keysToCopy) {
        copyObj[prefix + k] = orgObj[k];
      }
    } else {
      for (let k of keysToCopy) {
        if (orgObj[k] !== undefined) {
          copyObj[prefix + k] = orgObj[k];
        }
      }
    }
    
    return copyObj;
  }

exports.toDateMySql = (date) => {
    date = date.split('-');
    let temp = date[2].split('');
    return 'STR_TO_DATE("' + temp[0] + temp[1] + '-' + date[1] + '-' + date[0] + '", "%d-%m-%Y")';
}

exports.createDateFromMysqlDate = function(mysql_string)
{ 
   var t, result = null;

   if( typeof mysql_string === 'string' )
   {
      t = mysql_string.split(/[- :]/);

      //when t[3], t[4] and t[5] are missing they defaults to zero
      result = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0));        
   }

   return result;   
}

exports.createDateNowInUTC = () => {
    let now = new Date();
    let utc = new Date(Date.UTC(now.getFullYear(), now.getMonth() + 1, now.getDate()))
    return utc;
}