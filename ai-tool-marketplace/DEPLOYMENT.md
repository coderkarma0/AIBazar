# AI Tool Marketplace - Deployment Guide

This guide provides comprehensive instructions for deploying the AI Tool Marketplace as a static site to various hosting platforms.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git repository access

## Build Configuration

The application is configured for static site generation with the following settings:

### Next.js Configuration (`next.config.ts`)

```typescript
const nextConfig: NextConfig = {
  output: "export", // Enable static export
  trailingSlash: true, // Add trailing slashes to URLs
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
  experimental: {
    optimizeCss: true, // Enable CSS optimization
  },
};
```

### Package.json Scripts

```json
{
  "scripts": {
    "build": "next build",
    "build:production": "NODE_ENV=production npm run build",
    "export": "next build && next export",
    "serve": "npx serve out"
  }
}
```

## Build Process

### 1. Install Dependencies

```bash
cd ai-tool-marketplace
npm install
```

### 2. Run Tests (Optional but Recommended)

```bash
npm test
```

### 3. Build for Production

```bash
npm run build:production
```

This will:

- Create an optimized production build
- Generate static HTML files for all pages
- Export the site to the `out/` directory
- Include all static assets and optimized JavaScript bundles

### 4. Verify Build Output

The build process generates:

- `out/index.html` - Homepage
- `out/tools/index.html` - Tools listing page
- `out/tools/[tool-id]/index.html` - Individual tool pages (100+ pages)
- `out/leaderboard/index.html` - Leaderboard page
- `out/coupons/index.html` - Coupons page
- `out/404.html` - Custom 404 page
- `out/robots.txt` - SEO robots file
- `out/sitemap.xml` - SEO sitemap
- `out/_next/` - Optimized JavaScript and CSS bundles

## Deployment Platforms

### Vercel (Recommended)

Vercel provides the best integration with Next.js applications.

#### Method 1: Vercel CLI

1. Install Vercel CLI:

```bash
npm install -g vercel
```

2. Login to Vercel:

```bash
vercel login
```

3. Deploy:

```bash
cd ai-tool-marketplace
vercel --prod
```

#### Method 2: GitHub Integration

1. Push your code to GitHub
2. Connect your repository to Vercel at [vercel.com](https://vercel.com)
3. Vercel will automatically deploy on every push to main branch

#### Vercel Configuration

Create `vercel.json` in the project root:

```json
{
  "buildCommand": "npm run build:production",
  "outputDirectory": "out",
  "trailingSlash": true,
  "cleanUrls": false
}
```

### Netlify

#### Method 1: Netlify CLI

1. Install Netlify CLI:

```bash
npm install -g netlify-cli
```

2. Build the project:

```bash
npm run build:production
```

3. Deploy:

```bash
netlify deploy --prod --dir=out
```

#### Method 2: Drag and Drop

1. Build the project locally:

```bash
npm run build:production
```

2. Drag the `out/` folder to [Netlify's deploy interface](https://app.netlify.com/drop)

#### Method 3: Git Integration

1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Netlify
3. Configure build settings:
   - Build command: `npm run build:production`
   - Publish directory: `out`

#### Netlify Configuration

Create `netlify.toml` in the project root:

```toml
[build]
  command = "npm run build:production"
  publish = "out"

[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404

[build.environment]
  NODE_VERSION = "18"
```

### GitHub Pages

1. Build the project:

```bash
npm run build:production
```

2. Create a new branch for deployment:

```bash
git checkout -b gh-pages
```

3. Copy build output:

```bash
cp -r out/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

4. Enable GitHub Pages in repository settings, select `gh-pages` branch

### AWS S3 + CloudFront

#### S3 Setup

1. Create an S3 bucket with static website hosting enabled
2. Build the project:

```bash
npm run build:production
```

3. Upload the `out/` directory contents to S3:

```bash
aws s3 sync out/ s3://your-bucket-name --delete
```

#### CloudFront Setup

1. Create a CloudFront distribution
2. Set the S3 bucket as the origin
3. Configure custom error pages:
   - 404 errors → `/404.html`
   - 403 errors → `/404.html`

### Firebase Hosting

1. Install Firebase CLI:

```bash
npm install -g firebase-tools
```

2. Initialize Firebase:

```bash
firebase init hosting
```

3. Configure `firebase.json`:

```json
{
  "hosting": {
    "public": "out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/404.html"
      }
    ]
  }
}
```

4. Build and deploy:

```bash
npm run build:production
firebase deploy
```

## Environment Variables

The application uses static data and doesn't require environment variables for basic functionality. However, if you add analytics or other services, create a `.env.local` file:

```bash
# Analytics (optional)
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Other services (optional)
NEXT_PUBLIC_API_URL=your-api-url
```

## Performance Optimization

### Bundle Analysis

To analyze bundle size:

```bash
npm run build:analyze
```

### Lighthouse Scores

The application is optimized for:

- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

### Key Optimizations

1. **Static Generation**: All pages are pre-rendered at build time
2. **Code Splitting**: Automatic code splitting with Next.js
3. **Image Optimization**: Disabled for static export, but images are optimized manually
4. **CSS Optimization**: TailwindCSS purging and minification
5. **JavaScript Minification**: Automatic with Next.js build process

## Monitoring and Analytics

### Google Analytics

Add to `app/layout.tsx`:

```typescript
import { GoogleAnalytics } from "@next/third-parties/google";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <GoogleAnalytics gaId="GA_MEASUREMENT_ID" />
      </body>
    </html>
  );
}
```

### Error Monitoring

Consider integrating:

- Sentry for error tracking
- LogRocket for session replay
- Hotjar for user behavior analytics

## Troubleshooting

### Common Issues

1. **Build Fails with ESLint Errors**

   ```bash
   npm run lint
   # Fix any linting issues before building
   ```

2. **Images Not Loading**

   - Ensure images are in the `public/` directory
   - Use relative paths starting with `/`

3. **404 Errors on Direct URL Access**

   - Configure your hosting platform to serve `404.html` for unknown routes
   - Ensure trailing slashes are handled correctly

4. **JavaScript Bundle Too Large**
   ```bash
   npm run build:analyze
   # Review bundle composition and optimize imports
   ```

### Build Verification

Test the build locally:

```bash
npm run build:production
npm run serve
# Visit http://localhost:3000
```

Verify all pages load correctly:

- Homepage: `/`
- Tools listing: `/tools/`
- Individual tools: `/tools/chatgpt/`
- Leaderboard: `/leaderboard/`
- Coupons: `/coupons/`
- 404 page: `/non-existent-page/`

## Security Considerations

1. **Content Security Policy**: Configure CSP headers on your hosting platform
2. **HTTPS**: Ensure SSL/TLS is enabled
3. **Security Headers**: Configure security headers (HSTS, X-Frame-Options, etc.)

## Maintenance

### Regular Updates

1. Update dependencies monthly:

```bash
npm update
npm audit fix
```

2. Test after updates:

```bash
npm test
npm run build:production
```

3. Monitor performance and accessibility scores regularly

### Content Updates

To update tool data:

1. Modify JSON files in `data/` directory
2. Run build process
3. Deploy updated build

## Support

For deployment issues:

1. Check build logs for specific errors
2. Verify all dependencies are installed
3. Ensure Node.js version compatibility (18+)
4. Test build locally before deploying

## Conclusion

The AI Tool Marketplace is optimized for static deployment and should work seamlessly on any static hosting platform. The build process generates a fully self-contained static site with excellent performance characteristics.
