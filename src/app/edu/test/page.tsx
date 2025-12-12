import { delay } from "src/shared/utils/delay";

export default async function TestPage() {

  await delay(5000)
  return <div>hello Test Page</div>;
}
