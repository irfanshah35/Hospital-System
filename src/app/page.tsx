import Appointments from "@/components/appointments";
import Header from "@/components/header";
import SideBar from "@/components/sidebar";

export default function Home() {
  return (
    <>
      <Header />
      <SideBar />
      <Appointments />
    </>
  );
}
