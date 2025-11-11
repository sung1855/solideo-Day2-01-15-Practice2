import { create } from 'zustand';
import { TripInfo, Route, ItineraryItem, SortType } from '../types';
import { mockRoutes } from '../data/mockData';
import { getCityCoordinates, calculateDistance } from '../services/geocoding';

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
  searchRoutes: (tripInfo: TripInfo) => Promise<void>;
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
  searchRoutes: async (tripInfo) => {
    set({ tripInfo });

    // 입력된 출발지와 도착지를 기반으로 경로 생성
    const generateRoutes = async () => {
      const { departure, destination, departureDate, duration, travelers } = tripInfo;

      // 출발지와 도착지의 실제 좌표 가져오기
      const [departureCoords, arrivalCoords] = await Promise.all([
        getCityCoordinates(departure),
        getCityCoordinates(destination),
      ]);

      // 실제 거리 계산
      const actualDistance = calculateDistance(departureCoords, arrivalCoords);

      // 기본 경로 템플릿들
      const transportTypes = [
        { type: 'train', operators: ['KTX', 'SRT', '무궁화호'], speed: 120, priceMultiplier: 1.2 },
        { type: 'airplane', operators: ['대한항공', '아시아나항공', '제주항공', '진에어'], speed: 600, priceMultiplier: 2.5 },
        { type: 'bus', operators: ['고속버스', '우등고속', '시외버스'], speed: 80, priceMultiplier: 0.7 },
      ];

      const generatedRoutes: Route[] = [];
      let routeId = 1;

      // 각 교통수단별로 2-3개의 경로 생성
      transportTypes.forEach((transport) => {
        const numRoutes = transport.type === 'airplane' ? 3 : 2;

        for (let i = 0; i < numRoutes; i++) {
          const operator = transport.operators[i % transport.operators.length];
          const baseTime = 9 + (i * 3); // 09:00, 12:00, 15:00...
          const departureTime = `${baseTime.toString().padStart(2, '0')}:00`;

          // 실제 거리 기반 소요 시간 계산
          const durationMinutes = Math.round((actualDistance / transport.speed) * 60);
          const arrivalHour = baseTime + Math.floor(durationMinutes / 60);
          const arrivalMinute = durationMinutes % 60;
          const arrivalTime = `${(arrivalHour % 24).toString().padStart(2, '0')}:${arrivalMinute.toString().padStart(2, '0')}`;

          // 실제 거리 기반 가격 계산
          const basePrice = Math.round(actualDistance * transport.priceMultiplier * 100);
          const priceVariation = Math.round((Math.random() - 0.5) * basePrice * 0.3);
          const price = Math.max(basePrice + priceVariation, 10000); // 최소 10,000원

          const route: Route = {
            id: routeId.toString(),
            transportType: transport.type as 'train' | 'bus' | 'airplane',
            operator,
            vehicleNumber: `${transport.type.toUpperCase().slice(0, 3)}-${100 + routeId}`,
            departure: {
              location: departure,
              time: departureTime,
              coordinates: departureCoords,
            },
            arrival: {
              location: destination,
              time: arrivalTime,
              coordinates: arrivalCoords,
            },
            duration: durationMinutes,
            price,
            transfers: 0,
            seatsAvailable: Math.floor(Math.random() * 50) + 5,
            rating: 4.0 + Math.random() * 0.9,
            badges: price < basePrice * 0.85 ? ['특가'] : undefined,
          };

          generatedRoutes.push(route);
          routeId++;
        }
      });

      return generatedRoutes;
    };

    // 생성된 경로 설정
    const routes = await generateRoutes();
    set({ routes });
  },
}));
