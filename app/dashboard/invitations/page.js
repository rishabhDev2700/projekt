import InvitationList from "@/components/custom/invitation/invitation-list";
import { fetchMyInvitations } from "@/lib/getData";
import { getSession } from "@/lib/session";
import { Invitation } from "@/models/invitation";



export default async function Page() {
  const user = await getSession()
  console.log("user:",user)
  const invitations = await fetchMyInvitations(user.email)
  return (
    <InvitationList invitations={invitations}></InvitationList>
  );
};