import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ProfileCard = () => {
  const [chardata, setcharData] = useState(null);
  const [location, setlocation] = useState(null);
  const [episode, setepisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setpage] = useState(1);
  const [quiry, setquiry] = useState('')
  const [clicked, setClicked] = useState(false);
  console.log(chardata);


  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(
          `https://rickandmortyapi.com/api/character/?page=${page}&name=${quiry}`
        );
        if (!response1.ok) {
          throw new Error("Not found name");
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
  }, [page,quiry]);

  if (loading) return <div>Loading...</div>;
  if (error) return <h1 className="flex justify-center items-center h-screen font-bold ">Error: {error.message}</h1>;

  console.log("char", chardata);
  console.log("loca", location);
  console.log("epi", episode);

  const clickprev = () => {
    setClicked(true);
    if (page > 1) {
      setpage(page - 1);
    }
  };

  const clickNext = () => {
    setClicked(true);
    if (page < chardata.info.pages) {
      setpage(page + 1);
    }
  };

  

  return (

    <>  

<input
        className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        type="text"
        placeholder="Search..."
        // value={query}
        onChange={(e) => setquiry(e.target.value)}
      /> 
    <div className="flex justify-center m-10">
      <div>
        <button
          onClick={() => clickprev()}
          className={`button ${clicked ? 'clicked' : ''}`}
        >
          PREV
        </button>
        {' '}
        Page {page} of Total {chardata.info.pages} {' '}
        <button
          onClick={() => clickNext()}
          className={`button ${clicked ? 'clicked' : ''}`}
        >
          NEXT
        </button>
      </div>
    </div>



      <div className="container mx-auto flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {chardata.results &&
        chardata.results.map((item, id) => (
          <div key={item.id}>
            <div
              className="max-w-xs rounded overflow-hidden shadow-lg bg-white card"
              onClick={() => navigate(`/SingleProfile/${item.id}`, { state: item })}
              style={{ cursor: "pointer" }}
            >
              <img
                className="w-full rounded-lg card-image"
                src={item.image}
                alt={item.name}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{item.name}</div>
                <p className="text-gray-700 text-base">
                  Type: {item.type}
                  <br />
                  Total Episodes: {item.episode.length}
                  <br />
                  Location: {item.location.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>


    </>

  );
};

export default ProfileCard;
