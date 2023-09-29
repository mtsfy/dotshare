import { getCurrentUser } from "@/actions/getCurrentUser";
import AuthClient from "@/components/AuthClient";
import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/Container";
import LikesClient from "./LikesClient";
import { getLikedPosts } from "@/actions/getLikedPosts";

const LikesPage = async () => {
  const currentUser = await getCurrentUser();
  const savedPosts = await getLikedPosts();

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
      <div className="pt-24 lg:ml-44 md:ml-24 sm:ml-4 p-4 pb-24">
        <Container>
          <LikesClient posts={savedPosts} currentUser={currentUser} />
        </Container>
      </div>
    </ClientOnly>
  );
};

export default LikesPage;
