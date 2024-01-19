
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import 'react-date-picker/dist/DatePicker.css';
// import 'react-calendar/dist/Calendar.css';
import Navbar from "./components/Navbar";
import Script from "next/script";
import AuthProvider from "./context/AuthProvider";
import { headers } from "next/dist/client/components/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lango",
  description:
    "Learn a new language at a very reasonalbe price. Start your journy now",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // const pathname = headers()
  // console.log(pathname)
  return (
    <html lang="en">
      <body className={`${inter.className} bg-blue-400 `} style={{}}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

{
  /* <Script type='text/javascript' onReady={() => {
          
        }}>
          
          {function gapiLoaded() {
            gapi.load('client', )
          }}

          async function initializeGapiClient(){
            await gapi.client.init({
              
            })
          }
        </Script>
        <Script async defer src="https://apis.google.com/js/api.js" onLoad={gapiLoaded()} /> */
}
