# TripMate - 여행 플래너 모바일 앱

20-30대 자유여행자를 위한 올인원 여행 계획 및 관리 앱입니다.

## 주요 기능

### 1. 여행 계획 입력
- 출발지/도착지 입력
- 출발 날짜 선택
- 여행 기간 및 인원 설정
- 여행 정보 검색

### 2. 교통 경로 검색 및 비교
- 다양한 교통수단 경로 표시 (비행기, 기차, 버스 등)
- 4가지 정렬 옵션
  - 최저가순
  - 최단시간순
  - 최소환승순
  - 추천순
- 상세 경로 정보 (가격, 소요시간, 평점 등)

### 3. 지도 기반 경로 시각화
- Google Maps 연동
- 출발지/도착지 마커 표시
- 경로선 표시
- 선택된 경로 상세 정보

### 4. Day별 일정 관리
- 날짜별 타임라인 형태 일정 표시
- 활동 타입별 아이콘 및 색상
- 일정 추가 기능

### 5. 개인화 추천
- 4가지 카테고리별 추천
  - 여행지
  - 맛집
  - 숙소
  - 액티비티
- 평점, 리뷰, 가격대 정보
- 태그 기반 필터링

### 6. 프로필 및 설정
- 사용자 프로필
- 여행 통계
- 설정 메뉴

## 기술 스택

- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **Navigation**: React Navigation (Bottom Tabs + Stack)
- **State Management**: Zustand
- **Maps**: React Native Maps
- **Icons**: Expo Vector Icons

## 프로젝트 구조

```
TripMate/
├── App.tsx                 # 앱 진입점
├── src/
│   ├── screens/            # 화면 컴포넌트
│   │   ├── HomeScreen.tsx
│   │   ├── SearchResultScreen.tsx
│   │   ├── MapScreen.tsx
│   │   ├── ItineraryScreen.tsx
│   │   ├── RecommendationScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── components/         # 재사용 컴포넌트
│   │   └── RouteCard.tsx
│   ├── navigation/         # 네비게이션 설정
│   │   └── AppNavigator.tsx
│   ├── store/             # 상태 관리
│   │   └── tripStore.ts
│   ├── data/              # Mock 데이터
│   │   └── mockData.ts
│   ├── types/             # TypeScript 타입
│   │   └── index.ts
│   └── utils/             # 유틸리티 함수
├── assets/                 # 이미지 및 리소스
└── package.json
```

## 설치 및 실행

### 필수 요구사항
- Node.js (v16 이상)
- npm 또는 yarn
- Expo CLI
- iOS Simulator (Mac) 또는 Android Emulator

### 설치

```bash
# 의존성 설치
npm install

# 또는
yarn install
```

### 실행

```bash
# 개발 서버 시작
npm start

# 또는
npx expo start
```

### 플랫폼별 실행

```bash
# iOS (Mac 전용)
npm run ios

# Android
npm run android

# 웹
npm run web
```

## 사용 방법

### 1. 여행 검색
1. 홈 화면에서 출발지와 도착지 입력
2. 출발 날짜, 여행 기간, 인원 설정
3. '여행 검색' 버튼 클릭

### 2. 경로 선택
1. 검색 결과 화면에서 정렬 기준 선택
2. 원하는 경로 카드 클릭
3. 자동으로 일정 탭으로 이동

### 3. 지도 확인
1. 하단 탭에서 '지도' 선택
2. 선택된 경로의 출발지/도착지 확인
3. 지도 확대/축소 및 이동

### 4. 일정 관리
1. 일정 탭에서 Day 선택
2. 타임라인 형태로 일정 확인
3. '+' 버튼으로 일정 추가 (향후 구현)

### 5. 추천 확인
1. 추천 탭 선택
2. 카테고리 선택 (여행지/맛집/숙소/액티비티)
3. 추천 항목 확인

## Mock 데이터

앱은 현재 Mock 데이터를 사용합니다:
- 8개의 교통 경로 (서울-부산, 인천-오사카 등)
- 25개의 추천 항목 (카테고리별 5개씩)

실제 API 연동은 향후 업데이트 예정입니다.

## 주요 기능 완성도

- ✅ 홈 화면 (여행 정보 입력)
- ✅ 검색 결과 화면 (정렬 기능)
- ✅ 지도 화면 (마커 및 경로선)
- ✅ 일정 타임라인 화면
- ✅ 추천 화면 (카테고리별 탭)
- ✅ 프로필 화면
- ✅ 하단 탭 네비게이션
- ✅ 상태 관리 (Zustand)
- ✅ TypeScript 타입 정의
- ✅ Mock 데이터

## 향후 개선 사항

- [ ] 실제 API 연동
- [ ] 일정 추가/수정/삭제 기능
- [ ] 최근 검색 기록 저장
- [ ] 즐겨찾기 기능
- [ ] 사용자 인증
- [ ] 일정 드래그 앤 드롭
- [ ] 날짜 선택 캘린더
- [ ] 추천 상세 화면
- [ ] 알림 기능

## 라이선스

MIT

## 문의

문제가 발생하거나 제안 사항이 있으시면 이슈를 생성해주세요.

---

**TripMate** - 당신의 완벽한 여행을 계획하세요! ✈️🗺️
