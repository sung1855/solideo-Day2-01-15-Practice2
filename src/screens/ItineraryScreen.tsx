import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTripStore } from '../store/tripStore';
import { ActivityType } from '../types';

// 활동 타입별 아이콘
const getActivityIcon = (type: ActivityType): keyof typeof Ionicons.glyphMap => {
  switch (type) {
    case 'transport':
      return 'car-outline';
    case 'sightseeing':
      return 'eye-outline';
    case 'food':
      return 'restaurant-outline';
    case 'accommodation':
      return 'bed-outline';
    case 'activity':
      return 'bicycle-outline';
    default:
      return 'help-outline';
  }
};

// 활동 타입별 색상
const getActivityColor = (type: ActivityType): string => {
  switch (type) {
    case 'transport':
      return '#4A90E2';
    case 'sightseeing':
      return '#7ED321';
    case 'food':
      return '#F5A623';
    case 'accommodation':
      return '#BD10E0';
    case 'activity':
      return '#50E3C2';
    default:
      return '#999';
  }
};

const ItineraryScreen = () => {
  const { tripInfo, getItineraryByDay } = useTripStore();
  const [selectedDay, setSelectedDay] = useState(1);

  // 현재 선택된 날의 일정
  const itineraryItems = getItineraryByDay(selectedDay);

  // 여행 기간만큼 탭 생성
  const days = tripInfo ? Array.from({ length: tripInfo.duration }, (_, i) => i + 1) : [1, 2, 3];

  return (
    <View style={styles.container}>
      {/* Day 탭 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabContainer}
        contentContainerStyle={styles.tabContent}
      >
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayTab,
              selectedDay === day && styles.dayTabActive,
            ]}
            onPress={() => setSelectedDay(day)}
          >
            <Text
              style={[
                styles.dayTabText,
                selectedDay === day && styles.dayTabTextActive,
              ]}
            >
              Day {day}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 일정 리스트 */}
      {itineraryItems.length > 0 ? (
        <FlatList
          data={itineraryItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.timelineItem}>
              {/* 타임라인 인디케이터 */}
              <View style={styles.timelineIndicator}>
                <View style={styles.timelineDot} />
                {index < itineraryItems.length - 1 && <View style={styles.timelineLine} />}
              </View>

              {/* 일정 카드 */}
              <View style={styles.itemCard}>
                <View style={styles.itemHeader}>
                  <View style={styles.itemTitleRow}>
                    <View
                      style={[
                        styles.activityIcon,
                        { backgroundColor: getActivityColor(item.type) + '20' },
                      ]}
                    >
                      <Ionicons
                        name={getActivityIcon(item.type)}
                        size={20}
                        color={getActivityColor(item.type)}
                      />
                    </View>
                    <View style={styles.itemTitleContainer}>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      <Text style={styles.itemLocation}>{item.location}</Text>
                    </View>
                  </View>
                  <Text style={styles.itemTime}>{item.time}</Text>
                </View>

                <View style={styles.itemFooter}>
                  <View style={styles.itemDetail}>
                    <Ionicons name="time-outline" size={16} color="#666" />
                    <Text style={styles.itemDetailText}>
                      {Math.floor(item.duration / 60)}시간{' '}
                      {item.duration % 60 > 0 && `${item.duration % 60}분`}
                    </Text>
                  </View>
                  {item.cost && (
                    <View style={styles.itemDetail}>
                      <Ionicons name="cash-outline" size={16} color="#666" />
                      <Text style={styles.itemDetailText}>
                        {item.cost.toLocaleString()}원
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="calendar-outline" size={64} color="#DDD" />
          <Text style={styles.emptyTitle}>일정이 없습니다</Text>
          <Text style={styles.emptySubtitle}>
            경로를 선택하거나 새로운 일정을 추가해보세요
          </Text>
        </View>
      )}

      {/* 일정 추가 버튼 */}
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  tabContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tabContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  dayTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginHorizontal: 4,
  },
  dayTabActive: {
    backgroundColor: '#4A90E2',
  },
  dayTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  dayTabTextActive: {
    color: '#fff',
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 80,
  },
  timelineItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  timelineIndicator: {
    width: 40,
    alignItems: 'center',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4A90E2',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E0E0E0',
    marginTop: 4,
  },
  itemCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemHeader: {
    marginBottom: 12,
  },
  itemTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemTitleContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemLocation: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  itemTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A90E2',
  },
  itemFooter: {
    flexDirection: 'row',
    gap: 16,
  },
  itemDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  itemDetailText: {
    fontSize: 14,
    color: '#666',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#999',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#BBB',
    textAlign: 'center',
    marginTop: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ItineraryScreen;
