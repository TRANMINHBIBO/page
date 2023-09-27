const Product = require("../../models/product.model");
const searchHelper = require("../../helpers/search");
const filterStatusHelper = require("../../helpers/filterStatus");
const paginationHelper = require("../../helpers/pagination");
module.exports.index = async (req, res) => {
    let find = {
      deleted: false
    }
    const filterStatus = filterStatusHelper(req.query);
    const objectSearch = searchHelper(req.query);
    if(objectSearch.regex){
      find.title = objectSearch.regex;
    }
    const objectPagination = paginationHelper(req.query);
    const countProduct = await Product.count(find);
    const totalPage = Math.ceil(countProduct / objectPagination.limitItem);
    objectPagination.totalPage = totalPage;
    objectPagination.skip = (objectPagination.currentPage - 1) * (objectPagination.limitItem);
    const product = await Product.find(find).skip(objectPagination.skip).limit(objectPagination.limitItem).sort({position: "desc"});
    res.render("admin/pages/product/index", {
        pageTitle: "Danh sách sản phẩm",
        products: product,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination,
    });
}
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  await Product.updateOne({_id: id}, {status: status});
  res.redirect("back");
  
}
module.exports.changeMulti = async (req, res) => {
  console.log(req.body);
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  switch(type){
    case "active":
      await Product.updateMany({_id: {$in: ids}}, {status: "active"});
      break;
    case "inactive":
      await Product.updateMany({_id: {$in: ids}}, {status: "inactive"});
      break;
    case "deleted":
      await Product.updateMany({_id: {$in: ids}}, {deleted: true});
    case "changePosition":
      for(const item of ids){
        let [id, position] = item.split("-");
        position = parseInt(position);
        await Product.updateOne({_id: id}, {position: position});
      }

    default:
      break;
  }
  res.redirect("back");
}