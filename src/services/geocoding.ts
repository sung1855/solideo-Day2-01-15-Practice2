// 지오코딩 서비스 - 도시 이름을 좌표로 변환

export interface Coordinates {
  latitude: number;
  longitude: number;
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

// 도시별 기본 좌표 (API 호출 실패시 폴백)
const cityCoordinates: { [key: string]: Coordinates } = {
  // 한국 주요 도시
  '서울': { latitude: 37.5665, longitude: 126.9780 },
  '부산': { latitude: 35.1796, longitude: 129.0756 },
  '인천': { latitude: 37.4563, longitude: 126.7052 },
  '대구': { latitude: 35.8714, longitude: 128.6014 },
  '대전': { latitude: 36.3504, longitude: 127.3845 },
  '광주': { latitude: 35.1595, longitude: 126.8526 },
  '울산': { latitude: 35.5384, longitude: 129.3114 },
  '수원': { latitude: 37.2636, longitude: 127.0286 },
  '제주': { latitude: 33.4996, longitude: 126.5312 },
  '강릉': { latitude: 37.7519, longitude: 128.8761 },
  '경주': { latitude: 35.8562, longitude: 129.2247 },
  '전주': { latitude: 35.8242, longitude: 127.1480 },
  '청주': { latitude: 36.6424, longitude: 127.4890 },
  '춘천': { latitude: 37.8813, longitude: 127.7300 },
  '포항': { latitude: 36.0190, longitude: 129.3435 },

  // 일본 주요 도시
  '도쿄': { latitude: 35.6762, longitude: 139.6503 },
  '오사카': { latitude: 34.6937, longitude: 135.5023 },
  '교토': { latitude: 35.0116, longitude: 135.7681 },
  '후쿠오카': { latitude: 33.5904, longitude: 130.4017 },
  '삿포로': { latitude: 43.0642, longitude: 141.3469 },
  '나고야': { latitude: 35.1815, longitude: 136.9066 },
  '요코하마': { latitude: 35.4437, longitude: 139.6380 },

  // 중국 주요 도시
  '베이징': { latitude: 39.9042, longitude: 116.4074 },
  '상하이': { latitude: 31.2304, longitude: 121.4737 },
  '광저우': { latitude: 23.1291, longitude: 113.2644 },
  '선전': { latitude: 22.5431, longitude: 114.0579 },

  // 동남아 주요 도시
  '방콕': { latitude: 13.7563, longitude: 100.5018 },
  '싱가포르': { latitude: 1.3521, longitude: 103.8198 },
  '타이페이': { latitude: 25.0330, longitude: 121.5654 },
  '홍콩': { latitude: 22.3193, longitude: 114.1694 },
  '마닐라': { latitude: 14.5995, longitude: 120.9842 },
  '하노이': { latitude: 21.0285, longitude: 105.8542 },
  '호치민': { latitude: 10.8231, longitude: 106.6297 },
  '쿠알라룸푸르': { latitude: 3.1390, longitude: 101.6869 },

  // 기타 유명 도시
  '뉴욕': { latitude: 40.7128, longitude: -74.0060 },
  '런던': { latitude: 51.5074, longitude: -0.1278 },
  '파리': { latitude: 48.8566, longitude: 2.3522 },
  '로마': { latitude: 41.9028, longitude: 12.4964 },
  '시드니': { latitude: -33.8688, longitude: 151.2093 },
};

// 도시 이름으로 좌표 가져오기 (동기식 폴백 포함)
export const getCityCoordinates = async (cityName: string): Promise<Coordinates> => {
  // 입력값 정규화
  const normalizedCity = cityName.trim();

  // 1. 캐시된 좌표 확인
  if (cityCoordinates[normalizedCity]) {
    return cityCoordinates[normalizedCity];
  }

  // 2. API로 지오코딩 시도
  const apiResult = await geocodeCity(normalizedCity);
  if (apiResult) {
    return apiResult;
  }

  // 3. 폴백: 한국 중심 좌표 반환
  return { latitude: 37.5665, longitude: 126.9780 }; // 서울
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
