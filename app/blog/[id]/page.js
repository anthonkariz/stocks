import Link from "next/link";
export default function Blog({ params }) {
  let id = params.id;
  return <h1>Blog {id}</h1>;
}
