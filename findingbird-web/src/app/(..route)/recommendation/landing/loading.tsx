export default function Loading() {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-birdGreen600 border-t-transparent rounded-full mx-auto mb-6"></div>
          <div className="text-2xl font-bold text-birdGreen600 mb-2">🎯 목표 생성 중입니다...</div>
          <div className="text-gray-500">현재 위치를 분석 중입니다. 잠시만 기다려주세요!</div>
        </div>
      </div>
    );
  }
  