# BIMHub Browser

**BIMHub** is a basic proof-of-concept wireframe for a web-based Revit project presentation platform.  Currently, it supports pushing schedules and room plans and leaving comments.

## Setup

### Revit/Dynamo Dependencies

- `DynaWeb` 
- `Spring Nodes`

Set your DynamoPlayer directory to the `/dynamo` folder included in this project.

### Running the Server

A sample `.env` file has been included.  Rename it `.env` and point it to a `PostgreSQL` database on your system.

```
npm i
npx prisma migrate dev
npm run dev
```

## Usage

(coming soon)