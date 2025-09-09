# Overview

This is a Bengali e-commerce application for traditional pickles (আচার) built with a modern full-stack architecture. The application features a React frontend with TypeScript, Express.js backend, and PostgreSQL database with Drizzle ORM. It provides a complete shopping experience including product browsing, cart management, user authentication, and order processing, all designed with a Bengali-language interface and cultural branding.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible design
- **Styling**: Tailwind CSS with custom Bengali-themed color palette and typography
- **State Management**: Zustand for client-side state (cart, authentication) with persistence
- **Data Fetching**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Internationalization**: Bengali language support with Noto Sans Bengali font

## Backend Architecture
- **Framework**: Express.js with TypeScript for RESTful API endpoints
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Session Management**: Express sessions with PostgreSQL storage using connect-pg-simple
- **API Design**: RESTful endpoints for products, users, orders, and authentication
- **Data Validation**: Zod schemas shared between frontend and backend
- **Development**: Hot reload with Vite integration for seamless development experience

## Database Schema
- **Users**: Authentication and profile information with email/username uniqueness
- **Products**: Bengali pickle inventory with bilingual naming (Bengali/English)
- **Orders**: Customer orders with guest checkout support and address collection
- **Order Items**: Line items connecting orders to products with quantity and pricing
- **UUID Primary Keys**: Using PostgreSQL's gen_random_uuid() for secure identifiers

## State Management Strategy
- **Cart State**: Zustand store with localStorage persistence for shopping cart
- **Authentication**: Zustand store with persistence for user session management
- **Server State**: TanStack Query for API data caching and synchronization
- **UI State**: React local state for component-specific interactions

## Authentication & Authorization
- **Registration/Login**: Email-based authentication with secure password handling
- **Guest Checkout**: Orders can be placed without user accounts
- **Session Management**: Server-side sessions stored in PostgreSQL
- **Protected Routes**: Conditional rendering based on authentication status

# External Dependencies

## Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity optimized for serverless environments
- **drizzle-orm**: Type-safe SQL query builder and ORM for database operations
- **@tanstack/react-query**: Server state management and data synchronization
- **express**: Node.js web framework for REST API development
- **wouter**: Lightweight routing library for React applications

## UI and Styling
- **@radix-ui/***: Comprehensive collection of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework with custom theming
- **class-variance-authority**: Type-safe variant styling for components
- **lucide-react**: Consistent icon library for UI elements

## Development Tools
- **vite**: Fast build tool and development server with HMR
- **typescript**: Static type checking for enhanced developer experience
- **@replit/vite-plugin-***: Replit-specific development enhancements
- **eslint/prettier**: Code quality and formatting tools

## Form and Validation
- **react-hook-form**: Performant form library with minimal re-renders
- **@hookform/resolvers**: Integration layer for external validation libraries
- **zod**: Schema validation for runtime type safety
- **drizzle-zod**: Bridge between Drizzle schema and Zod validation

## Additional Features
- **date-fns**: Date manipulation and formatting utilities
- **cmdk**: Command palette component for enhanced user experience
- **embla-carousel-react**: Touch-friendly carousel component
- **zustand**: Lightweight state management with persistence middleware