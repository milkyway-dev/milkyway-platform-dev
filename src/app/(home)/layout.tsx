import { getCookie } from "@/src/lib/cookies";
import "../globals.css";
import StoreProvider from "@/src/lib/redux/Provider";
import { SocketProvider } from "@/src/lib/context/Socket";

export const metadata = {
  title: "power panda",
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
