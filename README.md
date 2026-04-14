# api-first-demo-frontend

Todo API의 React + TypeScript 프론트엔드입니다.  
API 스펙은 [api-first-demo-spec](https://github.com/minishtech-bh/api-first-demo-spec) 레포에서 관리됩니다.

---

## 동작 원리

이 레포는 `openapi.yaml`을 직접 수정하지 않습니다.  
대신 스펙에서 훅과 타입을 **자동생성**하고, 그것을 컴포넌트에서 사용합니다.

```
open-api/openapi.yaml (submodule)
        │
        └── npx orval
                └── orval (react-query + axios)
                        ├── src/api/generated/todo/todo.ts     ← React Query 훅 (자동생성, 수정 금지)
                        │       useGetTodos()
                        │       useCreateTodo()
                        │       useUpdateTodo()
                        │       useDeleteTodo()
                        └── src/api/generated/model/
                                ├── todo.ts                    ← Todo 타입 (자동생성, 수정 금지)
                                ├── createTodoRequest.ts
                                └── updateTodoRequest.ts

src/components/TodoList.tsx ← 직접 작성. 생성된 훅을 import해서 사용.
```

스펙이 바뀌면 `npx orval` 재실행 후 컴포넌트에서 TypeScript 에러로 즉시 감지됩니다.  
`src/api/generated/`는 git에서 제외됩니다 — 빌드 시 항상 yaml에서 새로 생성합니다.

---

## 로컬 환경 세팅

> **Prerequisites:** Node 18+

```bash
git clone --recurse-submodules https://github.com/minishtech-bh/api-first-demo-frontend.git
cd api-first-demo-frontend
npm install
npx orval         # 훅/타입 생성
npm run dev       # http://localhost:5173
```

`--recurse-submodules` 없이 클론하면 `open-api/` 디렉토리가 비어있어 orval이 실패합니다.  
이미 클론했다면:

```bash
git submodule update --init
```

> 백엔드가 `http://localhost:8080`에 떠 있어야 API 호출이 동작합니다.

---

## 주요 명령어

```bash
# 훅/타입 재생성 (yaml 변경 후 항상 실행)
npx orval

# TypeScript 에러 확인
npx tsc --noEmit

# 개발 서버
npm run dev

# 빌드
npm run build
```

---

## 작업 흐름

### 일반 UI 작업

```
1. 스펙 변경이 없는 UI 작업이면 바로 개발
2. npm run dev → 브라우저에서 확인
3. PR 오픈
```

### 스펙이 변경되는 작업

```
1. api-first-demo-spec 레포에서 feature 브랜치 생성
   → openapi.yaml 수정 후 PR 오픈 (CI 통과 확인)

2. 이 레포에서 해당 브랜치로 submodule 전환
   cd open-api
   git fetch origin
   git checkout feature/브랜치명
   cd ..

3. npx orval → 새 훅/타입 확인
4. 컴포넌트에서 TypeScript 에러 수정 후 UI 구현
5. PR 오픈 (스펙 PR 링크 명시)

6. 스펙 PR merge 후 submodule main으로 복귀
   cd open-api && git checkout master && git pull
   cd .. && git add open-api
   git commit -m "chore: update api spec"
```

### submodule 업데이트 방법

```bash
# 최신 스펙으로 업데이트
cd open-api
git pull origin master
cd ..
git add open-api
git commit -m "chore: update api spec to latest"
```

---

## 환경변수

```bash
# .env.development (로컬)
VITE_API_URL=http://localhost:8080

# .env.production
VITE_API_URL=https://api.example.com
```

---

## 디렉토리 구조

```
.
├── open-api/                    ← submodule (api-first-demo-spec)
├── orval.config.ts              ← orval 설정 (input: open-api/openapi.yaml)
├── src/
│   ├── api/
│   │   └── generated/           ← 자동생성 (git 제외, orval로 생성)
│   │       ├── todo/todo.ts     ← React Query 훅
│   │       └── model/           ← TypeScript 타입
│   ├── components/
│   │   └── TodoList.tsx         ← 여기만 직접 작성
│   └── main.tsx                 ← QueryClientProvider 설정
└── package.json
