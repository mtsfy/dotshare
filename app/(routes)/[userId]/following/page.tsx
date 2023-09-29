import { getCurrentUser } from "@/actions/getCurrentUser";
import { getFollowingById } from "@/actions/getFollowingById";
import { getUserById } from "@/actions/getUserById";
import AuthClient from "@/components/AuthClient";
import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/Container";
import FollowingClient from "./FollowingClient";

interface IParams {
  userId?: string;
}
const FollowingPage = async ({ params }: { params: IParams }) => {
  const { userId } = params;
  const currentUser = await getCurrentUser();
  const followingList = await getFollowingById({ userId });
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
        <div className="pt-24 mx-auto">User doesn&apos;t exist.</div>;
      </ClientOnly>
    );
  }

  if (!followingList) {
    return (
      <ClientOnly>
        <div className="pt-24 mx-auto">User not following anyone.</div>;
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <div className="pt-24 mx-auto xl:px-20 md:px-10 sm:px-2 lg:ml-44 md:ml-24 sm:ml-4 p-4 max-w-3xl">
        <FollowingClient
          currentUser={currentUser}
          followingList={followingList}
          profile={profile}
        />
      </div>
    </ClientOnly>
  );
};

export default FollowingPage;
