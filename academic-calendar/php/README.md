# McMaster API Sample - PHP
This is a code sample for how to use McMaster's Academic Calendar v2 API in a PHP website.

## Setup Steps
You need [XAMPP](https://www.apachefriends.org/index.html) to run this app.

Once you have cloned this repository, place this project folder inside your XAMPP's htdocs directory. By default, it's `C:\xampp\htdocs\your-app-name` on Windows or `/Applications/XAMPP/htdocs/your-app-name` on macOS. Then, navigate to the project folder you just created.

### Installing Dependencies
This code sample uses the [`vlucas/phpdotenv`](https://github.com/vlucas/phpdotenv) library to parse environment variables. You can install it using [`Composer`](https://getcomposer.org/):
```bash
composer install
``` 

### Configuration
You need a McMaster API key for the Academic Calendar v2 API in order to use this application. You can obtain the API key [here](https://developer.api.mcmaster.ca/). Once you have the API key, put the key and the API endpoint inside a `.env` file:
```
API_SAMPLE_API_ENDPOINT=https://www.example.com/
API_SAMPLE_API_KEY=YOUR_API_KEY
```

### Running The App
First, start a local Apache server by using XAMPP. To do this, open XAMPP Control Panel (located at `C:\xampp\xampp-control.exe` for Windows or `/Applications/XAMPP/manager-osx.app` for macOS by default) and start the Apache server.

Once the Apache server is running, simply open your browser and navigate to `http://localhost/YOUR_APP_NAME` to view the app.