import { notFound } from "next/navigation";

export default  function Page(){

  throw new Error('일부로 에러를 발생시켜봅니다.');
  return <div>hello world</div>
}