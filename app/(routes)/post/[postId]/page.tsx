import { getCurrentUser } from "@/actions/getCurrentUser";
import AuthClient from "@/components/AuthClient";
import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/Container";
import PostClient from "./PostClient";
import { getPostById } from "@/actions/getPostById";
import Loader from "@/components/Loader";

interface IParams {
  postId?: string;
}

const PostPage = async ({ params }: { params: IParams }) => {
  const { postId } = params;
  const currentUser = await getCurrentUser();
  const post = await getPostById(params);

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

  if (!post) {
    return <div>No Post found</div>;
  }

  return (
    <ClientOnly>
      <div className="pt-24 lg:ml-44 md:ml-24 sm:ml-4 flex sm:block">
        <Container>
          <PostClient post={post} currentUser={currentUser} />
        </Container>
      </div>
    </ClientOnly>
  );
};

export default PostPage;
