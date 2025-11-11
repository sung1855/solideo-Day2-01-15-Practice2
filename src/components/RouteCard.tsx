import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Route, TransportType } from '../types';

interface RouteCardProps {
  route: Route;
  onPress: () => void;
}

// 교통수단별 아이콘 매핑
const getTransportIcon = (type: TransportType): keyof typeof Ionicons.glyphMap => {
  switch (type) {
    case 'airplane':
      return 'airplane';
    case 'train':
      return 'train';
    case 'bus':
      return 'bus';
    case 'car':
      return 'car';
    case 'ferry':
      return 'boat';
    default:
      return 'help';
  }
};

// 교통수단별 색상
const getTransportColor = (type: TransportType): string => {
  switch (type) {
    case 'airplane':
      return '#4A90E2';
    case 'train':
      return '#7ED321';
    case 'bus':
      return '#F5A623';
    case 'car':
      return '#BD10E0';
    case 'ferry':
      return '#50E3C2';
    default:
      return '#999';
  }
};

// 시간 포맷 (분 -> 시간+분)
const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins}분`;
  } else if (mins === 0) {
    return `${hours}시간`;
  } else {
    return `${hours}시간 ${mins}분`;
  }
};

// 가격 포맷
const formatPrice = (price: number): string => {
  return price.toLocaleString('ko-KR');
};

const RouteCard: React.FC<RouteCardProps> = ({ route, onPress }) => {
  const iconName = getTransportIcon(route.transportType);
  const iconColor = getTransportColor(route.transportType);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* 헤더 */}
      <View style={styles.header}>
        <View style={styles.transportInfo}>
          <View style={[styles.iconContainer, { backgroundColor: iconColor + '20' }]}>
            <Ionicons name={iconName} size={24} color={iconColor} />
          </View>
          <View style={styles.operatorInfo}>
            <Text style={styles.operator}>{route.operator}</Text>
            <Text style={styles.vehicleNumber}>{route.vehicleNumber}</Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatPrice(route.price)}원</Text>
        </View>
      </View>

      {/* 경로 정보 */}
      <View style={styles.routeInfo}>
        <View style={styles.locationContainer}>
          <View style={styles.locationItem}>
            <Ionicons name="location-outline" size={16} color="#7ED321" />
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationText}>{route.departure.location}</Text>
              <Text style={styles.timeText}>{route.departure.time}</Text>
            </View>
          </View>

          <View style={styles.routeLine}>
            <Ionicons name="arrow-forward" size={20} color="#999" />
          </View>

          <View style={styles.locationItem}>
            <Ionicons name="location" size={16} color="#E24A4A" />
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationText}>{route.arrival.location}</Text>
              <Text style={styles.timeText}>{route.arrival.time}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 하단 정보 */}
      <View style={styles.footer}>
        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{formatDuration(route.duration)}</Text>
        </View>

        {route.transfers > 0 && (
          <View style={styles.detailItem}>
            <Ionicons name="swap-horizontal-outline" size={16} color="#666" />
            <Text style={styles.detailText}>환승 {route.transfers}회</Text>
          </View>
        )}

        {route.seatsAvailable !== undefined && (
          <View style={styles.detailItem}>
            <Ionicons name="people-outline" size={16} color="#666" />
            <Text style={styles.detailText}>좌석 {route.seatsAvailable}</Text>
          </View>
        )}

        <View style={styles.detailItem}>
          <Ionicons name="star" size={16} color="#F5A623" />
          <Text style={styles.detailText}>{route.rating.toFixed(1)}</Text>
        </View>
      </View>

      {/* 배지 */}
      {route.badges && route.badges.length > 0 && (
        <View style={styles.badgeContainer}>
          {route.badges.map((badge, index) => (
            <View key={index} style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    maxWidth: 600, // 웹에서 너무 넓지 않도록
    alignSelf: 'center', // 중앙 정렬
    width: '100%', // 모바일에서는 전체 너비
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  transportInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  operatorInfo: {
    flex: 1,
  },
  operator: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  vehicleNumber: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  routeInfo: {
    marginVertical: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationTextContainer: {
    marginLeft: 8,
    flex: 1,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  timeText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  routeLine: {
    paddingHorizontal: 8,
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginTop: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  badgeContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  badge: {
    backgroundColor: '#FFE5E5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 4,
  },
  badgeText: {
    fontSize: 12,
    color: '#E24A4A',
    fontWeight: '600',
  },
});

export default RouteCard;
