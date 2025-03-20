import { getCookie } from "@/src/lib/cookies";
import { SocketProvider } from "../../lib/context/Socket";
import StoreProvider from "../../lib/redux/Provider";
import "../globals.css";


export const metadata = {
  title: "Power Panda",
  description: "Gaming platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getCookie();

  return (
    <StoreProvider>
      <SocketProvider token={token as string}>
        <main className="relative w-full h-full flex items-center justify-center flex-col">
          {children}
        </main>
      </SocketProvider>
    </StoreProvider>
  );
}
