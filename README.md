# Visionvation ERP - A Grafana-Centric ERP System

![Visionvation Logo](/frontend/public/assets/visionvation_logo.png)

Welcome to the Visionvation ERP system! This project implements a modern Enterprise Resource Planning (ERP) solution with a strong emphasis on data visualization through Grafana. The frontend, built with Next.js, serves primarily as an elegant and user-friendly presentational layer, while Grafana is leveraged for all data displays, including interactive dashboards, detailed reports, spreadsheets, charts, and dynamic filters.

This document provides a comprehensive guide to understanding, installing, configuring, and deploying the Visionvation ERP system.

## 1. Introduction

The Visionvation ERP system is designed to help businesses streamline and manage core operations. The initial focus is on Product Management, with future expansions planned for Sales, Purchases, Accounting, and advanced Reporting/Analytics.

### 1.1. Core Architectural Principles

- **Grafana-Centric Visualization**: All data-intensive displays and interactions are handled by Grafana, minimizing data processing and state management within the frontend.
- **Modern Frontend UI**: The Next.js frontend provides a clean, intuitive, and responsive user interface, styled with light colors, smooth layouts, and appropriate iconography, ensuring a seamless user experience.
- **Robust Backend Services**: The Python/Flask backend is responsible for managing business logic and robustly populating the PostgreSQL database, which acts as the single source of truth for Grafana.
- **Modular Design**: The system is built with a modular approach, allowing for independent development and scaling of different ERP functionalities (Products, Sales, etc.).

### 1.2. Key Features (Current & Planned)

- **Product Management (Implemented)**:
    - Add, update, and manage detailed product information including SKU, categories, brand, specifications (screen size, touchscreen, storage, memory), charger details, and accessories.
    - View product listings with comprehensive details.
    - Interactive Grafana dashboard for product analytics, including filtering by category, brand, and touchscreen status, and visualizations of product distributions.
- **Sales Management (Planned)**: Record sales transactions, link to inventory, manage order statuses, and generate sales reports.
- **Purchase Management (Planned)**: Record purchase orders, link to inventory, manage supplier interactions, and track procurement.
- **Accounting Module (Planned)**: Manage Chart of Accounts, record Journal Entries, and prepare for financial reporting.
- **Reporting & Analytics (Enhanced in future)**: Generate comprehensive reports for sales, inventory, purchases, and financial statements using Grafana.

## 2. System Requirements

To successfully run and develop the Visionvation ERP system, the following software and tools are required:

### 2.1. For Docker-based Deployment (Recommended)

- **Docker Engine**: Version 20.10.0 or newer. Docker simplifies the deployment and management of all services.
- **Docker Compose**: Version 1.29.0 or newer (though the `version` attribute in `docker-compose.yml` is for Compose V2+ syntax, the binary itself should be compatible). This tool is used to define and run multi-container Docker applications.
- **Web Browser**: A modern web browser such as Chrome, Firefox, Edge, or Safari (latest versions recommended) for accessing the frontend and Grafana interface.
- **Internet Connection**: Required for pulling Docker images and initial setup of dependencies.
- **Operating System**: A Linux-based system is recommended for the smoothest Docker experience. Windows (with WSL2) or macOS can also be used.

### 2.2. For Manual (Non-Docker) Deployment & Development

- **Node.js**: Version 18.x or newer (for the Next.js frontend).
- **npm (Node Package Manager)**: Version 8.x or newer (typically comes with Node.js).
- **Python**: Version 3.9 or newer (for the Flask backend).
- **pip (Python Package Installer)**: Version 21.x or newer (typically comes with Python).
- **PostgreSQL Server**: Version 14 or newer.
- **Grafana Server**: Version 9.x or newer.
- **Git**: For cloning the repository and version control.
- **Text Editor/IDE**: Such as VS Code, PyCharm, WebStorm, etc., for code development.

## 3. Installation and Setup

This section provides detailed instructions for installing and setting up the Visionvation ERP system.

### 3.1. Cloning the Repository

First, clone the project repository from GitHub:

```bash
git clone https://github.com/alwazw/manus-erp-2.git
cd manus-erp-2
```

All subsequent commands should be run from the root directory of the cloned project (`manus-erp-2`).

### 3.2. Environment Configuration (`.env` file)

Before starting the application, you need to configure the environment variables. A sample `.env` file is usually provided as `.env.example` (if not, create one based on the template below). Copy or create a `.env` file in the project root directory and populate it with your desired settings:

