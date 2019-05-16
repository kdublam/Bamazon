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
  password: "Totoro77",
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
  bamazon();
});

function bamazon() {
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

    inquirer
      .prompt([
        {
          type: "number",
          message: "What is the Product ID of the item you would like to purchase?"
            .yellow,
          name: "id"
        },
        {
          type: "number",
          message: "How many do you wish to purchase?".yellow,
          name: "quantity"
        }
      ])
      .then(function(answer) {
        var itemID = answer.id;
        var quantity = answer.quantity;

        var query = "SELECT * FROM products WHERE item_id=" + itemID;
        connection.query(query, function(err, res) {
          if (err) throw err;

          if (res[0].stock_quantity - quantity >= 0) {
            console.log("Inventory has enough stock");

            var total = res[0].price * quantity;
            var newStock = res[0].stock_quantity - quantity;

            // console.log("You total will be $" + total);

            connection.query(
              "UPDATE products SET stock_quantity=? WHERE item_id=?",
              [newStock, itemID],
              function(err, rest) {
                if (err) throw err;
                bamazon();
                console.log("You total will be $" + total);

              }
            );
          } else {
            bamazon();console.log("Not enough inventory in stock");
            
          }
        });
      });
  });
}
