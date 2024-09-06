# DHIS2 Custom Code Repository

## 1. Overview

This repository contains technical documentation and custom code for DHIS2 instances. The code and resources in this repository are designed to serve as a resource for DHIS2 developers and can be integrated into specific DHIS2 instances.

## 2. Purpose

The primary goals of this repository are:

1. To centralize and manage DHIS2 code used across CHAI
2. To facilitate technical knowledge sharing across developers working at CHAI

## 3. Repository Structure

```
CHAI-DHIS2/
├── web/
│   ├── models/
│   ├── reports/
│   ├── tracker-capture/
│   ├── utils/
│   └── docker-compose.dev.yml
├── python/
│   ├── data/
│   ├── eda/
│   ├── utils/
│   ├── README.MD
│   └── requirements.txt
├── apps-script/
├── .gitignore
└── README.md
```

- `web/`: source code for custom DHIS2 forms, reports, and enabling utilities
- `web/reports/`: custom DHIS2 reports
- `web/tracker-capture/`: custom DHIS2 forms for the tracker capture module
- `web/utils/`: generally useful javascript files for extending custom form functionality
- `web/docker-compose.dev.yml`: docker compose file used for local development with this repository


- `python/`: code for python data analysis and DHIS2 apis
- `python/data/`: directory to store data when doing analysis. (Note: all data files in this directory will be ignored by git and excluded from version control)
- `python/eda`: exploratory data analysis files
- `python/utils/`: generally useful python files for interacting with the DHIS2 api, DHIS2 automation, or DHIS2 analysis
- `python/.env.example`: sample environment variable definition file. Create a `python/.env` file to store sensitive information and avoid including credentials in version control

- `apps-script/`: Google Apps Script code for Google Suite products to interact with the DHIS2 APIs

## 4. Getting Started
Clone this repository:
```
git clone https://github.com/nwolfenzon-chai/chai-dhis2.git
```

