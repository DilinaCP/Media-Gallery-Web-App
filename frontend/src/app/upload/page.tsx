"use client";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Dropzone from "../components/upload/Dropzone";
import Button from "../components/common/Button";

const Upload = () => {
    return (
        <div className="min-h-screen flex bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <div className="flex justify-center items-center p-30 bg-linear-to-br from-gray-50 via-white to-gray-100">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col gap-8 w-full max-w-4xl">
                        <Dropzone />
                        <div className="flex justify-end">
                            <Button variant="primary" onClick={() => console.log("Uploading...")}>
                                Upload Now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;
