function strToDate(str){
  var arrDate = str.split('-')
  var year = arrDate.splice(0, 1)
  var month = arrDate.splice(0, 1)
  var day = arrDate.splice(0, 1)
  
  return new Date(year, month-1, day)
}

export default strToDate
