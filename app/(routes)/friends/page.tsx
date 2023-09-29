import { getCurrentUser } from "@/actions/getCurrentUser";
import AuthClient from "@/components/AuthClient";
import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/Container";
import FriendsClient from "./FriendsClient";
import { getFriends } from "@/actions/getFriends";

const FriendsPage = async () => {
  const currentUser = await getCurrentUser();
  const friends = await getFriends();

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
  return (
    <ClientOnly>
      <div className="pt-24 lg:ml-44 md:ml-24 sm:ml-4 p-4 pb-24 mx-auto">
        <Container>
          <FriendsClient friends={friends} currentUser={currentUser} />
        </Container>
      </div>
    </ClientOnly>
  );
};

export default FriendsPage;
