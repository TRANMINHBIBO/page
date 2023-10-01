const Product = require("../../models/product.model");
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    });
    const newProducts = products.map(item => {
        item.priceNew = (item.price*(100 -item.discountPercentage)/100).toFixed(0);
        return item;
    });
    console.log(newProducts);
    res.render("client/pages/products/index.pug", {
        pageTitle: "Danh sách sản phẩm",
        products: newProducts
    });    
}
module.exports.detail = async (req, res) => {
    console.log(req.params.slug);
    try{
        let find = {
          deleted: false,
          slug : req.params.slug, 
          status: "active"
        }
        const product = await Product.findOne(find);
        res.render("client/pages/products/detail.pug", {
          pageTitle: product.title,
          product: product
        });
        console.log(product);
      }catch(error){
        req.flash('notFound', 'Không tìm thấy sản phẩm');
        res.redirect(`${systemConfig.prefixAdmin}/products`);
      }
      
}