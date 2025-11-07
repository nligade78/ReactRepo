import {useState, useEffect, use } from 'react'
import {getPost,getRandomUser} from "./api";
import './App.css'
import PostCard from './components/PostCard';
import UserCard from './components/UserCard';
function App() {
  const [data, setData]=useState(null);
  const [userData , setUserData] = useState(null);


  useEffect(() => {
    getPost().then((posts) => setData(posts));
  },[])


  useEffect(() =>{
    getRandomUser().then((user) => setUserData(user.results[0]));
  },[])

console.log("userData",userData);
    return (
      <div className="App">
       {userData && <UserCard data={userData}/>}

       
        {
          data ? data.map(e => <PostCard title={e.title}  body={e.body}/>) : <p>No Data</p>
        }
      </div>
    )
  
}

export default App
