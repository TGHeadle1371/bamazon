var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");



var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon_db"
});

// validateInput makes sure that the user is supplying only positive integers for their inputs
function validateInput(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Enter a number greater than 0!';
    }
}

// promptUserPurchase will prompt the user for the item/quantity they would like to purchase
function promptUserPurchase() {
    // console.log('___ENTER promptUserPurchase___');

    // Prompt the user to select an item
    inquirer.prompt([{
            type: 'input',
            name: 'item_id',
            message: 'Please enter the Item ID which you would like to purchase.',
            validate: validateInput,
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many do you need?',
            validate: validateInput,
            filter: Number
        }
    ]).then(function (input) {
        // console.log('Customer has selected: \n    item_id = '  + input.item_id + '\n    quantity = ' + input.quantity);

        var item = input.item_id;
        var quantity = input.quantity;

        // Query db to confirm that the given item ID exists in the desired quantity
        var queryStr = 'SELECT * FROM products WHERE ?';

        connection.query(queryStr, {
            item_id: item
        }, function (err, data) {
            if (err) throw err;

            // If the user has selected an invalid item ID, data attay will be empty
            // console.log('data = ' + JSON.stringify(data));

            if (data.length === 0) {
                console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                displayInventory();

            } else {
                var productData = data[0];

                // console.log('productData = ' + JSON.stringify(productData));
                // console.log('productData.stock_quantity = ' + productData.stock_quantity);

                // If the quantity requested by the user is in stock
                if (quantity <= productData.stock_quantity) {
                    console.log('The Product you requested is in stock! Placing order!');

                    // Construct the updating query string
                    var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
                    // console.log('updateQueryStr = ' + updateQueryStr);

                    // Update the inventory
                    connection.query(updateQueryStr, function (err, data) {
                        if (err) throw err;

                        console.log('Your order has been placed! Your total is $' + productData.price * quantity);
                        console.log('Thank you for shopping with us!');
                        console.log("\n---------------------------------------------------------------------\n");

                        // End the database connection
                        connection.end();
                    });
                } else {
                    console.log('Insufficient quantity!');
                    console.log('Please change your order.');
                    console.log("\n---------------------------------------------------------------------\n");

                    displayInventory();
                }
            }
        });
    });
}

// displayInventory will retrieve the current inventory from the database and output it to the console
function displayInventory() {
    // console.log('___ENTER displayInventory___');

    // Construct the db query string
    queryStr = 'SELECT * FROM products';

    // Make the db query
    connection.query(queryStr, function (err, data) {
        if (err) throw err;

        console.log('Product Inventory: ');
        console.log('----------------------------------------------------------------------\n');

        // var items = '';
        // for (var i = 0; i < data.length; i++) {
        //     items = '';
        //     items += 'Item ID: ' + data[i].item_id + '  //  ';
        //     items += 'Quantity in Stock: ' + data[i].stock_quantity + ' // ';
        //     items += 'Product Name: ' + data[i].product_name + '  //  ';
        //     items += 'Department: ' + data[i].department_name + '  //  ';
        //     items += 'Price: $' + data[i].price + '\n';


        //     console.log(items);
        // }
        //creates a table for the information from the mysql database to be placed
        var table = new Table({
            head: ['Item Id#', 'Department', 'Product Name', 'Price'],
            style: {
                head: ['green'],
                compact: false,
                colAligns: ['center'],
            }
        });

        //loops through each item in the mysql database and pushes that information into a new row in the table
        for (var i = 0; i < data.length; i++) {
            table.push(
                [data[i].item_id, data[i].department_name, data[i].product_name, data[i].price]
            );
        }
        console.log(table.toString());

        console.log("---------------------------------------------------------------------\n");

        //Prompt the user for item/quantity they would like to purchase
        promptUserPurchase();
    });
}

// runBamazon will execute the main application logic
function runBamazon() {
    // console.log('___ENTER runBamazon___');

    // Display available inventory
    displayInventory();
}

// Run the application logic
runBamazon();