```dotenv
# Backend Application Configuration
APP_PORT=8000
DEBUG=True # Set to False in production

# PostgreSQL Configuration
POSTGRES_DB=visionvation_erp_db
POSTGRES_USER=visionvation_user
POSTGRES_PASSWORD=your_strong_password # Please change this!
DB_HOST=db # Service name in docker-compose.yml for Docker setup, or 'localhost' for manual setup
DB_PORT=5432
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${POSTGRES_DB}

# Redis Configuration (if used, currently placeholder in docker-compose)
REDIS_HOST=redis # Service name in docker-compose.yml
REDIS_PORT=6379

# Frontend API Configuration
# This URL is used by the Next.js frontend to communicate with the backend API.
# For Docker setup, this will be the backend service URL exposed by Docker.
# For manual setup, this will be http://localhost:8000/api (or your configured backend port).
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api

# Grafana Configuration
GF_SECURITY_ADMIN_USER=admin
GF_SECURITY_ADMIN_PASSWORD=admin # Change this in a production environment!
GF_AUTH_ANONYMOUS_ENABLED=true
GF_AUTH_ANONYMOUS_ORG_ROLE=Viewer
GF_INSTALL_PLUGINS=grafana-postgresql-datasource

# Frontend Grafana URL (for embedding)
# This is the URL Next.js will use to embed Grafana panels/dashboards.
# For Docker setup, this will be the Grafana service URL exposed by Docker.
# For manual setup, this will be http://localhost:3000 (or your configured Grafana port).
NEXT_PUBLIC_GRAFANA_URL=http://localhost:3000
```

**Important Security Notes:**
- Always change default passwords (`POSTGRES_PASSWORD`, `GF_SECURITY_ADMIN_PASSWORD`) for production environments.
- Set `DEBUG=False` for the backend application in production.

### 3.3. Docker-Based Deployment (Recommended)

This is the simplest way to get all services up and running.

1.  **Ensure Docker and Docker Compose are installed** (see Section 2.1).
2.  **Navigate to the project root directory** (`manus-erp-2`).
3.  **Build and start all services** using Docker Compose:

    ```bash
    docker compose up -d --build
    ```

    -   `up`: Creates and starts containers.
    -   `-d`: Runs containers in detached mode (in the background).
    -   `--build`: Forces Docker to build the images before starting containers (useful if you made changes to Dockerfiles or application code).

4.  **Accessing Services:** Once the services are running, you can access them via your web browser:
    -   **Visionvation ERP Frontend (Next.js):** `http://localhost:3003`
    -   **Grafana (Data Visualization):** `http://localhost:3000` (Default credentials: `admin`/`admin` or as set in `.env`)
    -   **Backend API (Flask):** `http://localhost:8000` (e.g., `http://localhost:8000/api/health` for health check)
    -   **Adminer (Database Management):** `http://localhost:8080` (Use `db` for Server, `visionvation_user` for Username, and your `POSTGRES_PASSWORD` for Password, `visionvation_erp_db` for Database).
    -   **PostgreSQL:** Accessible internally by other Docker containers on port `5432` (service name `db`).
    -   **Redis:** Accessible internally by other Docker containers on port `6379` (service name `redis`).

5.  **Troubleshooting Docker Deployment:**
    -   If you encounter errors, first check the logs for the failing container: `docker compose logs <service_name>` (e.g., `docker compose logs frontend`).
    -   Ensure no other applications are using the ports defined in `docker-compose.yml` and `.env` (e.g., 3000, 3003, 5432, 8000, 8080).
    -   If you faced issues with `npm ci` during the build (as indicated in previous logs), ensure `frontend/package-lock.json` is present and up-to-date. If not, navigate to `frontend/` directory, run `npm install` to generate it, then commit and push the `package-lock.json` file, and try the Docker build again.

### 3.4. Manual (Non-Docker) Deployment & Development Setup

If you prefer or need to run services manually without Docker:

1.  **Install PostgreSQL Server** (Version 14+):
    -   Follow instructions for your operating system.
    -   Create a database (e.g., `visionvation_erp_db`), a user (e.g., `visionvation_user`), and grant privileges.
    -   Update the `DB_HOST`, `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD` in your `.env` file accordingly (e.g., `DB_HOST=localhost`).
    -   Initialize the schema by running the SQL script located at `database_init/01_schema.sql` against your newly created database. You can use `psql` or a GUI tool like pgAdmin.
        ```bash
        psql -U visionvation_user -d visionvation_erp_db -a -f database_init/01_schema.sql
        ```

2.  **Install Grafana Server** (Version 9+):
    -   Follow instructions for your operating system from the official Grafana website.
    -   Start the Grafana server (usually `sudo systemctl start grafana-server`).
    -   Access Grafana at `http://localhost:3000`.
    -   Log in (default `admin`/`admin`).
    -   **Configure Data Source:**
        -   Go to Configuration (gear icon) > Data Sources > Add data source.
        -   Select PostgreSQL.
        -   Configure the connection details (Host: `localhost:5432`, Database: `visionvation_erp_db`, User: `visionvation_user`, Password: your PostgreSQL password, SSL Mode: `disable`).
        -   Save & Test.
    -   **Import Dashboard:**
        -   Go to Dashboards (four squares icon) > Browse > Import.
        -   Upload or paste the JSON from `grafana/provisioning/dashboards/products_dashboard.json`.
        -   Select the PostgreSQL data source you just configured.
        -   Click Import.

3.  **Setup Backend (Python/Flask)**:
    -   Navigate to the project root directory (`manus-erp-2`).
    -   Create a Python virtual environment (recommended):
        ```bash
        python3 -m venv venv
        source venv/bin/activate  # On Windows: venv\Scripts\activate
        ```
    -   Install Python dependencies:
        ```bash
        pip install -r requirements.txt
        ```
    -   Ensure your `.env` file has the correct `DATABASE_URL` for your manual PostgreSQL setup.
    -   Run the Flask application:
        ```bash
        python src/app.py
        ```
        The backend API will be available at `http://localhost:8000` (or the port set in `APP_PORT`).

