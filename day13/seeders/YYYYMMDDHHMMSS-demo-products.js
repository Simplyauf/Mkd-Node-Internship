"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Products", [
      {
        title: "Gaming Laptop",
        price: 1299.99,
        description:
          "High-performance gaming laptop with RTX 3080, 32GB RAM, and 1TB SSD",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Wireless Headphones",
        price: 199.99,
        description:
          "Premium noise-cancelling wireless headphones with 30-hour battery life",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Smartwatch",
        price: 299.99,
        description:
          "Feature-rich smartwatch with health tracking and cellular connectivity",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Mechanical Keyboard",
        price: 149.99,
        description:
          "RGB mechanical keyboard with Cherry MX switches and aluminum frame",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "4K Monitor",
        price: 499.99,
        description:
          "32-inch 4K HDR monitor with 144Hz refresh rate and USB-C connectivity",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Products", null, {});
  },
};
