
import Map from "@/app/ui/components/map/map"


export default async function Home(){
  console.log('클라이언트 ID:', process.env.NEXT_PUBLIC_MAP_CLIENT_ID);


  return(
    <main>
      <div className="p-5 grid grid-cols-1 gap-3">
        {/* TODO: 지도 로딩 중일 경우, 렌딩 페이지 작업 */}
        <Map/>
      </div>
    </main>
  )
}

