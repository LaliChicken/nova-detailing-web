import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { MotionRuntime } from "@/components/motion/motion-runtime";
import { siteConfig } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NOVA Detailing | Bay Area Mobile Detailing",
    template: "%s | NOVA Detailing",
  },
  description: siteConfig.description,
};

export const viewport = {
  themeColor: "#030a1a",
};

/**
 * Runs before first paint so revealed elements never flash in and out. The
 * timeout is a safety net: if the motion runtime never hydrates, everything
 * becomes visible instead of staying hidden.
 */
const motionBootstrap = `
(function () {
  var root = document.documentElement;
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  } catch (error) {
    return;
  }
  root.setAttribute("data-motion", "on");
  setTimeout(function () {
    if (root.getAttribute("data-motion-ready") !== "true") {
      root.removeAttribute("data-motion");
    }
  }, 3000);
})();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootstrap }} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileActionBar />
        <MotionRuntime />
      </body>
    </html>
  );
}
