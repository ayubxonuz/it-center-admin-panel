import {addStudents, getStudents} from "@/utils/studentsDB"
import {NextResponse} from "next/server"

export const GET = async () => {
  try {
    const students = getStudents()
    return NextResponse.json(students)
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error",
        error,
      },
      {
        status: 500,
      }
    )
  }
}
export const POST = async (req: Request) => {
  const {
    id,
    address,
    birthday,
    fullName,
    group,
    phone,
    userPercentage,
    userPhoto,
  }: IStudents = await req.json()
  try {
    const student = {
      id,
      fullName,
      birthday,
      address,
      group,
      phone,
      userPhoto,
      userPercentage,
    }
    addStudents(student)
    return NextResponse.json({message: "OK"}, {status: 200})
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error",
        error,
      },
      {
        status: 500,
      }
    )
  }
}