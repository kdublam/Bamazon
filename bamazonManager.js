var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");
var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log(
    colors.red(
      "Welcome to the Bamazon Store database! Your Connection id is " +
        connection.threadId
    )
  );
  mgrChoice();
});

function mgrChoice() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Products for Sale":
          viewProducts();
          break;

        case "View Low Inventory":
          lowInventory();
          break;

        case "Add to Inventory":
          addInventory();
          break;

        case "Add New Product":
          addProduct();
          break;
      }
    });
}

function viewProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    // Cli-Table display code with Color
    var table = new Table({
      head: [
        "Product ID".cyan.bold,
        "Product Name".cyan.bold,
        "Department Name".cyan.bold,
        "Price".cyan.bold,
        "Quantity".cyan.bold
      ],
      colWidths: [12, 75, 20, 12, 12]
    });

    // Set/Style table headings and Loop through entire inventory
    for (var i = 0; i < res.length; i++) {
      table.push([
        res[i].item_id,
        res[i].product_name,
        res[i].department_name,
        parseFloat(res[i].price).toFixed(2),
        res[i].stock_quantity
      ]);
    }
    console.log(table.toString());
    mgrChoice();
  });
}

function lowInventory() {
  connection.query("SELECT * FROM products WHERE stock_quantity<=5", function(
    err,
    res
  ) {
    if (err) throw err;

    // Cli-Table display code with Color
    var table = new Table({
      head: [
        "Product ID".cyan.bold,
        "Product Name".cyan.bold,
        "Department Name".cyan.bold,
        "Price".cyan.bold,
        "Quantity".cyan.bold
      ],
      colWidths: [12, 75, 20, 12, 12]
    });

    // Set/Style table headings and Loop through entire inventory
    for (var i = 0; i < res.length; i++) {
      table.push([
        res[i].item_id,
        res[i].product_name,
        res[i].department_name,
        parseFloat(res[i].price).toFixed(2),
        res[i].stock_quantity
      ]);
    }
    console.log(table.toString());
    mgrChoice();
  });
}

function addInventory() {
  inquirer
    .prompt([
      {
        type: "number",
        message: "What is the Product ID of the item you would like to add to inventory?"
          .yellow,
        name: "id"
      },
      {
        type: "number",
        message: "How many do you wish to add?".yellow,
        name: "quantity"
      }
    ])
    .then(function(answer) {
      var itemID = answer.id;
      var quantity = answer.quantity;

      var query = "SELECT * FROM products WHERE item_id=" + itemID;
      connection.query(query, function(err, res) {
        if (err) throw err;
        var newStock = res[0].stock_quantity + quantity;

        connection.query(
          "UPDATE products SET stock_quantity=? WHERE item_id=?",
          [newStock, itemID],
          function(err, rest) {
            if (err) throw err;
            mgrChoice();
          }
        );
      });
    });
}

function addProduct() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the production you would like to add?"
          .yellow,
        name: "name"
      },
      {
        type: "rawlist",
        message: "What department does this belong in?"
          .yellow,
        name: "dept",
        choices: ["kitchen and bath", "computers", "electronics", "household"]
      },
      {
        type: "number",
        message: "How much is this product?"
          .yellow,
        name: "price"
      },
      {
        type: "number",
        message: "How many do you wish to add?".yellow,
        name: "quantity"
      }
    ])
    .then(function(answer) {
      var prodName = answer.name;
      var prodDept = answer.dept;
      var prodPrice = answer.price;
      var prodQuant = answer.quantity;

      connection.query("INSERT INTO products SET ?", {product_name: prodName, department_name: prodDept, price: prodPrice, stock_quantity: prodQuant}, function(err, res){
        if (err) throw err;
        mgrChoice();
      })
    });
}
