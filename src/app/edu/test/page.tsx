import TestUi from "src/features/edu/test";

export const dynamic = "force-static"
export default async function TestPage() {
  const resonse = await fetch("http://localhost:8080/edu", {
    // next: { tags: ["test"], revalidate: 10 },
    cache :'force-cache'
  });
  const data = await resonse.json();
  console.log(data);

  return (
    <div>
      <div>hello Test Page</div>
      <TestUi />
    </div>
  );
}

//1766901475934
//1766901491254
//1766901545864