// 교통편 예매 서비스 - 실제 예매 사이트 연동

export interface BookingInfo {
  url: string;
  siteName: string;
  needsManualSearch?: boolean; // API가 없어서 수동 검색이 필요한 경우
}

// 출발지, 도착지, 날짜를 기반으로 예매 URL 생성
export const getBookingUrl = (
  transportType: 'train' | 'bus' | 'airplane' | 'car' | 'ferry',
  operator: string,
  departure: string,
  destination: string,
  date?: string
): BookingInfo => {
  const formattedDate = date || new Date().toISOString().split('T')[0];

  switch (transportType) {
    case 'train':
      if (operator.includes('KTX') || operator.includes('무궁화') || operator === '코레일') {
        // 코레일 예매
        return {
          url: `https://www.letskorail.com/ebizprd/prdMain.do`,
          siteName: '코레일(Korail)',
          needsManualSearch: true, // 코레일은 직접 검색 URL 지원 안함
        };
      } else if (operator.includes('SRT')) {
        // SRT 예매
        return {
          url: `https://etk.srail.kr/main.do`,
          siteName: 'SRT',
          needsManualSearch: true,
        };
      }
      return {
        url: 'https://www.letskorail.com/ebizprd/prdMain.do',
        siteName: '코레일',
        needsManualSearch: true,
      };

    case 'bus':
      // 코버스(고속버스/시외버스 통합 예매)
      // 코버스 API는 복잡한 POST 요청이 필요하므로 메인 페이지로 연결
      return {
        url: 'https://www.kobus.co.kr/main.do',
        siteName: '코버스(Kobus)',
        needsManualSearch: true,
      };

    case 'airplane':
      // 네이버 항공권 - 쿼리 파라미터로 검색 지원
      const departureCode = getCityCode(departure, 'airport');
      const arrivalCode = getCityCode(destination, 'airport');

      if (departureCode && arrivalCode) {
        // YYYY-MM-DD 형식을 YYMMDD로 변환
        const dateStr = formattedDate.replace(/-/g, '').substring(2);

        return {
          url: `https://flight.naver.com/flights/international/${departureCode}-${arrivalCode}-${dateStr}?adult=1&isDirect=false`,
          siteName: '네이버 항공권',
          needsManualSearch: false,
        };
      }

      // 폴백: 스카이스캐너
      return {
        url: 'https://www.skyscanner.co.kr/',
        siteName: '스카이스캐너',
        needsManualSearch: true,
      };

    case 'ferry':
      // 해운항만청 페리 정보
      return {
        url: 'https://www.ferry.or.kr/',
        siteName: '해운항만청',
        needsManualSearch: true,
      };

    case 'car':
      // 쏘카(카셰어링)
      return {
        url: 'https://www.socar.kr/',
        siteName: '쏘카',
        needsManualSearch: true,
      };

    default:
      return {
        url: 'https://www.google.com/search?q=' + encodeURIComponent(`${departure} ${destination} 교통편`),
        siteName: '구글 검색',
        needsManualSearch: true,
      };
  }
};

// 도시명을 공항/터미널 코드로 변환
function getCityCode(cityName: string, type: 'airport' | 'bus' | 'train'): string | null {
  const airportCodes: { [key: string]: string } = {
    // 한국 공항
    '서울': 'SEL',
    '인천': 'ICN',
    '김포': 'GMP',
    '부산': 'PUS',
    '제주': 'CJU',
    '대구': 'TAE',
    '광주': 'KWJ',
    '청주': 'CJJ',
    '무안': 'MWX',
    '양양': 'YNY',
    '울산': 'USN',
    '포항': 'KPO',
    '사천': 'HIN',
    '여수': 'RSU',
    '군산': 'KUV',
    '원주': 'WJU',

    // 일본 공항
    '도쿄': 'TYO',
    '오사카': 'OSA',
    '나고야': 'NGO',
    '후쿠오카': 'FUK',
    '삿포로': 'SPK',
    '오키나와': 'OKA',
    '나리타': 'NRT',
    '하네다': 'HND',
    '간사이': 'KIX',

    // 중국 공항
    '베이징': 'BJS',
    '상하이': 'SHA',
    '광저우': 'CAN',
    '심천': 'SZX',
    '청두': 'CTU',
    '시안': 'XIY',

    // 동남아 공항
    '방콕': 'BKK',
    '싱가포르': 'SIN',
    '타이베이': 'TPE',
    '홍콩': 'HKG',
    '마닐라': 'MNL',
    '하노이': 'HAN',
    '호치민': 'SGN',
    '푸켓': 'HKT',
    '다낭': 'DAD',

    // 기타 주요 공항
    '뉴욕': 'NYC',
    '로스앤젤레스': 'LAX',
    '런던': 'LON',
    '파리': 'PAR',
    '프랑크푸르트': 'FRA',
    '시드니': 'SYD',
  };

  if (type === 'airport') {
    return airportCodes[cityName] || null;
  }

  return null;
}

// 예매 사이트별 도움말 메시지
export const getBookingHelpMessage = (bookingInfo: BookingInfo): string => {
  if (bookingInfo.needsManualSearch) {
    return `${bookingInfo.siteName}에서 직접 출발지, 도착지, 날짜를 입력하여 검색해주세요.`;
  }
  return `${bookingInfo.siteName}로 이동하여 예매를 진행합니다.`;
};

// 예매 사이트 열기
export const openBookingSite = (bookingInfo: BookingInfo) => {
  if (typeof window !== 'undefined') {
    window.open(bookingInfo.url, '_blank', 'noopener,noreferrer');
  }
};
