# bamazon


Bamazon is CLI Amazon-like storefront app built with:
* Node.js
* MySQL
* npm Packages
    1. inquirer
    1. mysql
    1. dotenv


The app welcomes the customer and displays the available products with pricing.  The customer is prompted to enter the desired product by Item ID and is then asked how many they wish to purchase.  

Once the quantity is entered the customer is given the total of their purchase and is asked whether they wish to purchase another item.  If the answer is *yes* the item list is displayed again.  If the answer is *no* the customer is thanked for shopping bamazon and the program ends.

All quantities are deducted on the back end within MySQL.  The logic allows a customer to buy the maximum quantity without dropping below zero.  If the desired quantity would drop inventory below zero a message informs the customer the max quantity available.  The customer has the option to revise the quantity or buy something else.


## Installation

Create a .env file to store your personal MySQL key.  Put the following in to the file putting your personal password after the "=".

```
# MySQL Key

PASSWORD=your_password
```
After downloading run the following at the command line:

`npm install`


## Files

MySQL Schema and seed file included in repository download.  To run the program you will need to provide your own .env file with MySQL password info.


## Usage

To initiate the application type the following in the command line:

`node bamazonCustomer.js`

Follow the prompts entering the item selection and quantity desired:

![Image of bamazonCustomer CLI](/workingcopy.png)

Inventory update occurs on the MySQL side.  

![Image of bamazonCustomer CLI](/mysqlshot.png)






