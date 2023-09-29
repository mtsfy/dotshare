import { getCurrentUser } from "@/actions/getCurrentUser";
import { getUserById } from "@/actions/getUserById";
import AuthClient from "@/components/AuthClient";
import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/Container";
import ProfileClient from "./ProfileClient";

interface IParams {
  userId?: string;
}
const ProfilePage = async ({ params }: { params: IParams }) => {
  const { userId } = params;
  const currentUser = await getCurrentUser();
  const profile = await getUserById({ userId });

  if (!currentUser) {
    return (
      <ClientOnly>
        <Container>
          <div className="pt-24">
            <AuthClient />
          </div>
        </Container>
      </ClientOnly>
    );
  }

  if (!profile) {
    return (
      <ClientOnly>
        <div className="pt-24 text-center font-bold text-2xl">
          User doesn&apos;t exist.
        </div>
        ;
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <div className="pt-24  pb-20">
        <div className="items-center max-w-6xl lg:pl-52 md:pl-24 md:w-full sm:mx-auto gap-4 overflow-none">
          <ProfileClient currentUser={currentUser} profile={profile} />
        </div>
      </div>
      {/* <div className="pt-24 lg:ml-44 md:ml-24 sm:ml-4 flex sm:block">
        
      </div> */}
    </ClientOnly>
  );
};

export default ProfilePage;
