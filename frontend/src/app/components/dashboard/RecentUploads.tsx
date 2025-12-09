const mockUploads = [
  { id: 1, name: "sunset.jpg", date: "2025-01-02", url: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=400&h=400&fit=crop&q=80" },
  { id: 2, name: "mountain.png", date: "2025-01-04", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&q=80" },
  { id: 3, name: "cityscape.jpg", date: "2025-01-06", url: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=400&fit=crop&q=80" },
  { id: 4, name: "forest.png", date: "2025-01-08", url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop&q=80" },
  { id: 5, name: "beach.jpg", date: "2025-01-10", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop&q=80" },
  { id: 6, name: "aurora.png", date: "2025-01-12", url: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=400&fit=crop&q=80" },
  { id: 7, name: "ocean.jpg", date: "2025-01-14", url: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=400&fit=crop&q=80" },
  { id: 8, name: "desert.png", date: "2025-01-16", url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=400&fit=crop&q=80" },
];

export default function RecentUploads() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Uploads</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {mockUploads.map((file) => (
          <div key={file.id} className="flex flex-col gap-2">
            <img
              src={file.url}
              alt={file.name}
              className="w-full h-28 object-cover rounded-lg border"
            />
            <p className="text-sm font-medium truncate">{file.name}</p>
            <p className="text-xs text-gray-500">{file.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
