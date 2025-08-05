# Application Structure & Setup Guide

## Prerequisites

- **Node.js** - JavaScript runtime environment
- **npm** - Node Package Manager (comes with Node.js)

## Getting Started

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run the Development Server
```bash
npm run dev
```

## File & Folder Structure

### Entry Points
- **`index.ts`** - Main entry point of the application
- **`app.ts`** - Application bootstrap file, imported by `index.ts`

### Server Configuration
The application uses Express.js with Socket.IO for real-time communication:

```typescript
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" }
});
```

- **`io`** - Socket.IO server instance that listens for and emits real-time events
- Mounted on the HTTP server for WebSocket communication

### Architecture Overview

#### Routes
- **`listenForEvents(io)`** - Exported router function from routes module
- Handles incoming Socket.IO events and routes them to appropriate controllers

#### Controllers
- Responsible for implementing business logic functions
- Handle the actual processing of events received from the routes

#### Models
- Represent data storage and CRUD operations
- **Note:** This application stores data in memory (no persistent database)

##### Model Details:
- **`ConnectionModel`** - Tracks active connections and their associated rooms
- **`RoomModel`** - Manages room lifecycle (creation, editing, joining, leaving, deletion)

#### Services
Contains service classes that encapsulate business logic:

- **`Rooms.ts`** - Room service class
  - Each instance represents a single room
  - Stored and managed by the `RoomModel`

- **`Game.ts`** - Game service class  
  - Each instance represents a game session within a room
  - Handles game-specific logic and state management
