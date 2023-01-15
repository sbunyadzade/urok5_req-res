// let goods = [
//   { id: 1, name: "Samsung Galaxy S23", price: 1590, quantity:15 },
//   { id: 2, name: "Apple iPhone 15", price: 1699.99, quantity:28 },
//   { id: 3, name: "Samsung Galaxy Z Fold 5", price: 1359.00, quantity:32 },
//   { id: 4, name: "Google Pixel Fold", price: 1259, quantity:16 },
//   { id: 5, name: "OnePlus 11", price: 897.50, quantity:18 },
//   { id: 6, name: "Samsung Galaxy S22 Series", price: 1179, quantity:22 },
//   { id: 7, name: "Oppo Find X5 series", price: 1099, quantity:9 },
//   { id: 8, name: "Apple iPhone SE (2022)", price: 1478.99, quantity:14 },
//   { id: 9, name: "Xiaomi 12 series", price: 789.99, quantity:25 },
//   { id: 10, name: "OnePlus 10 Pro", price: 865, quantity:30 },
//   { id: 11, name: "Sony Xperia 1 IV", price: 873, quantity:27 },
//   { id: 12, name: "Honor Magic 4 Pro", price: 671, quantity:12 }
// ];

const express = require("express");
const fs = require("fs");
const server = express();

fs.readFile("./goods.json", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    const goods = JSON.parse(data);
    server.get("/", (req, res) => {
      const count = parseInt(req.query.count);
      const offset = parseInt(req.query.offset);

      res
        .status(200)
        .send(
          count && offset
            ? goods.slice(offset, offset + count)
            : goods.map(
                (elem) => `${elem.name} : ${elem.price}$ : ${elem.quantity} `
              )
        );
    });

    server.get("/:id", (req, res) => {
      goods.length >= req.params.id && req.params.id > 0
        ? res.status(200).send(
            `Название: ${goods[req.params.id - 1].name} <br/>  
           Цена:     ${goods[req.params.id - 1].price}$<br/>  
           Кол-во:   ${goods[req.params.id - 1].quantity}шт`
          )
        : res.status(404).send(`Error: good "${req.params.id}" not found`);
    });
  }
});

server.listen(3000, () => {
  console.log("Server is running");
});