4.  **Setup Frontend (Next.js)**:
    -   Navigate to the `frontend` directory: `cd frontend`.
    -   Install Node.js dependencies:
        ```bash
        npm install
        ```
        (This will also generate `package-lock.json` if it doesn't exist or update it).
    -   Ensure your `.env` file in the project root has `NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api` and `NEXT_PUBLIC_GRAFANA_URL=http://localhost:3000` (or your manually configured ports).
    -   Run the Next.js development server:
        ```bash
        npm run dev
        ```
        The frontend will be available at `http://localhost:3003`.

## 4. Project Structure Explained

```
manus-erp-2/
├── .env                      # Environment variables for all services
├── docker-compose.yml        # Defines services, networks, and volumes for Docker
├── Dockerfile                # Docker build instructions for the backend (Flask app)
├── requirements.txt          # Python dependencies for the backend
├── src/                      # Backend source code
│   └── app.py                # Main Flask application file, defines API endpoints
├── database_init/            # Scripts for database initialization
│   └── 01_schema.sql         # SQL script to create tables and insert sample data
├── grafana/                  # Grafana configuration and provisioning files
│   └── provisioning/         # Directory for Grafana's provisioning system
│       ├── datasources/      # Datasource definitions for Grafana
│       │   └── postgres.yaml # Defines the PostgreSQL datasource connection
│       └── dashboards/       # Dashboard definitions for Grafana
│           ├── dashboard.yaml # Configures the dashboard provider (how Grafana finds dashboards)
│           └── products_dashboard.json # JSON model for the Products Dashboard
└── frontend/                 # Next.js frontend application
    ├── Dockerfile            # Docker build instructions for the frontend (Next.js app)
    ├── package.json          # Node.js project manifest, lists dependencies and scripts
    ├── package-lock.json     # Records exact versions of frontend dependencies
    ├── next.config.js        # Next.js specific configurations (e.g., rewrites, output mode)
    ├── tsconfig.json         # TypeScript configuration for the frontend
    └── src/                  # Frontend source code
        ├── app/              # Next.js App Router directory structure
        │   ├── layout.tsx    # Root layout component, includes theme and global styles
        │   ├── page.tsx      # Home page (Dashboard overview)
        │   ├── products/     # Product module pages
        │   │   └── page.tsx  # Main page for the Products module, embeds Grafana dashboard
        │   ├── (other_modules)/ # Placeholder directories for future modules (sales, purchases, etc.)
        │   │   └── page.tsx
        │   └── global-error.tsx # (Optional) Global error handling for Next.js
        ├── components/       # Reusable React components
        │   └── Layout.tsx    # Main application layout (sidebar, app bar)
        ├── lib/              # Utility functions, libraries, or configurations
        │   └── theme.ts      # MUI (Material-UI) theme configuration
        ├── public/           # Static assets served by Next.js
        │   └── assets/
        │       └── visionvation_logo.png # Company logo
        └── styles/           # CSS styles
            └── globals.css   # Global CSS styles applied to the application
```

## 5. Development

### 5.1. Backend Development

- The backend is a Flask application located in the `src/` directory.
- API endpoints are defined in `src/app.py`.
- Modify or add new endpoints as needed. Ensure database interactions are handled correctly.
- If running manually, restart the Flask server after making changes.
- If using Docker, rebuild the backend image: `docker compose build backend` and then `docker compose up -d backend`.

### 5.2. Frontend Development

- The frontend is a Next.js application located in the `frontend/` directory.
- Pages are located in `frontend/src/app/`.
- Reusable components are in `frontend/src/components/`.
- The MUI theme is configured in `frontend/src/lib/theme.ts`.
- If running manually with `npm run dev`, changes will typically hot-reload in the browser.
- If using Docker, rebuild the frontend image: `docker compose build frontend` and then `docker compose up -d frontend`.

### 5.3. Grafana Dashboard Development

- Dashboards can be developed directly in the Grafana UI (`http://localhost:3000`).
- Once a dashboard is finalized, export its JSON model (Share dashboard > Export > Save to file or View JSON).
- Place the exported JSON file in `grafana/provisioning/dashboards/`.
- Ensure the `grafana/provisioning/dashboards/dashboard.yaml` provider is configured to pick up dashboards from this directory.
- For changes to provisioned dashboards to take effect in Docker, you might need to restart the Grafana container: `docker compose restart grafana`.

## 6. Contributing

Contributions are welcome! Please follow standard Git practices (fork, branch, pull request).

## 7. License

This project is licensed under the MIT License. See the `LICENSE` file for details (if one is added).

## 8. Further Assistance

For any issues or questions, please open an issue on the GitHub repository: [https://github.com/alwazw/manus-erp-2/issues](https://github.com/alwazw/manus-erp-2/issues)

---

Thank you for using Visionvation ERP!
