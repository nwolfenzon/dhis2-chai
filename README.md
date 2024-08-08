# iMISS DHIS2 Custom Code Repository

## Overview

This repository contains all technical documentation and custom code for the Mozambique National Malaria Control Program (NMCP). The code and resources in this repository are designed to be integrated into the country's DHIS2 instance, known as iMISS (Integrated Malaria Information Storage System).

## Purpose

The primary goals of this repository are:

1. To centralize and manage custom code used for building forms and reports in the iMISS DHIS2 instance.
2. To facilitate technical knowledge sharing across developers working on the Mozambique NMCP project.

## Repository Structure

```
dhis2-custom-forms/
├── src/
│   ├── forms/
│   ├── reports/
│   └── shared/
├── dist/
├── tests/
├── docs/
├── .gitignore
├── README.md
└── package.json
```

- `src/`: Source code for custom forms and reports
- `dist/`: Compiled or processed files
- `tests/`: Unit and integration tests
- `docs/`: Additional documentation

## Getting Started

Developers have two options for working on custom forms and reports for the Mozambique NMCP DHIS2 project:

### Option 1: Local DHIS2 Development Environment

To set up a local DHIS2 development environment using Docker:

1. Install Docker on your machine if you haven't already. Visit [Docker's official website](https://www.docker.com/get-started) for installation instructions.

2. Pull the DHIS2 development image:
   ```
   docker pull dhis2/core:dev
   ```

3. Run the DHIS2 container:
   ```
   docker run -p 8080:8080 -d dhis2/core:dev
   ```

4. Access the DHIS2 instance at `http://localhost:8080`. The default username is "admin" and the password is "district".

5. Clone this repository:
   ```
   git clone https://github.com/your-org/mozambique-nmcp-dhis2.git
   cd mozambique-nmcp-dhis2
   ```

6. Install dependencies:
   ```
   npm install
   ```

7. Start working on custom forms and reports in the `src/` directory.

### Option 2: iMISS Dev Instance

To work directly on the iMISS Dev instance:

1. Request access to the iMISS Dev instance from the project administrator.

2. Once you have access, log in to the Dev instance at [Dev iMISS URL].

3. Clone this repository:
   ```
   git clone https://github.com/your-org/mozambique-nmcp-dhis2.git
   cd mozambique-nmcp-dhis2
   ```

5. Start working on custom forms and reports in the `src/` directory.

6. To test your changes, you can manually copy the HTML, CSS, and JavaScript code into the appropriate sections in the iMISS Dev instance.

### Development Workflow

1. Create a new branch for your feature or bug fix:
   ```
   git checkout -b feature/your-feature-name
   ```

2. Make your changes in the appropriate directories under `src/`.

3. Test your changes either locally or on the Dev instance.

4. Commit your changes:
   ```
   git add .
   git commit -m "Description of your changes"
   ```

5. Push your changes to the repository:
   ```
   git push origin feature/your-feature-name
   ```

6. Create a pull request for review.


## Usage

(Provide information on how to use the custom forms and reports, including any specific instructions for implementation in DHIS2)

## Contributing

We welcome contributions from developers working on the Mozambique NMCP project. Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature-name`)
6. Create a new Pull Request

## Best Practices

Given the context of this project, where code is manually copied to DHIS2 for use in custom forms or reports, adhering to the following best practices is crucial:

1. Version Control and Documentation

* Make frequent, small commits with clear and descriptive messages.
* Tag releases that correspond to versions deployed in the DHIS2 instance.
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
* When updating existing forms or reports, ensure changes are backward compatible or provide clear upgrade paths.

5. Performance and Security

* Optimize JavaScript and CSS for performance, considering the potentially limited resources of end-user devices.
* Never hard-code sensitive information (like API keys or credentials) in the source code.
* Minimize the use of heavy JavaScript libraries that might slow down form loading.

By following these focused best practices, we can maintain a high-quality, manageable codebase that is well-suited for the DHIS2 environment and the manual deployment process.

## Testing

TODO

## Deployment

TODO
