import Sidebar from "../components/components/Sidebar";


export default function SistemaLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (

    <div className="flex min-h-screen bg-black">


      <div>
        <Sidebar />
      </div>


      <main className="flex-1 p-6">

        {children}

      </main>


    </div>

  );

}

