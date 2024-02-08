"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {
  const r = useRouter();
  const logout = () => {
    localStorage.removeItem("authorization");
    r.push("/");
  };
  return (
    <>
      <div className="navbar bg-base-100 border-b border-gray-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/sys/censadores">Censadores</Link>
              </li>
              <li>
                <Link href="/sys/registros">Registros</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <h1 className="text-xl">Sistema de Censos</h1>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image
                  alt="Tailwind CSS Navbar component"
                  src="/men.png"
                  width="56"
                  height="56"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {/*<li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>*/}
              <li>
                <button onClick={() => logout()}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
