export const ErrorComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen px-3">
      <h1 className=" font-bold text-[20vh] text-gray-400">Oops</h1>
      <h2 className=" font-bold text-[6vh] text-gray-400 text-center">Something went wrong!</h2>
      <h2 className=" font-bold text-[4vh] text-gray-400 text-center mt-4">
        Try reloading the page. If the error persists, contact the system administrator.
      </h2>
    </div>
  );
};

export default ErrorComponent;
