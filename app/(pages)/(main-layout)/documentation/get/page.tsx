import GetDocumentation from "@/components/pages/- documentation/get";

const Page = () => {
  return (
    <>
      <GetDocumentation />
    </>
  );
};
export default Page;

const x = {
  users: [
    {
      age: 22,
      name: "john",
      email: "john@example.com",
      comments: [1, 2],
      address: { country: "USA" },
    },
    {
      age: 30,
      name: "sara",
      email: "sara@example.com",
      comments: [3],
      address: { country: "UK" },
    },
  ],
  commnets: [
    { id: 1, content: "this is a comment from sara" },
    { id: 2, content: "this is another comment from sara" },
    { id: 3, content: "this a comment from john" },
  ],
  prices: [30, 50, 6000, 80, 15.3, 12],
  sizes: ["sm", "md", "lg", "xl", "2xl"],
  verification: false,
  hasColor: null,
};
