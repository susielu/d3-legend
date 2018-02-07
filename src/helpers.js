export const thresholdLabels = function({ i, genLength, generatedLabels }) {
  if (i === 0) {
    return generatedLabels[i].replace("NaN to", "Less than")
  } else if (i === genLength - 1) {
    return `${generatedLabels[genLength - 1].replace(" to NaN", "")} or more`
  }
  return generatedLabels[i]
}

export default {
  thresholdLabels
}
