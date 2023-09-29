import { getCurrentUser } from "@/actions/getCurrentUser";
import { getSavedPosts } from "@/actions/getSavedPosts";
import AuthClient from "@/components/AuthClient";
import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/Container";
import React from "react";
import SavedClient from "./SavedClient";

const SavedPage = async () => {
  const currentUser = await getCurrentUser();
  const savedPosts = await getSavedPosts();

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
          <SavedClient posts={savedPosts} currentUser={currentUser} />
        </Container>
      </div>
    </ClientOnly>
  );
};

export default SavedPage;
