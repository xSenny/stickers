import UploadForm from "@/components/shared/UploadForm";
import { auth } from "@clerk/nextjs/server";

const uploadPage = () => {
  const {sessionClaims} = auth()

  const userId = sessionClaims?.userId as string;
  // console.log(sessionClaims)
  // console.log(userId)
  return (
    <div>
      <UploadForm userId={userId} />
    </div>
  )
}

export default uploadPage;