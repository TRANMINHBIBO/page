module.exports = (query) => {
  let objectPagination = {
    currentPage : 1,
    limitItem : 4
  }
  if(query.page){
    const currentPage = parseInt(query.page);
    objectPagination.currentPage = currentPage;
  }
  return objectPagination;
}