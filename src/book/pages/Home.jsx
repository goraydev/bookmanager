import { Layout } from "../components/Layout";

export const Home = () => {
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center">
        <h1 className="text-4xl text-center font-semibold">
          Bienvenido al sistema (dev)
        </h1>
        <picture className="animation">
          <lottie-player
            src="https://lottie.host/b85e73da-3129-4999-9b7c-d11e5b2d718d/44cOsBGpxi.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </picture>
      </div>
    </Layout>
  );
};
