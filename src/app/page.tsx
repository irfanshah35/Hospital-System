import Appointments from "@/components/appointments";
import Header from "@/components/header";
import SideBar from "@/components/sidebar";
import StatsCard from "@/components/Stats-cards";

export default function Home() {
  return (
    <>
  
        <div className="flex flex-col w-[calc(100vw-260px)]">
          <StatsCard />
          <Appointments />
        </div>
    </>
  );
}
