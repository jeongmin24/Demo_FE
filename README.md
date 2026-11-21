# 응답 확인

## 프론트엔드 실행

Node.js 22.12 이상이 필요하다. PowerShell에서 이 README가 있는 `frontend` 폴더로 이동한 뒤 아래 명령을 실행한다.

```powershell
npm.cmd ci
npm.cmd run dev -- --host 127.0.0.1 --strictPort
```

터미널에 `Local` 주소가 표시되면 [http://127.0.0.1:5173](http://127.0.0.1:5173)을 연다. `5173` 포트를 다른 프로세스가 사용 중이면 개발 서버가 시작되지 않는다.

## 백엔드 연결

### 같은 PC에서 실행

Vite는 기본적으로 버튼의 `GET /api/response-check` 요청을 `http://127.0.0.1:8080`으로 전달한다. 별도 PowerShell에서 `backend` 폴더로 이동해 `.\gradlew.bat bootRun`을 실행한다. 프론트 화면에서 **응답 확인하기**를 누르면 `200 / OK`가 표시된다.

### 다른 PC의 백엔드에 연결

프론트엔드 폴더에서 `.env.local`이 없으면 아래 명령으로 만든다. 이미 있으면 기존 파일을 편집한다.

```powershell
Copy-Item .env.example .env.local
```

`.env.local`의 값을 백엔드가 실행 중인 PC의 IP와 포트로 바꾼다.

```dotenv
API_PROXY_TARGET=http://192.168.0.10:8080
```

`API_PROXY_TARGET`에는 서버 주소만 입력한다. Vite가 `/api/response-check` 경로를 포함해 전달한다. 설정을 바꾼 뒤 프론트 개발 서버를 다시 시작한다.

브라우저에서 API를 직접 호출하려면 `VITE_RESPONSE_CHECK_URL`에 전체 API 주소를 설정한다. 프론트와 API의 출처가 다르면 백엔드가 프론트 출처를 CORS로 허용해야 한다.

## 디자인 출처

Shreyash Barot의 [Kreed – 20 Hero Headers Template](https://www.figma.com/community/file/975681310612027225/kreed-20-hero-headers-template) 중 Hero 10을 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)에 따라 참고했다. 웹 화면에서 헤더와 스마트폰 목업을 생략하고, 한글 문구와 API 응답 상태를 추가했다.
