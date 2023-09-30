import { getCurrentUser } from "@/actions/getCurrentUser";
import { getPosts } from "@/actions/getPosts";
import AuthClient from "@/components/AuthClient";
import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/Container";
import PostCard from "@/components/post/PostCard";

const Home = async () => {
  const currentUser = await getCurrentUser();

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
  const posts = await getPosts();

  if (posts?.length === 0) {
    return (
      <ClientOnly>
        <Container>
          <div className="pt-24">
            <div className="flex flex-col items-center max-w-2xl mx-auto gap-4">
              <div className="font-bold text-2xl">Be the first to share!</div>
            </div>
          </div>
        </Container>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <div className="pt-24 flex">
        <div className="flex flex-col items-center max-w-2xl mx-auto gap-4 pb-20">
          {posts &&
            posts.map((post) => (
              <>
                <div
                  key={post.id}
                  className="col-span-1 gap-3 p-8 flex flex-col justify-center w-full"
                >
                  <PostCard post={post} currentUser={currentUser} />
                </div>
              </>
            ))}
        </div>
        {/* <SuggestedBar currentUser={currentUser} /> */}
      </div>
    </ClientOnly>
  );
};

export default Home;
