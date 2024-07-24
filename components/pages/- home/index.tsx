import Content from "./content";
import Lines from "./lines";

const Home = () => {
  return (
    <>
      <div className="w-full relative h-screen  px-12 overflow-hidden">
        <Lines />
        <Content />
      </div>
    </>
  );
};
export default Home;
