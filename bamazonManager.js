// Node Packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");


// Create Connection
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

// Make sure that the user is supplying only positive numbers for their inputs
function validateInteger(value) {
    // Value must be a positive number
    var number = (typeof parseFloat(value)) === 'number';
    var positive = parseFloat(value) > 0;

    if (number && positive) {
        return true;
    } else {
        return 'Please enter a positive number for the unit price.';
    }
}


// Present a menu options to the manager and triggers appropriate options
function managerAction() {
    // Prompt the manager to select an option
    inquirer.prompt([{
        type: 'list',
        name: 'option',
        message: 'Please select an option:',
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit'],
        filter: function (choice) {
            if (choice === 'View Products for Sale') {
                return 'sale';
            } else if (choice === 'View Low Inventory') {
                return 'lowInventory';
            } else if (choice === 'Add to Inventory') {
                return 'addToInventory';
            } else if (choice === 'Add New Product') {
                return 'newProduct';
            } else if (choice === 'Exit') {
                return 'exit';
            } else {
                // This case should be unreachable
                console.log('ERROR: Unsupported operation!');
                exit(1);
            }
        }
    }]).then(function (input) {
        // Trigger the appropriate function based on the user selection
        if (input.option === 'sale') {
            displayInventory();
        } else if (input.option === 'lowInventory') {
            displayLowInventory();
        } else if (input.option === 'addToInventory') {
            addToInventory();
        } else if (input.option === 'newProduct') {
            createNewProduct();
        } else if (input.option === 'exit') {
            console.log("Thank you, have a great day!");
            connection.end();
        } else {
            // This case should be unreachable
            console.log('ERROR: Unsupported operation!');
            exit(1);
        }
    });
}

// Retrieve the current inventory from the database and output it to the console
function displayInventory() {
    // Construct the db query string
    queryStr = 'SELECT * FROM products';
    // Make the db query
    connection.query(queryStr, function (err, data) {
        if (err) throw err;
        console.log('Product Inventory: ');
        console.log('----------------------------------------------------------------------\n');
        //Create a table for the information from the mysql database to be placed
        var table = new Table({
            head: ['Item Id #', 'Product Name', 'Price', 'Quantity in Stock'],
            style: {
                head: ['green'],
                compact: false,
                colAligns: ['center'],
            }
        });

        // Loop through each item in the mysql database and pushes that information into a new row in the table
        for (var i = 0; i < data.length; i++) {
            table.push(
                [data[i].item_id, data[i].product_name, data[i].price, data[i].stock_quantity]
            );
        }
        console.log(table.toString());

        console.log("---------------------------------------------------------------------\n");
        managerAction();
    });
}
// Retrieve the current inventory from the database and output it to the console
function displayLowInventory() {
    // Construct the db query string
    queryStr = 'SELECT * FROM products WHERE stock_quantity < 5';

    // Make the db query
    connection.query(queryStr, function (err, data) {
        if (err) throw err;

        console.log('Product Inventory Quantity Below 5: ');
        console.log('----------------------------------------------------------------------\n');

        // Create a table for the information from the mysql database to be placed
        var table = new Table({
            head: ['Item Id#', 'Department', 'Product Name', 'Price', 'Quantity in Stock'],
            style: {
                head: ['green'],
                compact: false,
                colAligns: ['center'],
            }
        });

        // Loop through each item in the mysql database and pushes that information into a new row in the table
        for (var i = 0; i < data.length; i++) {
            table.push(
                [data[i].item_id, data[i].department_name, data[i].product_name, data[i].price, data[i].stock_quantity]
            );
        }
        //Log the table
        console.log(table.toString());

        console.log("---------------------------------------------------------------------\n");
        // display manager options
        managerAction();

    });
}
// Sequence to let a user add additional Inventory quantity
function addToInventory() {
    // Prompt the user to select an item and validate the integer after input
    inquirer.prompt([{
            type: 'input',
            name: 'item_id',
            message: 'Please enter the Item ID for inventory quantity update:',
            validate: validateInteger,
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many would you like to add?',
            validate: validateInteger,
            filter: Number
        }
    ]).then(function (input) {
        var item = input.item_id;
        var addQuantity = input.quantity;

        // Query db to confirm that the given item ID exists and to determine the current stock_count
        var queryStr = 'SELECT * FROM products WHERE ?';

        connection.query(queryStr, {
            item_id: item
        }, function (err, data) {
            if (err) throw err;

            // If the user has selected an invalid item ID, data array will be empty

            if (data.length === 0) {
                console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                addToInventory();

            } else {
                var productData = data[0];

                console.log('Updating Inventory...');

                // Construct the updating query string
                var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity + addQuantity) + ' WHERE item_id = ' + item;
                // console.log('updateQueryStr = ' + updateQueryStr);

                // Update the inventory
                connection.query(updateQueryStr, function (err, data) {
                    if (err) throw err;

                    console.log('Stock count for Item: ' + item + ' has been updated to ' + (productData.stock_quantity + addQuantity) + '.');
                    console.log("\n---------------------------------------------------------------------\n");
                    // display inventory

                    displayInventory();
                });
            }
        });
    });
}

// Give options to the user for adding a new product to the inventory
function createNewProduct() {
    // Prompt the user to enter information about the new product
    inquirer.prompt([{
            type: 'input',
            name: 'product_name',
            message: 'Enter a new product: ',
        },
        {
            type: 'input',
            name: 'department_name',
            message: 'Enter this products department',
        },
        {
            type: 'input',
            name: 'price',
            message: 'What is the price per unit?',
            validate: validateInteger
        },
        {
            type: 'input',
            name: 'stock_quantity',
            message: 'Update the quantity available:',
            validate: validateInteger
        }
    ]).then(function (input) {
        console.log('Adding New Item: \n    product_name = ' + input.product_name + '\n' +
            '    department_name = ' + input.department_name + '\n' +
            '    price = ' + input.price + '\n' +
            '    stock_quantity = ' + input.stock_quantity);

        // Create the insertion query string
        var queryStr = 'INSERT INTO products SET ?';

        // Add new product to the db
        connection.query(queryStr, input, function (error, results, fields) {
            if (error) throw error;

            console.log('New product has been added to the inventory under Item ID ' + results.insertId + '.');
            console.log("\n---------------------------------------------------------------------\n");

            // display manager options
            managerAction();
        });
    });
}

// runBamazon will execute the main application function
function runBamazon() {
    // display manager options
    managerAction();
}

// Run the application logic
runBamazon();