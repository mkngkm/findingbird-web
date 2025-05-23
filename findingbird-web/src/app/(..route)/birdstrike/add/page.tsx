

import Header from "@/app/ui/components/header";
import RecordAddForm from "@/app/ui/components/birdstrike/birdstrike-add-form";


export default function BirdstrikeAddPage() {
  

  return (
    <div className='flex-1 overflow-y-auto flex flex-col justify-center"'>
      <Header title="조류 충돌 신고하기" link="/record" />
    <div className="px-5 mb-10 mt-5">
      <RecordAddForm />
    </div>
  </div>
  );
}
