"use client";

import StatsCard from "../components/dashboard/StatsCard";
import RecentUploads from "../components/dashboard/RecentUploads";

const Dashboard = () => {
    return (
        <div className="flex flex-col gap-10 pt-20 pl-64 min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100">
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard title="Total Uploads" value={128} />
                <StatsCard title="Storage Used" value="2.4 GB" />
                <StatsCard title="Messages" value={32} />
                <StatsCard title="Tags" value={15} />
            </section>
            <RecentUploads />
        </div>
    );
}

export default Dashboard;
