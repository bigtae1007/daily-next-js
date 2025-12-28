
# 개요
next.js 학습을 위한 repo로 배포 및 여러 프로젝트에 집합

---

## 라우팅 파일 

### page
페이지를 보여주는 UI<br/>

fetch + UI컴포넌트 호출 정도만 정의<br/>
&nbsp;  여러 컴포넌트 또는 복잡한 UI보다는 layout 전역 스타일 정도만 정의하는 것이 좋음

### not-found 
경로가 존재하지 않는 페이지에 진입 했을 때 보이는 UI 입니다.<br> 
주소에 정의된 페이지가 없을 경우 `app/not-found.tsx`가 보입니다.<br>
예시로 `...tobby.com/edu/A` 경로가 없다면 `edu/not-found.tsx`가 보일 것 같지만 경로 매칭 자체가 안된것이기 때문에 `app/not-found.tsx`가 렌더링 됩니다. 
<br>
그렇다면 언제 `edu/not-found.tsx`가 필요할까? 바로 내부 페이지에서 `NotFound()` 함수를 통해 이동시킬 때 필요합니다. 
<br>
보통 [slug] 이런 중개 라우트를 두고 적절한 주소가 아닐 경우 사용하는 것으로 생각됩니다. 



### layout
레이아웃 정의 파일.<br/>

page.tsx가 내부 children으로 들어온다 .<br/>

첫 렌더링 이후에는 초기화 안됨 <br/>
&nbsp; 즉. use client에 경우 useEffect를 사용하면 clean up이 실행되지 않음<br/>
&nbsp; 내부 페이지 이동 시 계속 유지되는 컴포넌트

**복수의 layout이 존재할 경우 경로에 있는 모든 layout이 중첩됨**
```js
// app/layout.tsx & app/edu/layout.tsx 2개가 존재한다면 중첩이 된다. 
// https://{...}/edu 페이지는 아래과 같은 코드 구조를 같음 
<AppLayout>
    <EduLayout>
        {/* edu/page.tsx */}
        {children} 
    </EduLayout>
</AppLayout>
```
### template
레이아웃과 유사함. 차이점은 페이지가 이동할 경우 template는 다시 만들어짐 <br/>
&nbsp; 즉 useEffect에 clean up이 이뤄짐 <br/>
&nbsp; 페이지 진입마다 애니메이션 실행 등 필요에 따라 사용할 때 필요 <br/>

세부적으로는 layout에 경우 페이지 이동 시 표현을 쉽게한다면 캐싱을 하여 새로 만들지 않음 <br>
따라서 unMount자체가 이뤄지지 않는 한편, template같은 경우 페이지 이동 시 항상 unMount를 시키는 방식

구조로는 layout 안에 들어감
```js
// app/layout.tsx & app/template.tsx 2개가 존재한다면 중첩이 된다. 
<Layout>
    <Template>
        {/* app/page.tsx */}
        {children} 
    </Template>
</Layout>
```

### error
처리 되지 않은 오류가 발생했을 때 보여지는 페이지입니다.<br>
단순히 서버 컴포넌트에 오류 뿐 아니라 런타임 오류 등 페이지에서 오류가 발생했을 경우 보여지는 페이지를 구성하고 있습니다.<br>
`page.tsx` 페이지 대신 렌더링 됨으로 layout, template 등에 코드는 유지 됩니다. 

내부 `error`파일이 없다면 상위 경로로 찾습니다. 
```
app/edu/test/page.tsx 페이지에서 오류가 발생했을 경우 아래 순서와 같이 상위 경로에 error.tsx가 있을 때 까지 찾아갑니다. 
당연히 없다면 next.js 기본 오류 페이지가 나타납니다. (global error가 있다면 global error 페이지가 보임)
1. app/edu/test/error.tsx를 찾고 있다면 렌더링 
2. 없을 경우 app/edu/error.tsx를 찾고 있다면 렌더링
3. 없을 경우 app/error.tsx를 찾고 있다면 렌더링
```

### global-error
전역 오류 상황에서 보여지는 오류 UI입니다.<br>
경로 내부에 error.tsx가 있다면 보이지 않습니다. <br>
내부 error.tsx로 분기 치지 않았다면 보이는 화면입니다. <br>

**`error`와 크게 다른점은** HTML 전체를 작성해야한다는 점입니다. 
error.tsx에 경우 page.tsx 대신 렌더링 됨으로 기본 스타일, layout이 화면에 보이고 적용되어있지만<br> 
`global-error`에 경우 root html 단에서 오류를 발생시킴으로 html 태그부터 전체 작성이 필요합니다.<br>
(*head에 title부터 모든게 다 필요*)

### loading
첫 페이지 로딩 시 보여지는 UI입니다. 
<br>
서버 fetch가 없는 경우 딜레이 시간이 적기 때문에 대부분에 상황에서는 보이지 않습니다.
<br>
**참고로 이 로딩은 API 로딩과는 다름니다.** 또한 클라이언트 컴포넌트에 로딩 상태와는 무관하며 <br>서버에서 만든 HTML이 도달하여 화면에 보여지기 전까지 로딩 컴포넌트입니다.
<br>

