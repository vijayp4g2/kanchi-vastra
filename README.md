# Kanchi Vastra Project

This project is structured as a monorepo containing the Client, Admin, and Server applications.

## Structure

- **client/**: Customer-facing website (React + Vite).
- **admin/**: Admin dashboard (React + Vite).
- **server/**: Backend API (Node.js + Express + MongoDB).

## Getting Started

1. **Install Dependencies**
   Run the following command in the root directory:
   ```bash
   npm install
   ```
   This will install dependencies for all workspaces.

2. **Run Development Servers**
   To run specific services:
   - Client: `npm run dev:client`
   - Admin: `npm run dev:admin`
   - Server: `npm run dev:server`

## Deployment

- The `dist` folder in `client` and `admin` contains the production build for each frontend.
- `server` is the backend API.