See [DHIS2 Web Code](#4-dhis2-web-code), [DHIS2 Python Scripts](#5-dhis2-python-scripts) or [DHIS2 Apps Script Code](#6-dhis2-apps-script-code) sections for details

## 4. DHIS2 Web Code

This section of the repository contains HTML, JS, and CSS filed used to create DHIS2 form and reports. These files are designed to serve as inspiration for custom components supported by DHIS2.

Developers have two options for working on custom forms and reports:

### 4.1 (Option 1) Local Development using dockerized DHIS2-Core

1. Install Docker on your machine if you haven't already. Visit [Docker's official website](https://www.docker.com/get-started) for installation instructions.

2. Clone the DHIS2 Core repository. This will allow you to run a local instance of the DHIS2 web API and postgres database
   ```
   git clone https://github.com/dhis2/dhis2-core.git
   ```

3. Replace the path in `docker-compose.dev.yml` file with the relative path from the DHIS2 Core repo to this the web project in this repo (`<PATH TO THIS REPO>/chai-dhis2/web`)

4. `cd` into the DHIS2 Core repository web directory
   ```
   cd /path/to/repository/dhis2-core
   ```

5. Spin up the DHIS2 Core Docker containers by chaining the compose files:
   ```
   DHIS2_IMAGE=dhis2/core:2.40.0.1 DHIS2_DB_DUMP_URL=https://databases.dhis2.org/sierra-leone/2.40.0/dhis2-db-sierra-leone.sql.gz docker compose -f docker-compose.yml -f /path/to/chai-dhis2/docker-compose.dev.yml up -d
   ```
   *(Note: The above command uses 2.40.0 version of DHIS2. You can change the version numbers to use a difference version)*

6. HTML, CSS, and JS files can be accessed in custom forms and reports at `http://localhost:3000/chai-dhis2`. Example:
   ```
   <!DOCTYPE html>
   <html lang="en">
   <head>

      <!-- Custom styles -->
      <link rel="stylesheet" href="http://localhost:3000/chai-dhis2/reports/sample-report/style.css">

      <!-- Custom scripts -->
      <script src="http://localhost:3000/chai-dhis2/reports/sample-report/script.js"></script>

   </head>
   <body>
      <!-- Custom code goes here -->
   </body>
   ```


7. Access the DHIS2 instance at `http://localhost:8080`. The default username is "admin" and the password is "district".

### 4.2 Using a dev instance

1. Log in to an existing development instance of DHIS2 (e.g., country instance, DHIS2 play instance, etc.)
2. Navigate to the Maintenance or Reports app in DHIS2
3. Write HTML, CSS, and Javascript directly into your browser
4. Copy the files into this repository in the appropriate directory (e.g., `chai-dhis2/web/reports/sample-report`)


## 5. DHIS2 Python Scripts

This section of the repository contains Python scripts related to DHIS2. These scripts are designed to interact with DHIS2 systems, perform data operations, and automate various tasks.

### 5.1 Setup

#### Creating a virtual environment

To ensure consistency and avoid conflicts with other Python projects, we recommend using a virtual environment. Follow these steps to set up your environment:

1. Navigate to the `python` directory of this repository
   ```
   cd path/to/repository/chai-dhis2/python
   ```

2. Create a virtual environment
   ```
   /path/to/repository/chai-dhis2/python$ python -m venv .venv
   ```

3. Activate the virtual environment

 - on Windows:
    ```
    /path/to/repository/chai-dhis2/python$ .venv\Scripts\activate
    ```

  - on macOS and Linux:
    ```
    /path/to/repository/chai-dhis2/python$ source .venv/bin/activate
    ```

4. Install the requird packages
```
/path/to/repository/chai-dhis2/python$ pip install -r requirements.txt
```

#### Environment variables

Sensitive information such as API keys, database credentials, and other configuration details should be stored in environment variables. We use a `.env` file to manage these variables.

1. Create a `.env` file in the python directory
    ```
    /path/to/repository/chai-dhis2/python$ touch .env
    ```

2. Add your environment variables to the `.env` file (see `.env.example` for guidance). Example:
    ```
    DHIS2_URL=https://your-dhis2-instance.com
    DHIS2_USERNAME=your_username
    DHIS2_PASSWORD=your_password
    ```

3. To use these variables in your Python scripts, you can use the `python-dotenv` library
    ```
    from dotenv import load_dotenv
    import os

    load_dotenv()

    dhis2_url = os.getenv('DHIS2_URL')
    dhis2_username = os.getenv('DHIS2_USERNAME')
    dhis2_password = os.getenv('DHIS2_PASSWORD')
    ```

### 5.2 Usage

#### Utility Scripts

Users can contribute generally applicable Python files to the `python/utils` directory. These scripts should be designed to perform common operations related to DHIS2 data and can be used across different projects. Examples of such utility scripts include:

1. **DHIS2 API Interactions:** Scripts that pull data from the DHIS2 API, handle authentication, or manage API requests.
2. **Data Operations:** Scripts that perform general data operations on DHIS2 data, such as cleaning, transforming, or aggregating data.
3. **Data Visualization:** Scripts that create data visualizations from DHIS2 data, using libraries like Matplotlib, Seaborn, or Plotly.
4. **Data Export/Import:** Scripts that handle exporting DHIS2 data to various formats (CSV, JSON, etc.) or importing data into DHIS2.

#### Exploratory Data Analysis

Users can add illustrative exploratory data analysis scripts that they've leverage in their work to facilitate cross-team knowledge sharing.

#### Adding a script

When adding a new python script:
1. Place the script in the `python/utils` or `python/eda` directory in the appropriate subdirectory (e.g., `python/utils/api`)
2. Ensure the script is well-documented with docstrings and comments
3. If the script requires additional dependencies, add them to the `requirements.txt` file
4. If the script requires environment variables, document the necessary variables and data types (do not include values)

## 6. DHIS2 Apps Script code

This section of the repository contains Google Apps Script code related to DHIS2. This code allows Google Suite products like Google Sheets to interact with the DHIS2 APIs.

### 6.1 Setup

#### Google Sheets

To add to your Google Sheet, open Extensions > Apps Script and paste into Editor > Code.gs.

A custom menu will appear with a menu item to run the script.

The script can also can be set to a scheduler within Google Apps Script to automatically import data at a set time interval. To do so, open Extensions > Apps Script and go to Triggers. Select Add Trigger.

## 7. Development Workflow

1. Create a new branch for your feature or bug fix:
   ```
   git checkout -b branch-name
   ```

2. Make your changes in the appropriate directories

3. Test your changes either locally or on the dev instance.

4. Commit your changes:
   ```
   git add .
   git commit -m "Description of your changes"
   ```

5. Push your changes to the repository:
   ```
   git push origin branch-name
   ```

6. Navigate to the repository on github

7. Create a pull request for review.


## Contributing

We welcome contributions from CHAI developers working on any DHIS2-related project. Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature-name`)
6. Create a new Pull Request

## Best Practices

Given DHIS2 development paradigms, where code is manually copied to DHIS2 for use in custom forms or reports, adhering to the following best practices will facilitate code management and knowledge sharing:

1. Version Control and Documentation

* Make frequent, small commits with clear and descriptive messages.
* Maintain a changelog detailing modifications made to each form or report.
* Include the date of last update and the corresponding commit hash in comments at the top of each file.

2. Code Organization and Consistency

* Keep related files (HTML, CSS, JavaScript) for a single form or report in the same directory.
* Use descriptive names for files and folders that reflect their purpose or the form/report they belong to.
* Follow DHIS2 naming conventions for custom data elements, indicators, or program rules.
* Minimize the use of inline styles in HTML; prefer separate CSS files for better maintainability.

3. DHIS2-Specific Practices

* Use DHIS2 API calls consistently and efficiently. Document any specific API requirements for each form or report.
* Implement proper input validation and sanitization in forms to prevent XSS attacks.
* Be cautious with user permissions and data access in custom reports.
* Test forms and reports thoroughly in a DHIS2 development environment before deployment.

4. Deployment and Change Management

* Maintain a deployment log that records which version of each form or report is currently active in the DHIS2 instance.
* Include instructions for rolling back changes in case of issues after deployment.

5. Performance and Security

* Optimize JavaScript and CSS for performance, considering the potentially limited resources of end-user devices.
* Never hard-code sensitive information (like API keys or credentials) in the source code.
* Minimize the use of heavy JavaScript libraries that might slow down form loading.

By following these focused best practices, we can maintain a high-quality, manageable codebase that is well-suited for the DHIS2 environment and the manual deployment process.

