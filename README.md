# ERP System with Grafana-centric Architecture

This project implements an ERP (Enterprise Resource Planning) system with a Grafana-centric architecture. The frontend is built with Next.js and primarily acts as a presentational layer, while Grafana handles data visualization including spreadsheets, charts, and interactive filters.

## Architecture Overview

- **Frontend (Next.js)**: Provides a modern, user-friendly UI and embeds Grafana dashboards/panels
- **Data Visualization (Grafana)**: Handles all data displays, including spreadsheets, charts, and interactive filters
- **Backend (Python/Flask)**: Adapts existing backend services to focus on robustly populating the PostgreSQL database
- **Database (PostgreSQL)**: Stores all ERP data and serves as the data source for Grafana

## Project Structure

```
erp_project/
├── .env                      # Environment variables
├── docker-compose.yml        # Docker Compose configuration
├── Dockerfile                # Backend Dockerfile
├── requirements.txt          # Python dependencies
├── src/                      # Backend source code
│   └── app.py                # Flask application
├── database_init/            # Database initialization scripts
│   └── 01_schema.sql         # Schema and sample data
├── grafana/                  # Grafana configuration
│   └── provisioning/         # Grafana provisioning
│       ├── datasources/      # Datasource configuration
│       │   └── postgres.yaml # PostgreSQL datasource
│       └── dashboards/       # Dashboard configuration
│           ├── dashboard.yaml # Dashboard provider
│           └── products_dashboard.json # Products dashboard
└── frontend/                 # Next.js frontend
    ├── Dockerfile            # Frontend Dockerfile
    ├── package.json          # Node.js dependencies
    ├── next.config.js        # Next.js configuration
    └── src/                  # Frontend source code
        ├── app/              # Next.js app directory
        │   ├── layout.tsx    # Root layout
        │   ├── page.tsx      # Home page
        │   ├── products/     # Products module
        │   │   └── page.tsx  # Products page
        │   ├── sales/        # Sales module
        │   │   └── page.tsx  # Sales page
        │   ├── purchases/    # Purchases module
        │   │   └── page.tsx  # Purchases page
        │   ├── reports/      # Reports module
        │   │   └── page.tsx  # Reports page
        │   └── accounting/   # Accounting module
        │       └── page.tsx  # Accounting page
        ├── components/       # React components
        │   └── Layout.tsx    # Layout component
        ├── lib/              # Utility functions
        │   └── theme.ts      # MUI theme
        └── styles/           # CSS styles
            └── globals.css   # Global styles
```

## Features

### Product Module

The product module is the first implemented module and includes:

- PostgreSQL table with fields:
  - category
  - brand
  - item description
  - sku
  - screen size (in)
  - touchscreen
  - storage (TB)
  - memory (GB)
  - charger
  - accessories

- Grafana dashboard with:
  - Product listing table with all fields
  - Filtering by category, brand, and touchscreen
  - Charts showing product distribution by category and brand

### Frontend

The Next.js frontend features:

- Modern UI with light colors and smooth layout
- Sidebar navigation for all ERP modules
- Embedded Grafana dashboards
- Responsive design for desktop and mobile

## Deployment

The system is designed to be deployed using Docker Compose, which sets up:

- PostgreSQL database
- Grafana server
- Flask backend
- Next.js frontend
- Adminer for database management
- Redis for caching/messaging

## Environment Variables

The following environment variables are used:

```
# Backend Application Configuration
APP_PORT=8000
DEBUG=True

# PostgreSQL Configuration
POSTGRES_DB=erp_db
POSTGRES_USER=erp_user
POSTGRES_PASSWORD=erp_password
DB_HOST=db
DB_PORT=5432
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${POSTGRES_DB}

# Redis Configuration
REDIS_HOST=redis
REDIS_PORT=6379

# Frontend API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api

# Grafana Configuration
GF_SECURITY_ADMIN_USER=admin
GF_SECURITY_ADMIN_PASSWORD=admin
GF_AUTH_ANONYMOUS_ENABLED=true
GF_AUTH_ANONYMOUS_ORG_ROLE=Viewer
GF_INSTALL_PLUGINS=grafana-postgresql-datasource
```

## Alternative Deployment Options

If Docker is not available or not working in your environment, you can deploy the components individually:

1. **PostgreSQL**: Install PostgreSQL and run the schema script from `database_init/01_schema.sql`
2. **Grafana**: Install Grafana, configure the PostgreSQL datasource, and import the dashboard from `grafana/provisioning/dashboards/products_dashboard.json`
3. **Backend**: Install Python dependencies from `requirements.txt` and run the Flask app from `src/app.py`
4. **Frontend**: Install Node.js dependencies from `frontend/package.json` and run the Next.js app

## Next Steps

Future development could include:

- Implementing additional modules (Sales, Purchases, Accounting)
- Adding more Grafana dashboards for each module
- Enhancing the frontend with more interactive features
- Implementing user authentication and authorization
- Adding more data visualization options
