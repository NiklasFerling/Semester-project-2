function load(key) {
  const data = localStorage.getItem(key);
  return data;
}
export default load;
