# [Secret Share](https://secret.lystic.dev)

## Overview

Secret Share is a secure, one-time-use secret sharing application that allows users to create and share encrypted markdown-based secrets with end-to-end encryption. The application ensures that secrets can only be viewed once before being automatically deleted.

## Features

- 🔒 End-to-end encryption
- 📝 Markdown support for secret creation
- 🔗 One-time-use secret links
- 🌓 Dark and light theme support
- 📱 Responsive mobile-friendly design
- 🚀 Fast and minimal interface

## Technologies

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Crypto-js (for encryption)
- Monaco Editor
- Radix UI Components
- next-themes

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/secret-share.git
   cd secret-share
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Run the development server
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## How It Works

1. Create a new secret using the Markdown editor
2. Click "Save" to generate a unique, encrypted secret link
3. Share the link with your intended recipient
4. The recipient can view the secret only once
5. After viewing, the secret is automatically deleted

## Security

- Secrets are encrypted client-side before transmission
- Each secret has a unique decryption key stored in the URL fragment
- Secrets are automatically deleted after first view
- In-memory storage prevents long-term secret retention

## Deployment

The project includes a GitHub Actions workflow for Docker deployment:

- Automatically builds and pushes a Docker image to Docker Hub
- Triggered on pushes to the `main` branch

## Environment Variables

No specific environment variables are required for basic functionality.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
