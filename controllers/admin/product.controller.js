const Product = require("../../models/product.model");
const searchHelper = require("../../helpers/search");
const filterStatusHelper = require("../../helpers/filterStatus");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");
module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  }
  const filterStatus = filterStatusHelper(req.query);
  const objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  const objectPagination = paginationHelper(req.query);
  const countProduct = await Product.count(find);
  const totalPage = Math.ceil(countProduct / objectPagination.limitItem);
  objectPagination.totalPage = totalPage;
  objectPagination.skip = (objectPagination.currentPage - 1) * (objectPagination.limitItem);
  const product = await Product.find(find).skip(objectPagination.skip).limit(objectPagination.limitItem).sort({
    position: "desc"
  });
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
  await Product.updateOne({
    _id: id
  }, {
    status: status
  });
  res.redirect("back");

}
module.exports.changeMulti = async (req, res) => {
  console.log(req.body);
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  switch (type) {
    case "active":
      req.flash('msg', 'Chuyển đổi trạng thái thành công');
      await Product.updateMany({
        _id: {
          $in: ids
        }
      }, {
        status: "active"
      });
      break;
    case "inactive":
      req.flash('msg', 'Chuyển đổi trạng thái thành công');
      await Product.updateMany({
        _id: {
          $in: ids
        }
      }, {
        status: "inactive"
      });
      break;
    case "deleted":
      req.flash('msg', 'Xoá sản phẩm thành công');
      await Product.updateMany({
        _id: {
          $in: ids
        }
      }, {
        deleted: true
      });
    case "changePosition":
      req.flash('msg', 'Chuyển đổi trạng thái thành công');
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await Product.updateOne({
          _id: id
        }, {
          position: position
        });
      }

      default:
        break;
  }
  res.redirect("back");
}
module.exports.create = (req, res) => {

  res.render("admin/pages/product/create.pug", {
    pageTitle: "Trang tạo sản phẩm"
  });
}
module.exports.createPost = async (req, res) => {
  
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  if (req.body.position == "") {
    const countProducts = await Product.count();
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }
  const product = new Product(req.body);
  console.log(req.body);
  console.log(req.file);
  await product.save();
  res.redirect(`back`);

}

module.exports.edit = async (req, res) => {
  try{
    let find = {
      deleted: false,
      _id : req.params.id
    }
    const product = await Product.findOne(find);
    res.render("admin/pages/product/edit.pug", {
      pageTitle: "Trang chỉnh sửa sản phẩm",
      product: product
    });
  }catch(error){
    req.flash('notFound', 'Không tìm thấy sản phẩm');
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
}
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);

  if(req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  try {
    await Product.updateOne({ _id: id }, req.body);
    req.flash("success", `Cập nhật thành công!`);
  } catch (error) {
    req.flash("error", `Cập nhật thất bại!`);
  }
  
  res.redirect(`${systemConfig.prefixAdmin}/products/detail/${id}`);
};
module.exports.detail = async (req, res) => {
  try{
    let find = {
      deleted: false,
      _id : req.params.id
    }
    const product = await Product.findOne(find);
    res.render("admin/pages/product/detail.pug", {
      pageTitle: product.title,
      product: product
    });
    console.log(product);
  }catch(error){
    req.flash('notFound', 'Không tìm thấy sản phẩm');
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
}
