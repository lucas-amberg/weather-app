import Image from "next/image";
import Search from "./search";

//The navbar will rest at the top of every page and is responsible for displaying
//the search bar which is necessary for the site to function
export default function NavBar() {
  return(
    <div className="h-16 bg-white shadow-md flex justify-between p-4 items-center md:p-6">
      <Image
        src={'/partly-cloudy-day.svg'}
        width={60}
        height={60}
        alt={'Weather App Logo (Partly Cloudy Icon)'}
      />
      <Search placeholder="Search cities..."/>
    </div>
  );
}