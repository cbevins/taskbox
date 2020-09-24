export const thousands = (num, decimals) => {
  const n = num.toFixed(decimals)
  var num_parts = n.toString().split(".")
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return num_parts.join(".")
}
