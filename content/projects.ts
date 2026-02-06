import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    title: "Aurora Design System",
    summary:
      "A scalable component system powering multi-brand apps, focused on accessibility, tokens, and velocity.",
    stack: ["React", "TypeScript", "Storybook", "Tailwind"],
    links: {
      primary: "#",
      secondary: "#"
    }
  },
  {
    title: "Pulse Analytics",
    summary:
      "Real-time product insights dashboard with streaming charts and collaborative notes.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "WebSockets"],
    links: {
      primary: "#",
      secondary: "#"
    }
  },
  {
    title: "Orbit Learning",
    summary:
      "Personalized learning platform focused on progressive disclosure, habit loops, and performance budgets.",
    stack: ["React", "GraphQL", "Apollo", "Vercel"],
    links: {
      primary: "#",
      secondary: "#"
    }
  },
  {
    title: "Signal Commerce",
    summary:
      "Composable checkout flow optimized for conversions, with analytics-driven experimentation.",
    stack: ["Next.js", "Stripe", "Node.js"],
    links: {
      primary: "#",
      secondary: "#"
    }
  }
];
