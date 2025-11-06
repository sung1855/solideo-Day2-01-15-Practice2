import { create } from 'zustand';
import { TripInfo, Route, ItineraryItem, SortType } from '../types';
import { mockRoutes } from '../data/mockData';

interface TripState {
  // 여행 정보
  tripInfo: TripInfo | null;
  setTripInfo: (info: TripInfo) => void;

  // 검색된 경로들
  routes: Route[];
  setRoutes: (routes: Route[]) => void;

  // 선택된 경로
  selectedRoute: Route | null;
  setSelectedRoute: (route: Route) => void;

  // 정렬 타입
  sortType: SortType;
  setSortType: (type: SortType) => void;

  // 정렬된 경로 가져오기
  getSortedRoutes: () => Route[];

  // 일정 아이템들
  itineraryItems: ItineraryItem[];
  addItineraryItem: (item: ItineraryItem) => void;
  removeItineraryItem: (id: string) => void;
  getItineraryByDay: (day: number) => ItineraryItem[];

  // 경로 검색 (Mock)
  searchRoutes: (tripInfo: TripInfo) => void;
}

export const useTripStore = create<TripState>((set, get) => ({
  // 초기 상태
  tripInfo: null,
  routes: [],
  selectedRoute: null,
  sortType: 'recommended',
  itineraryItems: [],

  // 여행 정보 설정
  setTripInfo: (info) => set({ tripInfo: info }),

  // 경로 설정
  setRoutes: (routes) => set({ routes }),

  // 선택된 경로 설정
  setSelectedRoute: (route) => set({ selectedRoute: route }),

  // 정렬 타입 설정
  setSortType: (type) => set({ sortType: type }),

  // 정렬된 경로 가져오기
  getSortedRoutes: () => {
    const { routes, sortType } = get();
    const sortedRoutes = [...routes];

    switch (sortType) {
      case 'price':
        return sortedRoutes.sort((a, b) => a.price - b.price);
      case 'duration':
        return sortedRoutes.sort((a, b) => a.duration - b.duration);
      case 'transfers':
        return sortedRoutes.sort((a, b) => a.transfers - b.transfers);
      case 'recommended':
      default:
        // 추천순: 평점과 가격의 조합
        return sortedRoutes.sort((a, b) => {
          const scoreA = a.rating * 1000 - a.price / 100;
          const scoreB = b.rating * 1000 - b.price / 100;
          return scoreB - scoreA;
        });
    }
  },

  // 일정 아이템 추가
  addItineraryItem: (item) =>
    set((state) => ({
      itineraryItems: [...state.itineraryItems, item],
    })),

  // 일정 아이템 제거
  removeItineraryItem: (id) =>
    set((state) => ({
      itineraryItems: state.itineraryItems.filter((item) => item.id !== id),
    })),

  // 특정 날짜의 일정 가져오기
  getItineraryByDay: (day) => {
    const { itineraryItems } = get();
    return itineraryItems
      .filter((item) => item.day === day)
      .sort((a, b) => {
        // 시간순으로 정렬
        const timeA = parseInt(a.time.replace(':', ''));
        const timeB = parseInt(b.time.replace(':', ''));
        return timeA - timeB;
      });
  },

  // Mock 경로 검색
  searchRoutes: (tripInfo) => {
    set({ tripInfo });
    // 실제로는 API를 호출하지만, 여기서는 Mock 데이터 사용
    set({ routes: mockRoutes });
  },
}));
