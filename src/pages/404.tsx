import Head from 'next/head';

export default function NoContent() {
  return (
    <>
      <Head>
        <title>Rauhut24 - 404 Not Found</title>
        <meta name="description" content="No content" />
        <meta name="keywords" content="no content" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full">
        <h1 className=" font-bold text-[25vh] text-gray-400">404</h1>
        <h2 className=" font-bold text-[6vh] text-gray-400 text-center">There is nothing here</h2>
      </main>
    </>
  );
}
