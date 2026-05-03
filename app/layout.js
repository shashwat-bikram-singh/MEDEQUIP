import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "MedSupply Precision | Professional Medical Supplies",
  description:
    "Providing hospitals and private practices with certified medical equipment, diagnostic tools, and surgical supplies with millisecond accuracy in fulfillment.",
  keywords: "medical supplies, surgical equipment, FDA certified, hospital supplies, diagnostic tools",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
