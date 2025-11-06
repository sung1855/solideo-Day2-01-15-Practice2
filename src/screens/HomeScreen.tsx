import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, TripInfo } from '../types';
import { useTripStore } from '../store/tripStore';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { searchRoutes } = useTripStore();

  // 입력 상태
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('2024-12-01');
  const [duration, setDuration] = useState(3);
  const [travelers, setTravelers] = useState(2);

  // 검색 버튼 활성화 여부
  const isSearchEnabled = departure.trim() !== '' && destination.trim() !== '';

  // 숫자 증감 함수
  const incrementDuration = () => {
    if (duration < 30) setDuration(duration + 1);
  };

  const decrementDuration = () => {
    if (duration > 1) setDuration(duration - 1);
  };

  const incrementTravelers = () => {
    if (travelers < 10) setTravelers(travelers + 1);
  };

  const decrementTravelers = () => {
    if (travelers > 1) setTravelers(travelers - 1);
  };

  // 검색 실행
  const handleSearch = () => {
    if (!isSearchEnabled) return;

    const tripInfo: TripInfo = {
      departure,
      destination,
      departureDate: new Date(departureDate),
      duration,
      travelers,
    };

    // Zustand 스토어에 저장하고 경로 검색
    searchRoutes(tripInfo);

    // 검색 결과 화면으로 이동
    navigation.navigate('SearchResult', { tripInfo });
  };

  return (
    <ScrollView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.title}>TripMate</Text>
        <Text style={styles.subtitle}>당신의 완벽한 여행을 계획하세요</Text>
      </View>

      {/* 검색 카드 */}
      <View style={styles.searchCard}>
        {/* 출발지 */}
        <View style={styles.inputGroup}>
          <View style={styles.inputLabel}>
            <Ionicons name="location-outline" size={20} color="#4A90E2" />
            <Text style={styles.labelText}>출발지</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="출발지를 입력하세요"
            value={departure}
            onChangeText={setDeparture}
          />
        </View>

        {/* 도착지 */}
        <View style={styles.inputGroup}>
          <View style={styles.inputLabel}>
            <Ionicons name="location" size={20} color="#E24A4A" />
            <Text style={styles.labelText}>도착지</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="도착지를 입력하세요"
            value={destination}
            onChangeText={setDestination}
          />
        </View>

        {/* 출발 날짜 */}
        <View style={styles.inputGroup}>
          <View style={styles.inputLabel}>
            <Ionicons name="calendar-outline" size={20} color="#4A90E2" />
            <Text style={styles.labelText}>출발 날짜</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={departureDate}
            onChangeText={setDepartureDate}
          />
        </View>

        {/* 여행 기간 */}
        <View style={styles.inputGroup}>
          <View style={styles.inputLabel}>
            <Ionicons name="time-outline" size={20} color="#4A90E2" />
            <Text style={styles.labelText}>여행 기간</Text>
          </View>
          <View style={styles.counterContainer}>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={decrementDuration}
            >
              <Ionicons name="remove" size={20} color="#4A90E2" />
            </TouchableOpacity>
            <Text style={styles.counterText}>{duration}일</Text>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={incrementDuration}
            >
              <Ionicons name="add" size={20} color="#4A90E2" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 여행 인원 */}
        <View style={styles.inputGroup}>
          <View style={styles.inputLabel}>
            <Ionicons name="people-outline" size={20} color="#4A90E2" />
            <Text style={styles.labelText}>여행 인원</Text>
          </View>
          <View style={styles.counterContainer}>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={decrementTravelers}
            >
              <Ionicons name="remove" size={20} color="#4A90E2" />
            </TouchableOpacity>
            <Text style={styles.counterText}>{travelers}명</Text>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={incrementTravelers}
            >
              <Ionicons name="add" size={20} color="#4A90E2" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 검색 버튼 */}
        <TouchableOpacity
          style={[
            styles.searchButton,
            !isSearchEnabled && styles.searchButtonDisabled,
          ]}
          onPress={handleSearch}
          disabled={!isSearchEnabled}
        >
          <Ionicons
            name="search"
            size={20}
            color="#fff"
            style={styles.searchIcon}
          />
          <Text style={styles.searchButtonText}>여행 검색</Text>
        </TouchableOpacity>
      </View>

      {/* 최근 검색 (나중에 구현) */}
      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>최근 검색</Text>
        <Text style={styles.emptyText}>최근 검색 기록이 없습니다</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#4A90E2',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#E8F4FF',
  },
  searchCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  labelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 8,
    backgroundColor: '#F9F9F9',
  },
  counterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  searchButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  searchButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  recentSection: {
    margin: 20,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    paddingVertical: 20,
  },
});

export default HomeScreen;