### default
병렬 라우트 대체 페이지 UI 
<br>
설명이 어렵고 크게 중요할 것 같지는 않아 대략적으로 작성하겠습니다.
<br>
next.js에서는 `slot` 개념이 있습니다. layout에서 사용할 수 있도록 page.tsx를 분리하는 것입니다. 
<br>
```tsx
/*
* 폴더 경로입니다. 
app/
  dashboard/
    layout.tsx
    page.tsx
    @list/
      page.tsx
    @detail/
      page.tsx
* */

// app/dashboard/layout.tsx
export default function Layout({
  children,
  list,
  detail,
}: {
  children: React.ReactNode;
  list: React.ReactNode;
  detail: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <aside>{list}</aside>
      <main>{children}</main>
      <section>{detail}</section>
    </div>
  );
}
```
위 코드와 같이 slot 기능이 있습니다.
<br>
위와 같은 경우 default.tsx는 필요없지만 다음과 같은 상황에서 필요합니다. 
```tsx
/* 경로가 다음과 같을 때
 @detail/
  default.tsx
  [id]/
    page.tsx*/
// https:..../dashboard/123 -> page.tsx가 detail 슬롯에 들어감
// https:..../dashboard -> default.tsx가 detail 슬롯에 들어감
```
상세 페이지를 보여줄 때 id값이 있어야 detail 슬롯을 보여줄 수 있으나, 만일 뒤 주소에 id가 없다면 default.tsx가 대신 슬롯에 들어가는 의미입니다. 
<br>
참고할 점은 default.tsx대신 page.tsx를 사용해도 기능적으로는 문제가 없으나, 의미적으로 page.tsx를 사용한다는건 해당 route에서 슬롯이 있다고 정의되는 것이기 때문에 default.tsx 사용을 권장합니다.

### route
API 엔드포인트(서버 함수)를 만드는 파일
<br>
```ts
// 각 매서드를 정의해 사용 
export async function GET() {}
export async function POST() {}
export async function PUT() {}
export async function DELETE() {}
```
<br>
직접 DB 접근도 가능하지만, 호스팅 주소가 다른 서버에 요청하는 것도 해당 부분에서 사용 가능
<br>
사용하는 컴포넌트 내에서도 가능하지만 next.js route로 묶었을 때 관리하기 용이하여 많이 사용하며,<br>
클라이언트 컴포넌트에 경우 CORS 또는 보안에 문제가 발생할 수 있기 때문에 공통적으로 요청 관련 코드는 서버 코드로 만들어 보안적인 강점을 가져갑니다.

## 동적 라우팅  && 평행 경로
기본적으로 경로는 폴더 구조에 맞게 적용됩니다. 하지만 몇몇 특이한 조건 및 경로 방법이 있습니다. 
- 해당 폴더 내에 Page가 있어야합니다.
```angular2html
/edu/test라는 주소 로접근을 했을 때
test 폴더 내에 page.tsx가 있다면 layout까지 포함한 UI가 화면에 보여지지만 
page.tsx가 없다면 layout도 무시되고 404 주소를 찾을 수 없습니다.

하지만 경로 마지막 폴더 내에 page.tsx가 있다면 중간 경로에 page.tsx가 없더라도 layout은 렌더링 할 수 있습니다. 
/edu/test/not-have-page/have-page
이런 주소가 있다면 have-page 폴더 내에 page.tsx가 있다면 중간 경로에 page.tsx가 없더라도 렌더링이 가능합니다.
```

### 동적 라우트 세그먼트 
사용 방법 : [folder]
<br>
매개변수를 받을 수 있습니다.
<br>
```aiignore
# 경로 https://...../edu/[folder]
매개변수 params에 folder에 대한 값이 들어옵니다.

https://.../edu/test로 접근 시  
params = {folder: 'test'}
```
### Catch-all 세그먼트
사용 방법 : [...folder]
<br>
매개변수를 list 형태로 받습니다.
<br>
```aiignore
# 경로 https://...../edu/[...folder]
매개변수 params에 folder에 대한 값이 리스트 형태로 들어옵니다.

https://.../edu/test로 접근 시  
params = {folder: ['test']}
https://.../edu/test/A로 접근 시  
params = {folder: ['test','A']}
https://.../edu/test/A/B로 접근 시  
params = {folder: ['test','A','B']}
```
### 선택적 Catch-all 세그먼트
사용 방법 : [[...folder]]
<br>
매개변수를 list 형태로 받습니다.
위까지는 Catch-all 세그먼트와 동일하나 다른점은 뒤 경로가 없어도 경로가 일치된다는 점입니다.
<br>
```aiignore
# 경로 https://...../edu/[...folder]
매개변수 params에 folder에 대한 값이 리스트 형태로 들어옵니다.

https://.../edu/test로 접근 시  
params = {folder: ['test']}
https://.../edu/test/A로 접근 시  
params = {folder: ['test','A']}

https://.../edu로 접근 시  
params = {folder: undefined} 
# Catch-all 세그먼트에 경우 edu/[...folder]/page.tsx가 보여지지 않습니다.
# edu/page.tsx가 렌더링 됨 
# 하지만 선택적 세그먼트에서는 edu/[[...folder]]/page.tsx가 렌더링 됩니다.
```

## 