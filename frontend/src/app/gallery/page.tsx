"use clients"

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header"

const Gallery = () => {
    
const mockUploads = [
  { id: 1, name: "sunset.jpg", date: "2025-01-02", url: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=400&h=400&fit=crop&q=80" },
  { id: 2, name: "mountain.png", date: "2025-01-04", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&q=80" },
  { id: 3, name: "cityscape.jpg", date: "2025-01-06", url: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=400&fit=crop&q=80" },
  { id: 4, name: "forest.png", date: "2025-01-08", url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop&q=80" },
  { id: 5, name: "beach.jpg", date: "2025-01-10", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop&q=80" },
  { id: 6, name: "aurora.png", date: "2025-01-12", url: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=400&fit=crop&q=80" },
  { id: 7, name: "ocean.jpg", date: "2025-01-14", url: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=400&fit=crop&q=80" },
  { id: 8, name: "desert.png", date: "2025-01-16", url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=400&fit=crop&q=80" },
  { id: 9, name: "waterfall.jpg", date: "2025-01-18", url: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=400&h=400&fit=crop&q=80" },
  { id: 10, name: "canyon.png", date: "2025-01-20", url: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&h=400&fit=crop&q=80" },
  { id: 11, name: "lake.jpg", date: "2025-01-22", url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=400&fit=crop&q=80" },
  { id: 12, name: "valley.png", date: "2025-01-24", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&q=80" },
  { id: 13, name: "glacier.jpg", date: "2025-01-26", url: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=400&h=400&fit=crop&q=80" },
  { id: 14, name: "sunrise.png", date: "2025-01-28", url: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400&h=400&fit=crop&q=80" },
  { id: 15, name: "river.jpg", date: "2025-01-30", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&q=80" },
  { id: 16, name: "volcano.png", date: "2025-02-01", url: "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=400&h=400&fit=crop&q=80" },
  { id: 17, name: "lighthouse.jpg", date: "2025-02-03", url: "https://images.unsplash.com/photo-1502581827181-9cf3c3ee0106?w=400&h=400&fit=crop&q=80" },
  { id: 18, name: "meadow.png", date: "2025-02-05", url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=400&fit=crop&q=80" },
  { id: 19, name: "cliff.jpg", date: "2025-02-07", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=400&fit=crop&q=80" },
  { id: 20, name: "island.png", date: "2025-02-09", url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop&q=80" },
];

    return(
        <div>
            <div className="min-h-screen flex bg-gray-100">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <Header />
                    <div className="grid grid-cols-2 md:grid-cols-4 p-10 gap-8 pt-20 pl-56 min-h-screen">
                        {mockUploads.map((img) => (
                            <div key={img.id} className="bg-white rounded-lg shadow p-2">
                            <img
                                src={img.url}
                                alt={img.name}
                                className="w-full h-40 object-cover rounded"
                                />
                                <p className="mt-2 text-sm font-medium text-center">{img.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>  

        </div>
        
    )
}

export default Gallery;