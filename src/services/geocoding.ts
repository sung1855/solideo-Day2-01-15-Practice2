// 지오코딩 서비스 - 도시 이름을 좌표로 변환

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface CityInfo {
  coordinates: Coordinates;
  country: string;
  countryCode: string;
}

// Nominatim API를 사용한 지오코딩 (무료, 제한: 1초당 1요청)
export const geocodeCity = async (cityName: string): Promise<Coordinates | null> => {
  try {
    const encodedCity = encodeURIComponent(cityName);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodedCity}&format=json&limit=1`,
      {
        headers: {
          'User-Agent': 'TripMate Travel App'
        }
      }
    );

    const data = await response.json();

    if (data && data.length > 0) {
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon),
      };
    }

    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
};

// 도시별 상세 정보 (좌표 + 국가)
const cityDatabase: { [key: string]: CityInfo } = {
  // 한국 주요 도시
  '서울': { coordinates: { latitude: 37.5665, longitude: 126.9780 }, country: '대한민국', countryCode: 'KR' },
  '부산': { coordinates: { latitude: 35.1796, longitude: 129.0756 }, country: '대한민국', countryCode: 'KR' },
  '인천': { coordinates: { latitude: 37.4563, longitude: 126.7052 }, country: '대한민국', countryCode: 'KR' },
  '대구': { coordinates: { latitude: 35.8714, longitude: 128.6014 }, country: '대한민국', countryCode: 'KR' },
  '대전': { coordinates: { latitude: 36.3504, longitude: 127.3845 }, country: '대한민국', countryCode: 'KR' },
  '광주': { coordinates: { latitude: 35.1595, longitude: 126.8526 }, country: '대한민국', countryCode: 'KR' },
  '울산': { coordinates: { latitude: 35.5384, longitude: 129.3114 }, country: '대한민국', countryCode: 'KR' },
  '수원': { coordinates: { latitude: 37.2636, longitude: 127.0286 }, country: '대한민국', countryCode: 'KR' },
  '제주': { coordinates: { latitude: 33.4996, longitude: 126.5312 }, country: '대한민국', countryCode: 'KR' },
  '강릉': { coordinates: { latitude: 37.7519, longitude: 128.8761 }, country: '대한민국', countryCode: 'KR' },
  '경주': { coordinates: { latitude: 35.8562, longitude: 129.2247 }, country: '대한민국', countryCode: 'KR' },
  '전주': { coordinates: { latitude: 35.8242, longitude: 127.1480 }, country: '대한민국', countryCode: 'KR' },
  '청주': { coordinates: { latitude: 36.6424, longitude: 127.4890 }, country: '대한민국', countryCode: 'KR' },
  '춘천': { coordinates: { latitude: 37.8813, longitude: 127.7300 }, country: '대한민국', countryCode: 'KR' },
  '포항': { coordinates: { latitude: 36.0190, longitude: 129.3435 }, country: '대한민국', countryCode: 'KR' },

  // 일본 주요 도시
  '도쿄': { coordinates: { latitude: 35.6762, longitude: 139.6503 }, country: '일본', countryCode: 'JP' },
  '오사카': { coordinates: { latitude: 34.6937, longitude: 135.5023 }, country: '일본', countryCode: 'JP' },
  '교토': { coordinates: { latitude: 35.0116, longitude: 135.7681 }, country: '일본', countryCode: 'JP' },
  '후쿠오카': { coordinates: { latitude: 33.5904, longitude: 130.4017 }, country: '일본', countryCode: 'JP' },
  '삿포로': { coordinates: { latitude: 43.0642, longitude: 141.3469 }, country: '일본', countryCode: 'JP' },
  '나고야': { coordinates: { latitude: 35.1815, longitude: 136.9066 }, country: '일본', countryCode: 'JP' },
  '요코하마': { coordinates: { latitude: 35.4437, longitude: 139.6380 }, country: '일본', countryCode: 'JP' },

  // 중국 주요 도시
  '베이징': { coordinates: { latitude: 39.9042, longitude: 116.4074 }, country: '중국', countryCode: 'CN' },
  '상하이': { coordinates: { latitude: 31.2304, longitude: 121.4737 }, country: '중국', countryCode: 'CN' },
  '광저우': { coordinates: { latitude: 23.1291, longitude: 113.2644 }, country: '중국', countryCode: 'CN' },
  '선전': { coordinates: { latitude: 22.5431, longitude: 114.0579 }, country: '중국', countryCode: 'CN' },

  // 동남아 주요 도시
  '방콕': { coordinates: { latitude: 13.7563, longitude: 100.5018 }, country: '태국', countryCode: 'TH' },
  '싱가포르': { coordinates: { latitude: 1.3521, longitude: 103.8198 }, country: '싱가포르', countryCode: 'SG' },
  '타이페이': { coordinates: { latitude: 25.0330, longitude: 121.5654 }, country: '대만', countryCode: 'TW' },
  '홍콩': { coordinates: { latitude: 22.3193, longitude: 114.1694 }, country: '홍콩', countryCode: 'HK' },
  '마닐라': { coordinates: { latitude: 14.5995, longitude: 120.9842 }, country: '필리핀', countryCode: 'PH' },
  '하노이': { coordinates: { latitude: 21.0285, longitude: 105.8542 }, country: '베트남', countryCode: 'VN' },
  '호치민': { coordinates: { latitude: 10.8231, longitude: 106.6297 }, country: '베트남', countryCode: 'VN' },
  '쿠알라룸푸르': { coordinates: { latitude: 3.1390, longitude: 101.6869 }, country: '말레이시아', countryCode: 'MY' },

  // 기타 유명 도시
  '뉴욕': { coordinates: { latitude: 40.7128, longitude: -74.0060 }, country: '미국', countryCode: 'US' },
  '런던': { coordinates: { latitude: 51.5074, longitude: -0.1278 }, country: '영국', countryCode: 'GB' },
  '파리': { coordinates: { latitude: 48.8566, longitude: 2.3522 }, country: '프랑스', countryCode: 'FR' },
  '로마': { coordinates: { latitude: 41.9028, longitude: 12.4964 }, country: '이탈리아', countryCode: 'IT' },
  '시드니': { coordinates: { latitude: -33.8688, longitude: 151.2093 }, country: '호주', countryCode: 'AU' },
};

// 도시 정보 가져오기 (좌표 + 국가)
export const getCityInfo = async (cityName: string): Promise<CityInfo> => {
  // 입력값 정규화
  const normalizedCity = cityName.trim();

  // 1. 캐시된 정보 확인
  if (cityDatabase[normalizedCity]) {
    return cityDatabase[normalizedCity];
  }

  // 2. API로 지오코딩 시도
  const apiResult = await geocodeCity(normalizedCity);
  if (apiResult) {
    // 국가 정보는 알 수 없으므로 기본값 반환
    return {
      coordinates: apiResult,
      country: '알 수 없음',
      countryCode: 'UNKNOWN',
    };
  }

  // 3. 폴백: 서울 (한국)
  return cityDatabase['서울'];
};

// 하위 호환성을 위한 함수 유지
export const getCityCoordinates = async (cityName: string): Promise<Coordinates> => {
  const info = await getCityInfo(cityName);
  return info.coordinates;
};

// 두 지점 사이의 거리 계산 (km)
export const calculateDistance = (
  from: Coordinates,
  to: Coordinates
): number => {
  const R = 6371; // 지구 반경 (km)
  const dLat = toRad(to.latitude - from.latitude);
  const dLon = toRad(to.longitude - from.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(from.latitude)) *
    Math.cos(toRad(to.latitude)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance);
};

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// 교통수단 유효성 판단
export const isTransportValid = (
  transportType: 'train' | 'bus' | 'airplane' | 'car' | 'ferry',
  departureCountryCode: string,
  arrivalCountryCode: string,
  distance: number
): boolean => {
  // 국내 여행인지 국제 여행인지 판단
  const isDomestic = departureCountryCode === arrivalCountryCode;

  switch (transportType) {
    case 'train':
      // 기차는 국내만 가능, 거리 제한 (한국 최장 거리는 약 500km)
      if (!isDomestic) return false;
      if (departureCountryCode === 'KR' && distance > 600) return false;
      if (distance < 20) return false; // 너무 가까우면 기차 불필요
      return true;

    case 'bus':
      // 버스는 국내만 가능, 거리 제한
      if (!isDomestic) return false;
      if (distance > 500) return false; // 너무 멀면 버스 비효율적
      if (distance < 10) return false; // 너무 가까우면 버스 불필요
      return true;

    case 'airplane':
      // 항공은 국제선 또는 장거리 국내선
      if (!isDomestic) return true; // 국제선은 항상 가능
      // 국내선은 최소 거리 필요 (제주도 등)
      if (departureCountryCode === 'KR' && distance < 150) return false;
      return true;

    case 'ferry':
      // 페리는 특수한 경우 (한일 페리, 제주도 등)
      // 현재는 구현하지 않음
      return false;

    case 'car':
      // 자동차는 국내만, 단거리~중거리
      if (!isDomestic) return false;
      if (distance > 400) return false; // 너무 멀면 비효율적
      return true;

    default:
      return false;
  }
};

// 두 도시 간 이용 가능한 교통수단 리스트 반환
export const getAvailableTransportTypes = (
  departureCountryCode: string,
  arrivalCountryCode: string,
  distance: number
): Array<'train' | 'bus' | 'airplane'> => {
  const transportTypes: Array<'train' | 'bus' | 'airplane'> = ['train', 'bus', 'airplane'];

  return transportTypes.filter(type =>
    isTransportValid(type, departureCountryCode, arrivalCountryCode, distance)
  );
};
