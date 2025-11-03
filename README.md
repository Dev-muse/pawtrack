# 🐾 PawTrack

A modern pet daycare management application built with Next.js 14, designed to help pet daycare businesses efficiently track and manage pets under their care.

![PawTrack Banner](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-5.8-2D3748?style=for-the-badge&logo=prisma)

## ✨ Features

- 🔐 **Secure Authentication** - User registration and login with NextAuth v5
- 🐕 **Pet Management** - Add, edit, delete, and view detailed pet information
- 🔍 **Real-time Search** - Quickly find pets by name
- 📊 **Dashboard Analytics** - Track the number of current guests
- 👤 **Account Management** - Manage user profiles and sessions
- 🎨 **Modern UI** - Beautiful, responsive interface with dark mode support
- ⚡ **Optimistic Updates** - Smooth, instant UI updates
- 📱 **Responsive Design** - Works seamlessly on all device sizes

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI, shadcn/ui
- **Form Handling:** React Hook Form
- **Validation:** Zod

### Backend
- **Database:** SQLite (via Prisma ORM)
- **Authentication:** NextAuth v5
- **Password Hashing:** bcryptjs
- **API:** Next.js Server Actions

### Additional Libraries
- **Icons:** Lucide React
- **Notifications:** Sonner
- **Theme:** next-themes
- **Class Management:** clsx, tailwind-merge (cn utility)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ 
- npm, yarn, pnpm, or bun

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd pawtrack
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Environment Variables
Create a .env file in the root directory:
```bash
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
AUTH_SECRET="your-secret-key-here"
# Generate a secure secret with: openssl rand -base64 32

# App URL (for production)
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Set Up the Database
```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed the database with sample data
npx prisma db seed
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open http://localhost:3000 in your browser to see the application.

## 📁 Project Structure
```bash
pawtrack/
├── prisma/
│   ├── schema.prisma      # Database schema
│   ├── seed.ts           # Database seeding script
│   └── dev.db            # SQLite database
├── public/               # Static assets
├── src/
│   ├── actions/
│   │   └── action.ts     # Server actions (auth, pet CRUD)
│   ├── app/
│   │   ├── (app)/        # Protected app routes
│   │   │   └── app/
│   │   │       ├── dashboard/  # Main dashboard
│   │   │       └── account/    # User account page
│   │   ├── (auth)/       # Authentication routes
│   │   │   ├── login/    # Login page
│   │   │   └── signup/   # Sign up page
│   │   ├── (marketing)/  # Landing page
│   │   └── api/
│   │       └── auth/     # NextAuth API routes
│   ├── components/
│   │   ├── ui/           # Reusable UI components
│   │   ├── AuthForm.tsx  # Authentication form
│   │   ├── PetList.tsx   # Pet list component
│   │   ├── PetDetails.tsx # Pet details view
│   │   ├── PetForm.tsx   # Pet add/edit form
│   │   └── ...
│   ├── context/
│   │   ├── PetContextProvider.tsx    # Pet state management
│   │   └── SearchContextProvider.tsx # Search state management
│   ├── lib/
│   │   ├── auth.ts       # NextAuth configuration
│   │   ├── db.ts         # Prisma client
│   │   ├── types.ts      # TypeScript types & Zod schemas
│   │   ├── hooks.ts      # Custom React hooks
│   │   └── utils.ts      # Utility functions
│   └── styles/
│       └── globals.css   # Global styles
├── .env                  # Environment variables
├── next.config.mjs       # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🔑 Key Functionalities
### Authentication
- User registration with email and password
- Secure login with credential validation
- Protected routes with middleware
- Session management with JWT
- Password hashing with bcrypt

### Pet Management
- Add Pet: Register new pets with name, owner, age, image, and notes
- Edit Pet: Update pet information
- Delete Pet: Remove pets from the system (with checkout)
- View Details: See complete pet information
- Search: Filter pets by name in real-time

### Dashboard
- Visual pet list with avatars
- Selected pet details view
- Current guest count statistics
- Quick access to add new pets
  
## 🗄️ Database Schema

### User
- id - Unique identifier (cuid)
- email - User email (unique)
- hashedPassword - Encrypted password
- pets - Relation to Pet model
- createdAt / updatedAt - Timestamps

### Pet
- id - Unique identifier (cuid)
- name - Pet name
- ownerName - Owner's name
- imageUrl - Pet image URL
- age - Pet age
- notes - Additional notes
- userId - Foreign key to User
- createdAt / updatedAt - Timestamps

## 🎯 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Database
npx prisma generate  # Generate Prisma Client
npx prisma migrate dev    # Run migrations
npx prisma studio    # Open Prisma Studio GUI
npx prisma db seed   # Seed database

# Linting
npm run lint         # Run ESLint
```
## 🔐 Authentication Flow
- User visits the landing page
- User can sign up or log in
- Credentials are validated with Zod schemas
- Password is hashed using bcryptjs
- NextAuth creates a session with JWT
- Protected routes check for valid session
- Unauthorized users are redirected to login

## 🎨 Styling
The application uses:

- Tailwind CSS for utility-first styling
- CSS Variables for theming (light/dark mode)
- shadcn/ui for pre-built accessible components
- Radix UI for headless component primitives
- Custom color palette defined in tailwind.config.ts


## 🚦 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | SQLite database connection string | Yes |
| `AUTH_SECRET` | Secret for NextAuth JWT encryption | Yes |
| `NEXTAUTH_URL` | Base URL for authentication | Production only |

## 📝 License

This project is private and proprietary.

## 👤 Author

**Rahman Muse**

## 🤝 Contributing

This is a private project. If you have access and would like to contribute:

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## 🐛 Known Issues & Future Enhancements

- [ ] Add image upload functionality
- [ ] Implement email notifications
- [ ] Add export/import features
- [ ] Implement pet check-in/check-out history
- [ ] Add payment integration
- [ ] Multi-user/team support

## 📧 Support

For support, please contact the repository maintainer.

---

Built with ❤️ using Next.js
