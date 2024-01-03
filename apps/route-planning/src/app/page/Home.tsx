import Airports from "./Airports";
import Users from "./Users";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home():JSX.Element{
    return (
        <div>
            <Navbar/>
            <Airports/>
            <Users/>
            <Footer/>
         </div>
    )
}