const { Product, User } = require("../models/models");

const removeControl = async (req, res) => {
  const { user, product } = req.params;

  await Product.findOne({ _id: product })
    .then(async (doc) => {
      await User.findOne({ username: user })
        .then(async (user) => {
          let updatedCart = await user.cart.filter((product) => {
            return product.title !== doc.title;
          });
          user.cart = updatedCart;
          user.save((err, update) => {
            if (err)
              return res
                .status(500)
                .json({ message: "Oops, something went wrong" });
            res.status(200).json({ message: "Removed cart" });
          });
        })
        .catch((userErr) => {
          return res.status(404).json({ message: "User Not Found" });
        });
    })
    .catch((err) => {
      return res.status(404).json({ message: "Product Not Found" });
    });
};

module.exports = { removeControl };
