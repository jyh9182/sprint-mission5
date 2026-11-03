# 레슨커넥트AI 랜딩페이지 — Claude Code 작업 지침

먼저 `AGENTS.md`를 읽는다. 이 폴더는 이미 구현된 Next.js 프로젝트이므로 새 프로젝트를 만들거나 다른 프레임워크로 교체하지 않는다.

## 디자인 원본

- 파일: https://www.figma.com/design/RyxzsASpQMGHSrEaHfWGgJ
- 편집 가능한 Desktop: https://www.figma.com/design/RyxzsASpQMGHSrEaHfWGgJ?node-id=2-44
- 편집 가능한 Mobile: https://www.figma.com/design/RyxzsASpQMGHSrEaHfWGgJ?node-id=2-45
- Components & Behavior: https://www.figma.com/design/RyxzsASpQMGHSrEaHfWGgJ?node-id=2-46
- 같은 파일의 실행 코드 레이어: https://www.figma.com/design/RyxzsASpQMGHSrEaHfWGgJ?node-id=16-154

Desktop 1440px, Mobile 390px은 긴 랜딩페이지 시안이다. 앱 화면의 390×844 제한을 랜딩페이지 전체 높이에 적용하지 않는다. 기존 모바일 앱 파일의 01~12 화면은 변경하지 않는다.

## 유지할 내용과 스타일

헤더 → 히어로 → 기능 카드 3개 → 이용 방법 3단계 → CTA → 푸터 순서다. 화이트 배경, 다크 버튼, Noto Sans KR, 민트 추천 배지, 피치 CTA, 따뜻한 음악 사진을 유지한다. 전체 화면을 PNG로 대체하지 않는다. `public/assets`의 사진과 `assets.manifest.json`을 참고한다.

현재 서비스는 데모다. 체험 버튼은 악기 선택 창을 열고, FAQ는 설명 창을 열며, 메뉴는 해당 섹션으로 이동한다. 실제 AI·예약·결제·문자·개인정보 수집은 연결하지 않는다. 허위 후기, 실제 예약번호, 운영 실적을 추가하지 않는다.

## 프로젝트 구조

- `app/page.tsx`: 랜딩페이지 섹션, 체험/FAQ 창, 모바일 메뉴
- `app/globals.css`: 디자인 토큰, 반응형 레이아웃, 접근성 스타일
- `components/ui/button.tsx`: shadcn/ui 방식의 재사용 Button
- `app/layout.tsx`: 한국어 문서, 로컬 글꼴, 메타데이터
- `next.config.ts`: 정적 export. production build 결과는 `out/`
- `.figma/make/`: Figma 실행·배포 설정. 배포 명령은 사용자 승인 전 실행하지 않는다.
- `tests/landing.spec.ts`: 화면 너비 320/390/768/1440과 메뉴·FAQ·체험 흐름 검사

## 실행과 검증

1. Node.js와 npm을 확인한다. 개발 환경에서는 Node 24를 사용했다.
2. `npm ci`
3. `npm run dev` → 터미널에 표시되는 `http://localhost:3000` 주소에서 확인. 개발 모드에서 임의의 IP 주소로 바꾸면 Next.js의 개발 서버 연결이 차단될 수 있다.
4. `npm run build`, `npm run typecheck`
5. 브라우저 검사: `PLAYWRIGHT_BROWSERS_PATH=.cache/ms-playwright npx playwright install chromium --only-shell` 후, 별도 터미널에서 `npm run dev -- --port 3100`을 실행하고 `PLAYWRIGHT_BROWSERS_PATH=.cache/ms-playwright npm test`. 기본 검사 주소는 `http://localhost:3100`이다. 다른 주소는 `LANDING_TEST_URL` 환경 변수로 지정한다.

메뉴/CTA/FAQ, 선택 전 비활성/선택 후 활성, Escape 닫기와 포커스 복귀, 마지막 CTA, 가로 넘침, 이미지와 대체 텍스트, 콘솔 오류를 확인한다. 디자인과 실제 동작 검증을 구분해서 보고한다.

## 작업 방식

현재 구현을 실행하고 Figma의 Desktop/Mobile을 실제로 읽은 뒤 차이가 큰 부분부터 보정한다. 변경 범위를 작게 유지한다. Figma MCP 연결은 사용하는 Claude Code 환경에서 별도로 인증해야 하며 이 폴더에는 토큰이나 계정 정보가 없다. 연결되지 않으면 접근했다고 주장하지 않는다.

Figma의 코드와 이 로컬 폴더는 자동 동기화되지 않는다. 한쪽을 수정한 뒤 다른 쪽이 바뀌었다고 가정하지 않는다. 결과를 검증한 뒤 반영 경로를 명시한다.

## Figma 미리보기 유지보수

`.figma/make/dev`는 현재 코드 레이어의 정확한 미리보기 호스트를 `LESSONCONNECT_FIGMA_PREVIEW_HOST`로 전달한다. `next.config.ts`는 이 호스트만 추가 허용한다. 일반 로컬 실행에는 이 환경 변수가 필요 없다. Figma가 미리보기 주소를 바꾸면 실제 표시되는 새 호스트를 확인한 후 갱신한다. 와일드카드 전체 허용이나 보안 검사 비활성화로 대체하지 않는다.

`.figma/make/install`은 중단된 설치 파일 때문에 발생한 ENOTEMPTY 오류를 방지하기 위해 기존 `node_modules`를 임시 폴더로 옮긴 후 `npm ci`를 실행한다. 프로젝트 소스는 삭제하지 않는다.

재사용 Button과 FAQ 버튼은 클라이언트 초기화가 완료된 뒤 활성화된다. Figma의 첫 로딩이 느릴 때 클릭이 사라지던 문제를 해결한 동작이므로 유지한다. 실제 사용자 기능과 상태가 준비되기 전에 버튼만 활성화하지 않는다.

## VS Code에서 이어가기

`lessonconnect-landing.code-workspace`를 VS Code의 파일 → 파일에서 작업 영역 열기로 연다. 권장 확장에 포함된 Anthropic의 공식 Claude Code를 설치하고 본인 계정으로 로그인한다. 처음에는 현재 프로젝트를 실행·검수하는 작업부터 시작한다. 재설계, 프레임워크 교체, 새로운 서비스 연동은 별도 요청이 있을 때 진행한다.

공식 설치 안내: https://code.claude.com/docs/en/vs-code
