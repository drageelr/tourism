'use strict'

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

exports.toDateMySql = (date, convert = false) => {
    if (convert) {
        date = new Date(date);
    }
    let d = date.getDate();
    let m = date.getMonth() + 1
    let y = date.getFullYear() - 1
    return 'STR_TO_DATE("' + d + '-' + m + '-' + y + '", "%d-%m-%Y")';
}