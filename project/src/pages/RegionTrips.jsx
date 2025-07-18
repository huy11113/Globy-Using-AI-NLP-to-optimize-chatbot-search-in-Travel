import { useParams } from "react-router-dom";
import trips from "../data/trips";

export default function RegionTrips() {
  const { regionId } = useParams();
  const regionTrips = trips.filter((trip) => trip.regionId === regionId);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 capitalize">{regionId.replace("-", " ")} Tours</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {regionTrips.map((trip) => (
          <div key={trip.id} className="bg-white p-4 rounded-xl shadow">
            <img src={trip.image} className="w-full h-48 object-cover rounded-md" />
            <h3 className="text-lg font-bold mt-3">{trip.name}</h3>
            <p className="text-sm text-gray-600">{trip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
