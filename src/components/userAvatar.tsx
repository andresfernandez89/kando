import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function UserAvatar() {
  const { data: session } = useSession();
  return (
    <Avatar>
      <AvatarImage src={session?.user?.image ?? ""} alt="@shadcn" />
      <AvatarFallback>
        {session?.user?.email
          ? `${session.user.email[0].toLocaleUpperCase()}`
          : ""}
      </AvatarFallback>
    </Avatar>
  );
}
