export interface BirdObservation {
    speciesCode: string;
    comName: string;
    sciName: string;
    lat: number;
    lng: number;
    locName: string;
    obsDt: string;
    howMany: number;
  }
  
  export async function getNearbyBirds(lat: number, lng: number): Promise<BirdObservation[]> {
    const res = await fetch(`/api/ebird?lat=${lat}&lng=${lng}`);
    if (!res.ok) throw new Error("eBird API 호출 실패");
    return res.json();
  }
  