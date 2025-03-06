## 1. 파일 및 폴더 네이밍 컨벤션

### 파일명, 폴더명

- kebab-case / ex) `user-profile.tsx`

### 파일 안의 리액트 컴포넌트명

- PascalCase / ex) `UserProfile`

### 파일 안의 변수, 함수

- camelCase / ex) `userProfile`

### 파일 안의 상수

- SCREAM_SNAKE_CASE / ex) `USER_AUTH`

### 타입 정의

- 파일명 끝에 .types.ts / ex) `user.type.ts`

## 2. 관심사 분리

### entities

- 노션에서 Back-End/API 명세서의 도메인 카테고리 참고

### shared

- 재사용 가능한 공통 리소스 / ex) 공통 컴포넌트, 유틸리티 함수, 전역 스타일 등

### widgets

- 독립적인 UI 모듈 관리 / ex) `Header`, `Footer`

### **중요**

- `model` : api 호출, 데이터 가공
- `lib`: 비즈니스 로직
- `ui`: 인터페이스 -> ( shared 혹은 widgets에서 컴포넌트를 가져와서 조립 )

## 3. 공통 컴포넌트 관리

- `shared/components/` 에서 관리
  - `Button`, `Modal`, `Input` 등 범용적으로 사용되는 컴포넌트만 포함
- 컴포넌트는 반드시 독립적이어야 하며, 상태를 가지지 않도록 설계

```
shared/components/
├── button/
│   ├── button.tsx
│   ├── button.module.css
│   └── index.ts (option)
├── modal/
│   ├── modal.tsx
│   ├── modal.module.css
│   └── index.ts (option)
```

## 4. 공통 스타일 관리

- `shared/styles/` 에서 관리

```
shared/styles/
├── variables.css
├── mixins.css
├── reset.css
```

## 5. 타입 및 인터페이스

- global type은 shared에, local type은 각 폴더에
- 인터페이스의 경우 I 접두사 사용 / ex) `IUser`

## 폴더구조

```
src/
├── app/                # 애플리케이션 초기화 및 전역 설정
│   ├── providers/      # App-level providers (ex. Router, Context, etc..)
│   ├── routes/         # 라우트 정의 및 경로 관리
│   ├── styles/         # 전역 스타일 (index.css, theme 등)
│   ├── App.tsx         # 최상위 App 컴포넌트
│   └── index.tsx       # ReactDOM.render 또는 createRoot
├── entities/           # 도메인 엔티티
│   ├── user/           # 사용자 엔티티
│   │   ├── ui/         # 사용자와 관련된 UI 컴포넌트
│   │   ├── model/      # 사용자 상태 관리
│   │   ├── lib/        # 사용자 관련 로직
│   │   └── types.ts    # 사용자 타입 정의
│   ├── todo/           # Todo 엔티티
│   └── ...             # 기타 엔티티
├── pages/              # 페이지 단위 컴포넌트
│   ├── HomePage/       # 홈 페이지
│   │   ├── ui/         # 페이지의 UI 구성 요소
│   │   ├── model/      # 상태 관리 (필요한 경우)
│   │   └── index.ts    # import문 정리
│   ├── LoginPage/      # 로그인 페이지
│   └── ...             # 기타 페이지
├── shared/             # 재사용 가능한 전역 리소스
│   ├── api/            # API 정의
│   ├── components/     # 공용 컴포넌트 (Button, Modal 등)
│   ├── lib/            # 유틸리티 함수 및 외부 라이브러리 (Swiper 등)
│   ├── config/         # 환경 설정 및 상수
│   ├── types/          # 전역 타입 정의
│   ├── hooks/          # 공용 훅
|   ├── styles/         # 전역 스타일
│   └── assets/         # 전역 정적 파일 (이미지, SVG 등)
└── widgets/            # 특정 기능 위젯
    ├── header/         # 헤더 위젯
    ├── footer/         # 푸터 위젯
    └── ...             # 기타 위젯
```

### `app/`

- 프로젝트 초기화와 전역 설정
- `App.tsx`에 최상위 컴포넌트를 정의하고, `React Router` 등의 프로바이더를 설정

### `entities/`

- 도메인 모델 정의와 관련된 폴더
- 각 엔티티는 재사용 가능한 모델, UI, 상태 관리를 포함
- ex) user 엔티티는 사용자 정보를 다루며, profile이나 auth 기능에서 사용

### `pages/`

- 애플리케이션의 페이지 단위를 정의
- 각 페이지는 주로 라우트의 엔드포인트와 대응
- ex) `/home` -> `HomePage`, `/login` -> `LoginPage`

### `shared/`

- 모든 기능에서 사용할 수 있는 재사용 가능한 리소스
- ex) 공용 컴포넌트(Button, Modal), hooks, 환경 변수 설정 등

### `widgets/`

- 재사용 가능한 UI 모듈을 정의합
- 특정 페이지나 기능과 관련된, 상대적으로 독립적인 UI 구성 요소를 포함
- ex) Header, Footer, Sidebar

<br/>

> `shared/components` vs `widgets`

| **구분**      | **`widgets`**                              | **`shared`**                           |
| ------------- | ------------------------------------------ | -------------------------------------- |
| 목적          | 특정 기능과 로직 구현                      | 범용적이고 단순한 재사용 가능 컴포넌트 |
| 재사용성 범위 | 제한적 (특정 페이지/도메인에서 사용)       | 전체 프로젝트 전역에서 사용 가능       |
| 의존성        | 여러 `shared`, `entities`, `features` 의존 | 최소한의 의존성                        |
| 예시          | `Header`, `ProductCard`, `Footer`          | `Button`, `Input`, `Modal`             |

`shared`가 `widgets`보다 **더 작은 단위**의 UI

> `entities` vs `features`

둘의 구분이 모호한 지점이 발생됨에 따라 생기는 자원 소모를 우려해, `entities`만을 채택.
<br/>
이유는 `entities`가 `features`보다 low level의 목적을 가지고 있음. 이에 따라 추후에 `features`가 필요하게 된다면 추가 적용.
