# Simple PHP CRUD Application

This is a simple web application that demonstrates Create, Read, Update, and Delete (CRUD) operations using PHP, JavaScript, HTML, and CSS. The application allows you to manage users with the following data:

- Full Name
- Username
- Email
- Password

The data is stored in a MariaDB database.

## Features

- User registration
- Displaying a list of users
- Updating user data
- Deleting users

## Technologies Used

- PHP 7+
- JavaScript
- HTML
- CSS
- MariaDB

## Setup

1. Clone this repository to your local machine.
2. Set up a MariaDB database and update the database connection details in the PHP files.
3. Run the SQL script in `database.sql` to create the `users` table.
4. Serve the application using a PHP server.

## Usage

Open the application in your web browser. You can register a new user using the form at the top of the page. The list of users is displayed in a table below the form.

To update a user, click on the user's row in the table. The user's data will be loaded into the form. Make the necessary changes and click the "Update" button.

To delete a user, click on the user's row in the table and then click the "Delete" button.

## Demo

You can view a live demo of the application at [https://php.iml-pack.com/](https://php.iml-pack.com/).

## Known Issues and Future Enhancements

1. The application currently does not display a message if a user tries to register with a username or email that already exists in the database. This feature should be added to improve user experience.

2. The application allows users to update their email to an invalid email. Email validation should be added to prevent this.

3. A "Clear Form" button should be added to allow users to easily clear all the fields in the form.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

