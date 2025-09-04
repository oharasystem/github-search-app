# Next.js 14 + TypeScript + Tailwind CSS + shadcn Template

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).  
It includes TypeScript, Tailwind CSS, ESLint, and is configured to work with [shadcn](https://ui.shadcn.com).

---

## 🚀 Getting Started

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font).

---

## 🎨 Using shadcn

This template includes [shadcn](https://ui.shadcn.com), but **no UI components are installed by default**.  
You can add only the components you need.

### 1. Add a component

```bash
npx shadcn@latest add button
```

This will generate the component under:

```
components/ui/button.tsx
```

### 2. Import and use

```tsx
import { Button } from "@/components/ui/button";

export default function Example() {
  return (
    <div className="p-8">
      <Button>Click me</Button>
    </div>
  );
}
```

### 3. Customize

All components are copied into your project, so you can freely edit files under:

```
components/ui/
```

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [shadcn Documentation](https://ui.shadcn.com) - learn about UI components and usage.

You can also check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

---

## ☁️ Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
