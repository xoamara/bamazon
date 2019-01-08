//On application run display products table:
//ID, Names, Price only
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "pa$$word",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Welcome to bamazon!  We appreciate your business.  Please see the following list of available items:");
    displayItems();
    buyItem();
});

function displayItems() {

    connection.query("SELECT * FROM bamazon.products", function (err, response) {
        if (err) throw err;

        console.log("--------------------------------------------------");

        for (var i = 0; i < response.length; i++) {
            console.table(response[i].item_id + " | " + response[i].product_name + " | $" + response[i].price)
        }
        console.log("--------------------------------------------------");
    });
}

function buyItem() {
    connection.query("SELECT * FROM bamazon.products", function (err, response) {
        if (err) throw err;
        // User prompt:
        // 1.  ID of the product to buy
        // 2.  Units they want to buy
        inquirer.prompt([
            {
                name: "item",
                type: "input",
                message: "What is the item you would like to buy (enter ID number to the left)?"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to purchase?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
            .then(function (answer) {
                let chosenItem;
                for (var i = 0; i < response.length; i++) {
                    if (response[i].item_id === parseInt(answer.item)) {
                        chosenItem = response[i];
                    }
                }

                if (chosenItem.stock_quantity > parseInt(answer.quantity) || (chosenItem.stock_quantity - parseInt(answer.quantity)) >= 0) {
                    connection.query("UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: chosenItem.stock_quantity - parseInt(answer.quantity)
                            },
                            {
                                item_id: parseInt(chosenItem.item_id)
                            }
                        ],
                        function (error) {
                            if (error) throw error;
                            let orderTotal = parseFloat(chosenItem.price) * parseFloat(answer.quantity);
                            console.log(`Order placed successfully! Your total is $${orderTotal}.`)

                            inquirer.prompt([
                                {
                                    type: "confirm",
                                    message: "Would you like to purchase another item?",
                                    name: "confirm",
                                    default: true
                                }
                            ])
                                .then(function (answer) {
                                    if (answer.confirm) {
                                        displayItems();
                                        buyItem();
                                    }
                                    else {
                                        console.log(`Thank you for shopping bamazon!`);
                                        connection.end();
                                    }
                                })
                        }
                    );
                }
                else {
                    console.log("Insufficient quantities available. We have " + chosenItem.stock_quantity + " of " + chosenItem.product_name + " currently available. Please reduce your quantity or select a new item.")
                    inquirer.prompt([
                        {
                            type: "confirm",
                            message: "Insufficient quantities available!  Would you like to try again with a lower quantity?",
                            name: "confirm",
                            default: true
                        }
                    ])
                    .then(function (answer) {
                        if (answer.confirm) {
                            displayItems();
                            buyItem();
                        }
                        else {
                            console.log(`Thank you for shopping bamazon!`);
                            connection.end();
                        }
                    })
                }
            });
    });
}

        // Once purchased app needs to:
        // 1.   Check inventory against purchase quantity, use IF logic for two outcomes

        //      a.  If not enough, log "Insufficient quantity" and prevent order completion

        //      b.  If enough stock:
        //          1.  Update database deducting quantity
        //          2.  Display total cost to customer



