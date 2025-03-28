# Bubble Up - Where Fleeting Ideas Find Their Voice

Bubble Up is a unique social platform that encourages quality over quantity by limiting users to 10 thoughts at a time. It's built with the modern T3 Stack, offering a seamless and responsive experience for sharing and discovering ideas.

## Features

- **Limited Posts**: Each user can have up to 10 active posts, encouraging thoughtful sharing
- **Authentication**: Secure login via multiple providers:
  - Google
  - GitHub
  - Discord
- **Interactive UI**:
  - Animated card reveals
  - Responsive design
  - Dark/Light mode support
- **Post Management**:
  - Create and delete posts
  - Favorite system
  - User profiles
  - Word-wrap and scroll for long content

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org)
- **Authentication**: [NextAuth.js](https://next-auth.js.org)
- **Database**: [Prisma](https://prisma.io)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **API**: [tRPC](https://trpc.io)
- **UI Components**: Custom components built with Radix UI
- **Testing**: Jest with React Testing Library

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bubbleup.git
cd bubbleup/pop
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
```bash
cp .env.example .env
```

Fill in your `.env` file with the necessary credentials:
```env
# Database
DATABASE_URL="your-database-url"

# Next Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# OAuth Providers
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"
AUTH_DISCORD_ID="your-discord-client-id"
AUTH_DISCORD_SECRET="your-discord-client-secret"
```

4. Initialize the database:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format:write` - Format code with Prettier
- `npm test` - Run tests
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Prisma Studio

## Deployment

The application is optimized for deployment on Vercel. Follow these steps:

1. Push your code to GitHub
2. Import your repository in Vercel
3. Configure your environment variables
4. Deploy!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Create T3 App](https://create.t3.gg)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com)
