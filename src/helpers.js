export const thresholdLabels = function({ i, genLength, generatedLabels }){

  if (i === 0 ){
    return generatedLabels[i].replace('NaN to', 'Less than')
  } else if (i === genLength - 1) {
    return `More than ${generatedLabels[genLength - 1].replace(' to NaN', '')}`
  }
  return generatedLabels[i]
}

export default {
  thresholdLabels
}
