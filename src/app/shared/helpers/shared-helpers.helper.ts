export function removeDuplicates(originalArray, key) {
  const newArray = [];
  const lookupObject = {};

  for (var i in originalArray) {
    lookupObject[originalArray[i][key]] = originalArray[i];
  }
  for (i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
}

export function arrayToObject(arrayPayload: [], keyField: string) {
  return arrayPayload.reduce((obj, item) => {
    obj[item[keyField]] = item;
    return obj;
  }, {});
}
