import { Macondo, Macondo_Swash_Caps} from "next/font/google"; // Example: adding Roboto
import "./globals.css";
import { Toaster } from "react-hot-toast";
import MouseClickEffect from "../components/layout/MouseClickEffect";
import AudioPlayer from "../components/ui/AudioPlayer";
import { VolumeProvider } from "../lib/context/VolumeControl";

const Macondo_font = Macondo({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-macondo",
});



export const metadata = {
  title: "Power Panda",
  description: "Gaming platform",
};

export default function RootLayout({
  children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body>
        <div className="relative w-screen h-screen cursor-custom">
          <div className="absolute top-1/2 left-1/2 rotate-90 sm:rotate-0 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-[100vh] h-[100vw] sm:w-screen sm:h-screen">
            <VolumeProvider>
              <MouseClickEffect />
              {children}
              <Toaster
                containerClassName="m-0 flex items-center justify-center"
                containerStyle={{
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
                toastOptions={{
                  duration: 3,
                }}
              />
              <AudioPlayer />
              <div id="modal"></div>
              </VolumeProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
