import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { useTripStore } from '../store/tripStore';

const { width, height } = Dimensions.get('window');

const MapScreen = () => {
  const mapRef = useRef<MapView>(null);
  const { tripInfo, selectedRoute } = useTripStore();

  // 지도 초기 영역 설정
  useEffect(() => {
    if (selectedRoute && mapRef.current) {
      // 출발지와 도착지를 포함하는 영역으로 지도 조정
      const coordinates = [
        selectedRoute.departure.coordinates,
        selectedRoute.arrival.coordinates,
      ];

      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [selectedRoute]);

  // 기본 위치 (서울)
  const defaultRegion = {
    latitude: 37.5665,
    longitude: 126.9780,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={defaultRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {/* 선택된 경로가 있을 때만 표시 */}
        {selectedRoute && (
          <>
            {/* 출발지 마커 */}
            <Marker
              coordinate={selectedRoute.departure.coordinates}
              title={selectedRoute.departure.location}
              description={`출발: ${selectedRoute.departure.time}`}
              pinColor="green"
            />

            {/* 도착지 마커 */}
            <Marker
              coordinate={selectedRoute.arrival.coordinates}
              title={selectedRoute.arrival.location}
              description={`도착: ${selectedRoute.arrival.time}`}
              pinColor="red"
            />

            {/* 경로선 */}
            <Polyline
              coordinates={[
                selectedRoute.departure.coordinates,
                selectedRoute.arrival.coordinates,
              ]}
              strokeColor="#4A90E2"
              strokeWidth={3}
            />
          </>
        )}

        {/* 여행 정보가 있지만 경로가 선택되지 않은 경우 */}
        {!selectedRoute && tripInfo && (
          <View style={styles.infoOverlay}>
            <Text style={styles.infoText}>
              경로를 선택하면 지도에 표시됩니다
            </Text>
          </View>
        )}
      </MapView>

      {/* 선택된 경로 정보 */}
      {selectedRoute && (
        <View style={styles.routeInfo}>
          <View style={styles.routeInfoHeader}>
            <Text style={styles.routeTitle}>{selectedRoute.operator}</Text>
            <Text style={styles.routeSubtitle}>{selectedRoute.vehicleNumber}</Text>
          </View>
          <View style={styles.routeDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>출발:</Text>
              <Text style={styles.detailValue}>
                {selectedRoute.departure.location} ({selectedRoute.departure.time})
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>도착:</Text>
              <Text style={styles.detailValue}>
                {selectedRoute.arrival.location} ({selectedRoute.arrival.time})
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* 경로가 없을 때 */}
      {!selectedRoute && !tripInfo && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>여행을 검색하고 경로를 선택하세요</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height,
  },
  infoOverlay: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  routeInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  routeInfoHeader: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 8,
  },
  routeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  routeSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  routeDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A90E2',
    width: 50,
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  emptyState: {
    position: 'absolute',
    top: '50%',
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default MapScreen;
