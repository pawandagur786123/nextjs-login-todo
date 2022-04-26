import Head from "next/head";
import dynamic from "next/dynamic";

const Home = dynamic(() => import("../components/Home"), {
  ssr: false
});


const Index = () => (
  <div>
    <Head>
      <title>Sign in</title>
      <meta name="description" content="Sign in to use todo app." />
    </Head>
    <Home />
  </div>
);

export default Index;
