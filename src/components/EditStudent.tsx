"use client"
import {Button, DatePicker, Input, Select, Space} from "antd"
import {PlusIcon, XMarkIcon} from "@heroicons/react/24/outline"
import {Controller, useForm} from "react-hook-form"
import {useMutation, useQueryClient} from "@tanstack/react-query"
import {customFetch, generateRandomNumber, selectGroup} from "@/utils/utils"
import {toast} from "sonner"
import {useDispatch, useSelector} from "react-redux"
import {
  toggleAddStudentFunc,
  toggleEditStudentFunc,
} from "@/lib/features/toggle/toggleSlice"
import dayjs from "dayjs"
import {RootState} from "@/lib/store"

type TInputs = {
  fullName: string
  birthday: string
  address: string
  group: string
  phone: string
  userPhoto: string
}

async function editStudent(data: IStudents) {
  try {
    // toast.loading("Please wait, the students is being generated")
    const res = await customFetch.patch(`students/${data.id}`, data)
    toast.success("Student edited successfully")
    // toast.dismiss()
    return res.data
  } catch (error) {
    toast.error("Failed to edit student")
    throw error
  } finally {
    toast.dismiss()
  }
}

function EditStudent({isOpen}: {isOpen: boolean}) {
  const dispatch = useDispatch()

  const queryClient = useQueryClient()
  const {control, handleSubmit} = useForm<TInputs>()
  const {singleStudentData} = useSelector(
    (store: RootState) => store.studentSlice
  )

  const {mutateAsync, isPending} = useMutation({
    mutationFn: editStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["students"]})
      dispatch(toggleEditStudentFunc())
    },
  })

  const onSubmit = (studentsFormData: TInputs) => {
    mutateAsync({
      id: singleStudentData?.id ?? 1,
      fullName: studentsFormData.fullName,
      birthday: dayjs(singleStudentData?.birthday).format("MMM D, YYYY"),
      address: studentsFormData.address,
      group: studentsFormData.group,
      phone: studentsFormData.phone,
      userPercentage: 13,
      userPhoto: "https://mighty.tools/mockmind-api/content/human/65.jpg",
    })
  }


  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-40 transition-all duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white z-50 w-full mx-80 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between">
          <p className="mb-5">Edit student</p>
          <button
            onClick={() => dispatch(toggleEditStudentFunc())}
            className="bg-slate-100 hover:bg-slate-200 transition-all rounded-full justify-center flex items-center w-8 h-8"
          >
            <XMarkIcon width={25} height={25} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full">
          <div className="border-dashed w-[500px] h-[400px] border border-black relative">
            <Controller
              name="userPhoto"
              control={control}
              render={({field}) => (
                <input
                  {...field}
                  type="file"
                  className="absolute inset-0 opacity-0 z-10 cursor-pointer"
                />
              )}
            />
            {singleStudentData?.userPhoto ? (
              <img
                src={singleStudentData.userPhoto}
                alt="Selected File"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center">
                Click to Upload
              </span>
            )}
          </div>
          <div className="grid mt-5 grid-cols-2 gap-3 h-min w-full ml-5">
            <div className="w-full">
              <h5 className="text-lg opacity-70 font-medium">Fullname:</h5>
              <Controller
                control={control}
                name="fullName"
                key={singleStudentData?.fullName}
                defaultValue={singleStudentData?.fullName}
                render={({field}) => (
                  <Input className="h-10" size="large" {...field} />
                )}
              />
            </div>
            <div className="w-full">
              <h5 className="text-lg opacity-70 font-medium">Birthday:</h5>
              <Controller
                name="birthday"
                control={control}
                key={singleStudentData?.birthday}
                render={({field}) => (
                  <DatePicker
                    defaultValue={dayjs(singleStudentData?.birthday)}
                    placeholder=""
                    className="w-full h-10"
                    {...field}
                    size="large"
                  />
                )}
              />
            </div>
            <div className="w-full">
              <h5 className="text-lg opacity-70 font-medium">Address:</h5>
              <Controller
                name="address"
                control={control}
                key={singleStudentData?.address}
                defaultValue={singleStudentData?.address}
                render={({field}) => (
                  <Input {...field} className="h-10" size="large" />
                )}
              />
            </div>
            <div className="w-full">
              <h5 className="text-lg opacity-70 font-medium">Group:</h5>
              <Controller
                key={singleStudentData?.group}
                defaultValue={singleStudentData?.group}
                name="group"
                control={control}
                render={({field}) => (
                  <Select
                    {...field}
                    size="large"
                    maxCount={1}
                    className="h-10 w-full"
                    mode="multiple"
                    options={selectGroup}
                    optionRender={(option) => (
                      <Space>
                        <span role="img" aria-label={option.data.label}>
                          <img
                            src={option.data.emoji}
                            alt=""
                            width={24}
                            height={24}
                          />
                        </span>
                        {option.data.desc}
                      </Space>
                    )}
                  />
                )}
              />
            </div>
            <div className="w-full">
              <h5 className="text-lg opacity-70 font-medium">Phone number:</h5>
              <Controller
                name="phone"
                control={control}
                key={singleStudentData?.phone}
                defaultValue={singleStudentData?.phone.slice(5)}
                render={({field}) => (
                  <Input
                    {...field}
                    name="phone"
                    addonBefore="+998"
                    size="large"
                  />
                )}
              />
            </div>
            <div className="w-full items-end flex">
              <Button
                loading={isPending}
                htmlType="submit"
                type="primary"
                size="large"
                className="flex items-center"
                icon={<PlusIcon width={21} height={21} />}
              >
                EDIT
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default EditStudent
