"use client";

import StatsCard from "../components/dashboard/StatsCard";
import RecentUploads from "../components/dashboard/RecentUploads";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/common/Loader";
import { Users, Images, MessageSquare, Shield } from "lucide-react";

type AdminStatsResponse = {
    users: {
        total: number;
        active: number;
        suspended: number;
        admins: number;
    };
    images: {
        total: number;
    };
    messages: {
        total: number;
        unread: number;
    };
};

type UserStatsResponse = {
    images: {
        total: number;
    };
};

const Dashboard = () => {
    const { user, isAdmin, initializing } = useAuth();
    const { data: adminData, isLoading: adminLoading, error: adminError } = useFetch<AdminStatsResponse>(
        "/admin/stats",
        { immediate: isAdmin }
    );
    const { data: userData, isLoading: userLoading, error: userError } = useFetch<UserStatsResponse>(
        "/images/stats",
        { immediate: !isAdmin }
    );

    if (initializing) return <Loader />;

    const isLoadingStats = isAdmin ? adminLoading : userLoading;
    const hasError = isAdmin ? adminError : userError;

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-900 to-slate-900">
            <Sidebar />
            <div className="ml-0 md:ml-64 flex flex-col min-h-screen">
                <Header />
                <div className="flex flex-col gap-6 md:gap-10 pt-16 md:pt-20 px-4 sm:px-6 pb-20">
                <div>
                <h1 className="text-4xl font-bold bg-linear-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {isAdmin ? "Admin Dashboard" : "My Dashboard"}
                </h1>
                <p className="text-slate-400">Welcome back, <span className="text-purple-300 font-semibold">{user?.email?.split('@')[0]}</span>!</p>
            </div>

            {isLoadingStats ? (
                <Loader />
            ) : (
                <>
                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {isAdmin ? (
                            <>
                                <StatsCard 
                                    title="Total Uploads" 
                                    value={adminData?.images.total ?? "—"}
                                    variant="primary"
                                    icon={Images}
                                />
                                <StatsCard 
                                    title="Total Users" 
                                    value={adminData?.users.total ?? "—"}
                                    variant="secondary"
                                    icon={Users}
                                />
                                <StatsCard 
                                    title="Admin Users" 
                                    value={adminData?.users.admins ?? "—"}
                                    variant="success"
                                    icon={Shield}
                                />
                                <StatsCard 
                                    title="Unread Messages" 
                                    value={adminData?.messages.unread ?? "—"}
                                    variant="primary"
                                    icon={MessageSquare}
                                />
                            </>
                        ) : (
                            <StatsCard 
                                title="My Uploads" 
                                value={userData?.images.total ?? "—"}
                                variant="primary"
                                icon={Images}
                            />
                        )}
                    </section>

                    {hasError && (
                        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-300">
                            <p className="text-sm font-medium">Failed to load stats: {hasError}</p>
                        </div>
                    )}

                    <RecentUploads />
                </>
            )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
