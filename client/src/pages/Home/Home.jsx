import React from "react";
import { useContext } from "react";
import { DataContext } from "../../components/DataProvider/DataProvider";

function Home() {
  const {user} = useContext(DataContext)
  // console.log(user)
  return (
    <div>
      <h1>Home</h1>
      <br />
      <br />
      <h3>Welcome: {user?.username || "Guest"}</h3>
    </div>
  );
}

export default Home;


// import React from 'react'

// function Home() {
//   return (
//     <div>Home</div>
//   )
// }

// export default Home


