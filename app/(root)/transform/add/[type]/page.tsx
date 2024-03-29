import Header from "@/components/shared/Header";
import { SearchParamProps } from "@/types/types";
import { transformationTypes } from "@/const";
import TransformationForm from "@/components/shared/TransformationForm";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/server/user/actions";
import { redirect } from "next/navigation";

const AddTransformation = async ({ params: { type } }: SearchParamProps) => {
  const transformationType = transformationTypes[type];

  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);

  return (
    <>
      <Header
        title={transformationType.title}
        subTitle={transformationType.subTitle}
      />
      <TransformationForm
        action={"ADD"}
        userId={user._id}
        type={transformationType.type}
        creditBalance={user.creditBalance}
        data={null}
      />
    </>
  );
};

export default AddTransformation;
