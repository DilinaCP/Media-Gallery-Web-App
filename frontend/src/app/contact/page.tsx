import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const Contact = () => {
    return(
        <div>
            <div className="min-h-screen flex bg-gray-100">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <Header />
                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-gray-800">Contact</h1>
                    </div>
                </div>
            </div>  

        </div>
    )
}

export default Contact;