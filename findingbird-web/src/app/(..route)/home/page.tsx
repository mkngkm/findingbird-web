import Map from "@/app/ui/components/map/map"


export default async function Home(){
  console.log('클라이언트 ID:', process.env.NEXT_PUBLIC_MAP_CLIENT_ID);


  return(
    
      
      <div className="p-5 grid grid-cols-1 gap-3 min-h-screen">
        <Map />
      </div>
  )
}

