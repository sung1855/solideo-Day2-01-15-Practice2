import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList, TabParamList, SortType } from '../types';
import { useTripStore } from '../store/tripStore';
import RouteCard from '../components/RouteCard';

type SearchResultRouteProp = RouteProp<RootStackParamList, 'SearchResult'>;
type NavigationProp = BottomTabNavigationProp<TabParamList>;

const SearchResultScreen = () => {
  const route = useRoute<SearchResultRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { getSortedRoutes, sortType, setSortType, setSelectedRoute } = useTripStore();

  const routes = getSortedRoutes();

  // 정렬 버튼 데이터
  const sortOptions: { label: string; value: SortType }[] = [
    { label: '추천순', value: 'recommended' },
    { label: '최저가순', value: 'price' },
    { label: '최단시간순', value: 'duration' },
    { label: '최소환승순', value: 'transfers' },
  ];

  // 경로 선택 시
  const handleRouteSelect = (selectedRoute: any) => {
    setSelectedRoute(selectedRoute);
    // 일정 탭으로 이동
    navigation.navigate('Itinerary');
  };

  return (
    <View style={styles.container}>
      {/* 정렬 옵션 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.sortContainer}
        contentContainerStyle={styles.sortContent}
      >
        {sortOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.sortButton,
              sortType === option.value && styles.sortButtonActive,
            ]}
            onPress={() => setSortType(option.value)}
          >
            <Text
              style={[
                styles.sortButtonText,
                sortType === option.value && styles.sortButtonTextActive,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 검색 결과 개수 */}
      <View style={styles.resultHeader}>
        <Text style={styles.resultCount}>총 {routes.length}개의 경로</Text>
      </View>

      {/* 경로 리스트 */}
      <FlatList
        data={routes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RouteCard route={item} onPress={() => handleRouteSelect(item)} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  sortContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sortContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  sortButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginHorizontal: 4,
  },
  sortButtonActive: {
    backgroundColor: '#4A90E2',
  },
  sortButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  sortButtonTextActive: {
    color: '#fff',
  },
  resultHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  resultCount: {
    fontSize: 14,
    color: '#666',
  },
  listContent: {
    paddingVertical: 8,
  },
});

export default SearchResultScreen;
