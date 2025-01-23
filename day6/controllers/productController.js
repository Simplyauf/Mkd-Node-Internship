const shopifyService = require("../services/shopifyService");

exports.getProducts = async (req, res) => {
  console.log("dhdhdh");
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;

    const products = await shopifyService.getProducts(page, limit);

    res.render("products", {
      products,
      currentPage: page,
      limit,
      title: "Products",
    });
  } catch (error) {
    res.status(500).render("error", { error: error.message });
  }
};
