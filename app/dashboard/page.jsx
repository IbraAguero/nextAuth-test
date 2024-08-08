import { auth } from "@/auth";
import LogoutButton from "@/components/logout-button";

const DashboardPage = async () => {
  const session = await auth();

  if (!session) {
    return <div>No hay session</div>;
  }

  return (
    <div className="grid h-screen place-content-center gap-4">
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <LogoutButton />
    </div>
  );
};
export default DashboardPage;
