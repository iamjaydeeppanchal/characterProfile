import React, { useEffect, useState } from "react";

const ProfileCard = () => {
  const [chardata, setcharData] = useState(null);
  const [location, setlocation] = useState(null);
  const [episode, setepisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setpage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(
          `https://rickandmortyapi.com/api/character/?page=${page}`
        );
        if (!response1.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData1 = await response1.json();
        setcharData(jsonData1);

        const response2 = await fetch(
          "https://rickandmortyapi.com/api/location"
        );
        if (!response2.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData2 = await response2.json();
        // Handle data from the second API call
        setlocation(jsonData2);

        const response3 = await fetch(
          "https://rickandmortyapi.com/api/episode"
        );
        if (!response3.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData3 = await response3.json();
        setepisode(jsonData3);
        // Handle data from the third API call
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log("char", chardata);
  console.log("loca", location);
  console.log("epi", episode);

  const clickprev = () => {
    if (page > 1) {
      setpage(page - 1);
    }
  };

  const clickNext = () => {
    if (page < chardata.info.pages) {
      setpage(page + 1);
    }
  };

  

  return (

    <>  
    
    <div className="flex justify-center m-10">
  <div><button onClick={() => clickprev()} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      PREV
    </button>
  {' '} {page} of Total {chardata.info.pages} {' '}
  <button onClick={() => clickNext()} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">NEXT</button>
</div>
</div>



      <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {chardata.results &&
          chardata.results.map((item, id) => (
            <div
              key={id}
              className="max-w-xs rounded overflow-hidden shadow-lg bg-white"
            >
              <img className="w-full" src={item.image} alt={item.name} />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{item.name}</div>
                <p className="text-gray-700 text-base">
                  Type: {item.type}
                  <br />
                  {/* {  console.log(item.episode.length)} */}
                  Total Episodes: {item.episode.length}
                  <br />
                  Location: {item.location.name}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>


    </>

  );
};

export default ProfileCard;
