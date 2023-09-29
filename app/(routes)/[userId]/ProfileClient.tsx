"use client";

import Avatar from "@/components/Avatar";
import FollowButton from "@/components/FollowButton";
import SavedCard from "@/components/SavedCard";
import { Post, User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CldImage } from "next-cloudinary";

interface ProfileClientProps {
  currentUser: User;
  profile: {
    image: string | null;
    id: string;
    name: string | null;
    category: string;
    bio: string | null;
    followedByIDs: string[];
    followingIDs: string[];
    username: string;
    posts: Post[];
  };
}

const ProfileClient: React.FC<ProfileClientProps> = ({
  currentUser,
  profile,
}) => {
  console.log(profile);
  const router = useRouter();
  // if (currentUser.id !== profile.id) {
  //   return (
  //     <>
  //       <div className="flex justify-center items-center p-0 sm:p-4 gap-0 sm:gap-4">
  // <div className="p-8 sm:flex items-center hidden ">
  //   <CldImage
  //     crop="fill"
  //     width={300}
  //     height={300}
  //     className="rounded-full object-cover"
  //     src={profile.image || "/placeholder.jpg"}
  //     alt="Avatar"
  //   />
  // </div>
  //         <div className="w-full p-2">
  // <div className="flex items-center gap-4 ">
  //   {/* image */}
  //   <div className="sm:hidden items-center flex">
  //     <CldImage
  //       crop="fill"
  //       width={100}
  //       height={100}
  //       className="rounded-full object-cover"
  //       src={profile.image || "/placeholder.jpg"}
  //       alt="Avatar"
  //     />
  //   </div>
  //             {/* username and follow button and counters*/}
  //             <div>
  //               <div className="flex flex-col sm:flex-row gap-4 mt-2">
  //                 <div>
  //                   <span className="text-base font-medium text-neutral-600">
  //                     @{profile.username}
  //                   </span>
  //                 </div>
  //                 <div className="pt-">
  //                   <FollowButton
  //                     currentUser={currentUser}
  //                     userId={profile.id}
  //                   />
  //                 </div>
  //               </div>
  //               <div className="hidden sm:flex w-64 sm:w-80">
  //                 <div className="mt-2 w-full flex gap-2 p-2 ">
  //                   <span className="font-bold">{profile.posts.length}</span>
  //                   <span>post</span>
  //                 </div>
  //                 <div
  //                   className="mt-2 w-full flex gap-2 p-2 hover:opacity-80 cursor-pointer transition"
  //                   onClick={() => router.push(`${profile.id}/followers`)}
  //                 >
  //                   <span className="font-bold">
  //                     {profile.followedByIDs.length}
  //                   </span>
  //                   <span>followers</span>
  //                 </div>
  //                 <div
  //                   className="mt-2 w-full flex gap-2 p-2 hover:opacity-80 cursor-pointer transition"
  //                   onClick={() => router.push(`${profile.id}/following`)}
  //                 >
  //                   <span className="font-bold">
  //                     {profile.followingIDs.length}
  //                   </span>
  //                   <span>following</span>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //           {/* bio and category */}
  //           <div className="mt-2  flex flex-col pb-2 pl-2 pt-2">
  //             <span className="text-base font-bold">{profile.name}</span>
  //             <span className="font-light text-neutral-500">
  //               {profile.category}
  //             </span>
  //             <span className="font-base text-neutral-700">{profile.bio}</span>
  //           </div>
  //           <div className="sm:hidden block mt-2   h-[1px] w-full bg-neutral-400/20" />
  //           {/* mobile counter */}
  //           <div className="sm:hidden flex w-full mt-2  mb-2">
  //             <div className="mt-2 w-full flex flex-col items-center">
  //               <span className="font-bold">{profile.posts.length}</span>
  //               <span className="font-light">post</span>
  //             </div>
  //             <div
  //               className="mt-2 w-full flex flex-col items-center  hover:opacity-80 cursor-pointer transition"
  //               onClick={() => router.push(`${profile.id}/followers`)}
  //             >
  //               <span className="font-bold">
  //                 {profile.followedByIDs.length}
  //               </span>
  //               <span className="font-light">followers</span>
  //             </div>
  //             <div
  //               className="mt-2 w-full flex flex-col items-center hover:opacity-80 cursor-pointer transition"
  //               onClick={() => router.push(`${profile.id}/following`)}
  //             >
  //               <span className="font-bold">{profile.followingIDs.length}</span>
  //               <span className="font-light">following</span>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <hr />
  //       <div className="grid gap-3 p-4 sm:grid-cols-3 grid-cols-2 w-full">
  //         {profile.posts.map((post: any) => (
  //           <>
  //             <div className="rounded-lg border p-2">
  //               <SavedCard
  //                 key={post.id}
  //                 data={post}
  //                 currentUser={currentUser}
  //                 actions={false}
  //               />
  //             </div>
  //           </>
  //         ))}
  //       </div>
  //     </>
  //   );
  // }

  return (
    <>
      <div className="flex justify-center items-center p-0 sm:p-4 gap-0 sm:gap-4">
        <div className="p-8 sm:flex items-center hidden ">
          <CldImage
            crop="fill"
            width={300}
            height={300}
            className="rounded-full object-cover"
            src={profile.image || "/placeholder.jpg"}
            alt="Avatar"
          />
        </div>

        <div className="w-full p-2">
          <div className="relative flex items-center gap-4">
            <div className="absolute w-28 h-28 sm:hidden ">
              <Image
                fill
                className=" block rounded-full object-cover"
                src={profile.image || "/placeholder.jpg"}
                alt="Avatar"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-2 sm:w-80 w-64 ml-36 sm:ml-0">
              <div>
                <span className="text-base font-medium text-neutral-600">
                  @{profile.username}
                </span>
              </div>
              {currentUser.id === profile.id ? (
                <div className="flex gap-4">
                  <div
                    onClick={() => router.push(`/edit/profile`)}
                    className="pt-1 pb-1 pl-4  pr-4  cursor-pointer text-medium transition hover:bg-neutral-500/20 bg-neutral-500/10 font-bold rounded-lg"
                  >
                    <span> Edit Profile</span>
                  </div>
                  <div
                    onClick={() => signOut()}
                    className="pt-1 pb-1 pl-4  pr-4  cursor-pointer text-medium transition hover:bg-neutral-500/20  bg-neutral-500/10 font-bold rounded-lg"
                  >
                    Sign Out
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-fit">
                    <FollowButton
                      currentUser={currentUser}
                      userId={profile.id}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="hidden sm:flex w-64 sm:w-80">
            <div className="mt-2 w-full flex gap-2 p-2 ">
              <span className="font-bold">{profile.posts.length}</span>
              <span>post</span>
            </div>
            <div
              className="mt-2 w-full flex gap-2 p-2 hover:opacity-80 cursor-pointer transition"
              onClick={() => router.push(`${profile.id}/followers`)}
            >
              <span className="font-bold">{profile.followedByIDs.length}</span>
              <span>followers</span>
            </div>
            <div
              className="mt-2 w-full flex gap-2 p-2 hover:opacity-80 cursor-pointer transition"
              onClick={() => router.push(`${profile.id}/following`)}
            >
              <span className="font-bold">{profile.followingIDs.length}</span>
              <span>following</span>
            </div>
          </div>
          <div className="sm:mt-2 mt-8  flex flex-col pb-2 pl-2 pt-2 ">
            <span className="text-base font-bold">{profile.name}</span>
            <span className="font-light text-neutral-500">
              {profile.category}
            </span>
            <span className="font-base text-neutral-700">{profile.bio}</span>
          </div>
          <div className="sm:hidden block mt-2   h-[1px] w-full bg-neutral-400/20" />
          <div className="sm:hidden flex w-full mt-2  mb-2">
            <div className="mt-2 w-full flex flex-col items-center">
              <span className="font-bold">{profile.posts.length}</span>
              <span className="font-light">post</span>
            </div>
            <div
              className="mt-2 w-full flex flex-col items-center  hover:opacity-80 cursor-pointer transition"
              onClick={() => router.push(`${profile.id}/followers`)}
            >
              <span className="font-bold">{profile.followedByIDs.length}</span>
              <span className="font-light">followers</span>
            </div>
            <div
              className="mt-2 w-full flex flex-col items-center hover:opacity-80 cursor-pointer transition"
              onClick={() => router.push(`${profile.id}/following`)}
            >
              <span className="font-bold">{profile.followingIDs.length}</span>
              <span className="font-light">following</span>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="grid gap-2 mt-2 p-2 grid-cols-3 w-full">
        {profile.posts.map((post: any) => (
          <>
            <div key={post.id} className="rounded-full ">
              <SavedCard
                key={post.id}
                data={post}
                currentUser={currentUser}
                actions={false}
              />
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default ProfileClient;
