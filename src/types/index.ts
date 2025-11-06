// 교통수단 타입
export type TransportType = 'airplane' | 'train' | 'bus' | 'car' | 'ferry';

// 교통 경로 정보
export interface Route {
  id: string;
  transportType: TransportType;
  operator: string; // 운영사/항공사
  vehicleNumber: string; // 편명/차량번호
  departure: {
    location: string;
    time: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  arrival: {
    location: string;
    time: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  duration: number; // 소요 시간 (분)
  price: number; // 가격
  transfers: number; // 환승 횟수
  seatsAvailable?: number; // 잔여 좌석
  rating: number; // 평점 (0-5)
  badges?: string[]; // 특별 표시 (할인, 취소표 등)
}

// 정렬 기준
export type SortType = 'price' | 'duration' | 'transfers' | 'recommended';

// 여행 정보
export interface TripInfo {
  departure: string;
  destination: string;
  departureDate: Date;
  duration: number; // 여행 기간 (일)
  travelers: number; // 여행 인원
}

// 활동 타입
export type ActivityType = 'transport' | 'sightseeing' | 'food' | 'accommodation' | 'activity';

// 일정 아이템
export interface ItineraryItem {
  id: string;
  day: number;
  time: string;
  title: string;
  location: string;
  duration: number; // 소요 시간 (분)
  cost?: number; // 비용
  type: ActivityType;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

// 추천 카테고리
export type RecommendationCategory = 'destination' | 'restaurant' | 'accommodation' | 'activity';

// 추천 아이템
export interface Recommendation {
  id: string;
  category: RecommendationCategory;
  name: string;
  description: string;
  image: string; // 이미지 URL (로컬 경로 또는 URL)
  rating: number; // 평점 (0-5)
  reviewCount: number; // 리뷰 개수
  priceLevel: number; // 가격대 (1-4, $-$$$$)
  tags: string[]; // 태그
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

// 네비게이션 파라미터 타입
export type RootStackParamList = {
  Home: undefined;
  SearchResult: {
    tripInfo: TripInfo;
  };
};

export type TabParamList = {
  Home: undefined;
  Map: undefined;
  Itinerary: undefined;
  Recommendations: undefined;
  Profile: undefined;
};
