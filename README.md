# frontend · 포스트잇 투두

React와 TypeScript로 만든 다크모드 시연 스켈레톤입니다. 서버에서 받은 목록을 포스트잇으로 표시합니다. 입력과 편집 컴포넌트는 쓰기 API를 구현하는 단계에서 추가합니다.

Node.js 22.12 이상을 기준으로 합니다. Spring Boot 서버가 8080 포트에서 실행 중일 때 다음 명령으로 웹을 엽니다.

```sh
npm ci
npm run dev
```

기본 주소는 `http://localhost:5173`입니다. Vite가 `/api` 요청을 8080 포트로 전달합니다. `npm run build`로 타입 검사와 프로덕션 빌드를 실행합니다.

화면 진입점은 `src/pages/TodoPage/`, 화면 조각은 `src/features/todos/components/`, 테마는 `src/app/styles/theme.css`입니다. DevLink는 `TodoPage → useTodos → listTodos → apiClient.get('/api/todos')` 호출을 기준으로 API 연결을 분석합니다. 대시보드에서 이 저장소를 FE로 등록하고 연결할 BE 저장소를 지정합니다.
