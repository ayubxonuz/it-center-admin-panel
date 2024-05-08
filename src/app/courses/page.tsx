import Header from "@/components/Header"
import Score from "@/components/Score"
import {PlusIcon} from "@heroicons/react/24/outline"

function Courses() {
  return (
    <main className="grid gap-y-3">
      <Header
        btnText="ADD COURSES"
        btnIcon={<PlusIcon width={21} height={21} />}
        text="Courses"
      />
      <div className="flex gap-x-5 mb-5">
        <Score title="All Students" total={1232} />
        <Score title="Girls" total={312} />
        <Score title="Boys" total={941} />
      </div>
    </main>
  )
}
export default Courses
