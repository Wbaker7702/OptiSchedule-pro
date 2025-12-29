<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1t9N6qD-bsuD6OLWG_mKSU2RdZlj1jyCD

## Features

- **Dashboard**: Executive overview with real-time system pulse and fiscal metrics.
- **Scheduling Center**: Manage shifts and staff scheduling.
- **Operations Hub**: Track daily operations and efficiency.
- **Inventory Management**: Monitor stock levels and reorders.
- **Analytics & Reports**: Deep dive into data and trends.
- **Team Management**: Manage employee profiles and roles.
- **Strategy Playbook**: Access and manage operational strategies.
- **Security Audit Log**: Monitor system access, critical actions, and security alerts.
- **Training Portal**: Track staff certifications, training modules, and completion rates.
- **Facilities Maintenance**: Ticket system for equipment repair and store upkeep.

## Architecture & Data Flow

### Technology Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Visualization**: Recharts for data analytics
- **Icons**: Lucide React for consistent UI iconography

### Data Structure
The application uses a modular architecture with centralized type definitions (`types.ts`).
- **Views**: The application state is managed via a single source of truth for the current view, allowing seamless transitions between modules.
- **Components**: Reusable UI components (`StatCard`, `Sidebar`, `Header`) ensure consistency.
- **Mock Data**: Real-time simulation is achieved through mocked data streams (e.g., `pulseLogs` in Dashboard), designed to be easily swapped for real API endpoints.

### Key Modules
1.  **Fiscal Foundation**: Monitors execution leakage and ROI in real-time.
2.  **Linter Engine**: Automated code quality checks integrated into the dashboard feed.
3.  **HubSpot Integration**: Simulates lead ingestion and scoring.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
