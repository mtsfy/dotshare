import { getCurrentUser } from "@/actions/getCurrentUser";
import AuthClient from "@/components/AuthClient";
import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/Container";
import { getPostById } from "@/actions/getPostById";
import Loader from "@/components/Loader";
import EditPostClient from "./EditPostClient";

interface IParams {
  postId?: string;
}

const EditPostPage = async ({ params }: { params: IParams }) => {
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
    return (
      <ClientOnly>
        <div className="pt-24 lg:ml-44 md:ml-24 sm:ml-4 flex sm:block">
          <Container>
            <div>Post not found.</div>
          </Container>
        </div>
      </ClientOnly>
    );
  }

  if (post.userId !== currentUser.id) {
    return (
      <ClientOnly>
        <div className="pt-24 lg:ml-44 md:ml-24 sm:ml-4 flex sm:block">
          <Container>
            <div>Not allowed here boa.</div>
          </Container>
        </div>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <div className="pt-24 lg:ml-44 md:ml-24 sm:ml-4 flex sm:block">
        <Container>
          <EditPostClient post={post} currentUser={currentUser} />
        </Container>
      </div>
    </ClientOnly>
  );
};

export default EditPostPage;
