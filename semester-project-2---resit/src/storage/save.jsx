function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
export default save;
