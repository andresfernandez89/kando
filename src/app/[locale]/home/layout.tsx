export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="relative flex min-h-screen ">
        <div className="flex min-w-0 flex-auto flex-col items-center bg-white sm:flex-row sm:justify-center md:items-start md:justify-start">
          <div className="relative hidden h-full flex-auto items-center justify-center overflow-hidden bg-purple-900 bg-cover bg-no-repeat p-10 text-white sm:w-1/2 md:flex xl:w-3/5">
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-indigo-600 to-blue-500 opacity-75"></div>
            <div className="z-10  w-full max-w-md">
              <div className="mb-6 font-bold leading-tight sm:text-4xl xl:text-5xl">
                Kando
              </div>
              <div className="xl:text-md font-normal text-gray-200 sm:text-sm">
                {" "}
                What is Lorem Ipsum Lorem Ipsum is simply dummy text of the
                printing and typesetting industry Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s when an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book it has?
              </div>
            </div>
            <ul className="circles">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div className="w-2/5 bg-white p-8 sm:w-auto sm:rounded-lg md:flex md:h-full md:flex-col md:items-center  md:justify-center md:rounded-none md:p-10 lg:p-14 xl:w-2/5">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
