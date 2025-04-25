import AchromaticButton from "../../atom/button/achromatic-button";
import { Dialog, DialogContent, DialogTrigger } from "../dialog/dialog";


export function ExampleDialog(){

  return (
    <Dialog>
      <DialogTrigger asChild>
        <AchromaticButton>DialogTrigger</AchromaticButton>
      </DialogTrigger>
      <DialogContent title="다이얼로그 이름">
        <div className="p-5 text-center">
          <p>기본 다이얼로그입니다.</p>
          <p>기본 다이얼로그입니다.</p>
          <p>기본 다이얼로그입니다.</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}