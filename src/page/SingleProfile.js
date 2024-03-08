import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleProfile = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const responseData = await response.json();

        setData(responseData);
        setLoading(false);

        // Fetch episodes
        const episodeData = await Promise.all(
          responseData.episode.map(async (episodeUrl) => {
            const episodeResponse = await fetch(episodeUrl);
            if (!episodeResponse.ok) {
              throw new Error("Failed to fetch episode data");
            }
            return episodeResponse.json();
          })
        );
        setEpisodes(episodeData);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden m-10">
      <div className="flex flex-col md:flex-row"> {/* flex direction column for mobile and row for desktop */}
        <img
          className="w-full md:w-1/2 h-64 object-cover object-center"
          src={data.image}
          alt={data.name}
        />
        <div className="w-full md:w-1/2 p-6">
          <div className="font-bold text-xl mb-2">{data.name}</div>
          <p className="text-gray-700">
            Status: {data.status}
            <br />
            Species: {data.species}
            <br />
            Gender: {data.gender}
            <br />
            Location: {data.location.name}
          </p>
          <div className="mt-4">
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Character URL
            </a>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-semibold mb-2">Episodes:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Single column for mobile and two columns for desktop */}
          {episodes.map((episode, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold">{episode.name}</h4>
              <p>Episode: {episodes.length}</p>
              <p>Air date: {episode.air_date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProfile;
