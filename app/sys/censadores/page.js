"use client";
import { getHeadersFromLs } from "@/src/libs/headers.helper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [censadores, setCensadores] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 1,
    total: 0,
  });
  const r = useRouter();

  useEffect(() => {
    void getCensadores();
  }, [pagination.page]);

  const getCensadores = async () => {
    const isLogged = verifyLogin();
    if (!isLogged) return;
    const res = await fetch(
      "/api/user/censadores?page=" +
        pagination.page +
        "&limit=" +
        pagination.limit,
      getHeadersFromLs()
    );
    const { error, censadores, count } = await res.json();
    if (error) return toast(error, { type: "error" });
    if (count) {
      setLastPage(Math.ceil(count.total / pagination.limit));
      setPagination({ ...pagination, total: count.total });
    }
    setCensadores(censadores);
  };

  const verifyLogin = () => {
    if (!getHeadersFromLs()) {
      r.push("/");
      return false;
    }
    return true;
  };
  return (
    <main className="">
      <div className="p-10">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Censadores
          </h1>
        </div>
        <div className="flex flex-col mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="table table-xs">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Género</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {censadores.map((i, idx) => (
                  <tr key={idx}>
                    <th>{i.id}</th>
                    <td>{i.name}</td>
                    <td>{i.email}</td>
                    <td>{i.sex === 0 ? "Mujer" : "Hombre"}</td>
                    {/*<th><button className="btn btn-ghost btn-xs">details</button></th>*/}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th></th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Género</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="self-center join">
            <button
              className="join-item btn btn-sm"
              onClick={() => {
                if (pagination.page === 1) return;
                setPagination({ ...pagination, page: pagination.page - 1 });
              }}
            >
              «
            </button>
            <button className="join-item btn btn-sm no-animation">
              Página {pagination.page}
            </button>
            <button
              className="join-item btn btn-sm"
              onClick={() => {
                if (pagination.page === lastPage) return;
                setPagination({ ...pagination, page: pagination.page + 1 });
              }}
            >
              »
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
