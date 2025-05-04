'use client';

import Header from "@/app/ui/components/header";
import RecordAddForm from "@/app/ui/components/record/record-add-form";


export default function RecordAddPage() {
  

  return (
    <div className='h-full flex flex-col justify-center"'>
      <Header title="기록 추가" link="/record" />
    <div className="px-5 mb-10 flex flex-col mb-10 mt-5">
      <RecordAddForm />
    </div>
  </div>
  );
}
