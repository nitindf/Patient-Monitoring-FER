export default (date) => {
  var d = new Date(date);
  return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}, ${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
}
