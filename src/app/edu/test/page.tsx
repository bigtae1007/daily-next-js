import TestUi from "src/features/edu/test";
import { delay } from "src/shared/utils/delay";

export default async function TestPage() {
  await delay(2000)
  return (
    <div>
      <div>hello Test Page</div>
      <TestUi />
    </div>
  );
}
