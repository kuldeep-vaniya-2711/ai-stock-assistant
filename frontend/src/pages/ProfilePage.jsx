import { useDashboardContext } from "../context/DashboardContext";

import WalletCard from "../components/WalletCard";

function ProfilePage() {

  const {

    profile,

  } = useDashboardContext();

  return (

    <section className="space-y-6">

      <h2 className="text-2xl font-bold">

        Profile

      </h2>

      <WalletCard user={profile} />

    </section>

  );

}

export default ProfilePage;