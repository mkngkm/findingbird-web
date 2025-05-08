// utils/location.ts
export async function getDistrictFromLatLng(lat: number, lng: number): Promise<string> {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.naver?.maps?.Service) {
        return reject('Naver Maps API가 아직 로드되지 않았습니다.');
      }
  
      const coords = new window.naver.maps.LatLng(lat, lng);
  
      window.naver.maps.Service.reverseGeocode(
        {
          coords,
          orders: [
            window.naver.maps.Service.OrderType.ADDR,
            window.naver.maps.Service.OrderType.ROAD_ADDR,
          ].join(','),
        },
        (status, response) => {
          if (status !== window.naver.maps.Service.Status.OK) {
            return reject('좌표 → 주소 변환 실패');
          }
  
          const results = response.v2.results;
          const firstResult = results[0];
  
          if (!firstResult?.region?.area2?.name) {
            return reject('자치구 정보를 찾을 수 없습니다.');
          }
  
          const district = firstResult.region.area2.name; // 예: 성북구
          resolve(district);
        }
      );
    });
  }
  