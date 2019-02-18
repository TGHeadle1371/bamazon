## BAMAZON

### Bamazon: Like amazon, but not as cool.

### Introduction

-   Node.js app called bamazon, similiar to amazon, that users can use to purchase products.
-   Must be ran in a command line
-   Bamazon will be a command line node app that takes in parameters and gives you back data.
-   Bamazon will do any of the below commands when you enter them into the command line.

#### Type:

###### For Customer Interface

```
node bamazonCustomer.js
```

###### For Manager Interface

```
node bamazonManager.js
```

###### Then follow the prompts

#### Example for bamazonCustomers

```
node liri.js bamazonCustomer.js
```

![Display View](/images/customerProducts.png)

#### Shows the following information:

-   A prompt to ask you to choose an item:

![Display View](/images/itemPurchaseChoice.png)

-   A prompt to ask you to choose a quantity:

![Display View](/images/quantityNeedCustomer.png)

-   A prompt that will tell you if its successful:

![Display View](/images/successfulOrderCustomer.png)

-   If not, try again!

#### Example for bamazonManager

-   To start, type in:

```
node bamazonManager.js
```

-   You will receive the following options:

![Display View](/images/managerOptions.png)

#### Choosing View Products for Sale

-   By selecting view products for sale, the system will display the products:

![Display Image](/images/managerProductView.png)

-   Followed by the options again.

#### Choosing Low Inventory

-   By selecting Low Inventory, the system will display low inventory products:

![Display Image](/images/managerLowProduct.png)

-   Followed by the options again.

#### Choosing Add to Inventory

-   By selecting Add to Inventory, the system will display a series of prompts that require input:

-   Select an item to add to that items inventory:

![Display Image](/images/managerItemId.png)

-   Add the quantity you wish to increase it by:
    ![Display Image](/images/managerAddQuantity.png)

-   Then see the updated quantity displayed:

![Display Image](/images/managerQuantityUpdateDisplay.png)

-   Followed by the options again.

#### Choosing Add New Product

-   By selecting Add New Product, the system will display a series of prompts that require more inputs:

-   Select add new product:

![Display Image](/images/managerAddNewProduct.png)

-   Enter the product name:

![Display Image](/images/managerNewProduct.png)

-   Enter the department:

![Display Image](/images/managerProductDepartment.png)

-   Enter the price:

![Display Image](/images/managerProductPrice.png)

-   See the display updated product!

![Display Image](/images/managerProductAddSuccess.png)

-   Followed by the options again.

#### And Finally, EXIT

-   Choose Exit to leave the application

![Display Image](/images/Exit.png)

-   NPM Packages used

1. [mysql](https://www.npmjs.com/package/mysql)
2. [inquirer](https://www.npmjs.com/package/inquirer)
3. [cli-table](https://www.npmjs.com/package/cli-table)

-   to install these npm packages run these commands one at a time.

```
npm install mysql
npm install inquirer
npm install cli-table

```

##### Technologies

-   HTML
-   CSS
-   JavaScript
-   Node.js
-   MySQL

## Copyright

Thomas Headle &copy; 2019. All Rights Reserved.
