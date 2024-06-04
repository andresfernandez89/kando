import { Navbar } from "@/components/nav";
import Aside from "@/components/aside-dashboar";
import Footer from "@/components/footer-dashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="flex overflow-hidden bg-white pt-16">
        <Aside />
        <div
          className="fixed inset-0 z-10 hidden bg-gray-900 opacity-50"
          id="sidebarBackdrop"
        ></div>
        <div
          id="main-content"
          className="relative h-full w-full overflow-y-auto bg-gray-50 lg:ml-48"
        >
          <main>
            <div className="w-fit px-4 pt-6">
              <div className="min-h-[calc(100vh-230px)] w-full">
                <div className="w-fit rounded-lg bg-white p-2 shadow sm:p-6 xl:p-8">
                  {children}
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
