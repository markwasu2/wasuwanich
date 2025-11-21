# 🏛️ Magical Bookstore - Interactive Experience

An immersive, interactive bookstore experience built with Next.js, featuring clickable hotspots and ambient music.

## ✨ Features

- **Interactive Hotspots**: Click on glowing spots to discover different areas of the bookstore
- **Ambient Music**: Toggle background music for an immersive experience
- **Smooth Animations**: Beautiful glow effects and transitions
- **Responsive Design**: Works on desktop and mobile devices
- **TypeScript**: Fully typed for better development experience

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/markwasu2/wasuwanich.git
cd wasuwanich
```

2. Install dependencies:
```bash
npm install
```

3. Add your assets (see below)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Adding Your Assets

### Required: Background Image
1. Add your magical bookstore image as `public/magic-bookstore.jpg`
2. Recommended resolution: 1920x1080 or higher
3. The image will automatically display as the background

### Optional: Background Music
1. Add your music file as `public/audio/lofi.mp3`
2. Format: MP3 audio file
3. The music will loop when played

**Quick Add**: Simply drag and drop your files into the appropriate folders in Cursor!

## 🎨 Customization

### Modify Hotspots

Edit `app/hotspots.ts` to change hotspot positions and descriptions:

```typescript
export const HOTSPOTS: Hotspot[] = [
  {
    id: "shelf1",
    x: 20,        // % from left
    y: 40,        // % from top
    label: "Mystery Section",
    description: "Your description here...",
  },
  // Add more hotspots...
];
```

### Styling

Edit `app/globals.css` to customize:
- Colors and animations
- Hotspot appearance
- Info panel styling
- Music button design

## 🏗️ Project Structure

```
wasuwanich/
├── app/
│   ├── hotspots.ts      # Hotspot configuration
│   ├── page.tsx         # Main interactive page
│   ├── layout.tsx       # Root layout
│   └── globals.css      # Global styles
├── public/
│   ├── magic-bookstore.jpg  # Your background image (add this)
│   └── audio/
│       └── lofi.mp3         # Your music file (add this)
└── package.json
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial magical bookstore site"
git push origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Select your `wasuwanich` repository
5. Click "Deploy" (Vercel auto-detects Next.js settings)
6. Your site will be live in minutes! 🎉

### Other Deployment Options

- **Netlify**: Connect your GitHub repo
- **AWS Amplify**: Deploy with AWS
- **Self-hosted**: Build with `npm run build` and deploy the `.next` folder

## 🛠️ Built With

- [Next.js 16](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [React](https://react.dev/) - UI library

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production server
- `npm run lint` - Run ESLint

## 🎯 Next Steps

- [ ] Add your `magic-bookstore.jpg` image
- [ ] Add your `lofi.mp3` music file (optional)
- [ ] Customize hotspot positions and descriptions
- [ ] Deploy to Vercel
- [ ] Share your magical bookstore with the world!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and make it your own! Add more features, different animations, or entirely new interactions.

---

Made with ✨ magic and 📚 books
