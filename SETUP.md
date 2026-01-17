# Setup Instructions

## Quick Start (After Installing Node.js)

Once you have Node.js installed, follow these steps:

### 1. Install Dependencies

Open a terminal in this directory and run:

```bash
npm install
```

This will install all the required packages (React, Vite, TypeScript, etc.)

### 2. Start Development Server

```bash
npm run dev
```

The app will start at `http://localhost:5173`

### 3. Test the App

Navigate through the workflow:
1. Click on the Mining skill card
2. Select "Open a Mine"
3. Fill in event code (e.g., "JAN2026")
4. Fill in player number (e.g., "047")
5. Click Next
6. Select a mining skill level
7. Optionally toggle modifiers
8. Click Submit
9. View the generated mine card

### 4. Build for Production

When ready to deploy:

```bash
npm run build
```

This creates optimized files in the `dist/` folder.

## Troubleshooting

### Port Already in Use

If port 5173 is taken, Vite will automatically use the next available port.

### Module Not Found Errors

Run `npm install` again to ensure all dependencies are installed.

### TypeScript Errors

Make sure you're using Node.js 18 or higher. Check with:
```bash
node --version
```

## GitHub Pages Deployment

### One-Time Setup

1. Go to your repository on GitHub
2. Click **Settings** > **Pages**
3. Under "Build and deployment", select **GitHub Actions** as the source
4. That's it! The workflow is already configured.

### Deploy

Simply push to the main branch:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

The GitHub Action will automatically build and deploy your app.

## Embedding in Another Site

After deployment, you can embed the app using an iframe:

```html
<iframe
  src="https://YOUR_USERNAME.github.io/example-trade-skill-app/"
  width="100%"
  height="900"
  style="border: none; border-radius: 8px;"
  title="Sacred Grounds Shop"
></iframe>
```

## Need Help?

- Check the main [README.md](README.md) for detailed documentation
- Review the code comments in source files
- Check the browser console for error messages
