import { getCurrentUser } from "@/actions/getCurrentUser";
import AuthClient from "@/components/AuthClient";
import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/Container";
import React from "react";
import EditProfileClient from "./EditProfileClient";

const EditProfilePage = async () => {
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

  return (
    <ClientOnly>
      <div className="pt-24">
        <EditProfileClient user={currentUser} />
      </div>
    </ClientOnly>
  );
};

export default EditProfilePage;
