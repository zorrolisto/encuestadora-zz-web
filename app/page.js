import Login from "@/src/components/login";

export const metadata = {
  title: "Sistema de Censo",
  description: "Login",
};

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen">
      <Login />
    </main>
  );
}
