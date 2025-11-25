import { StrictMode,use,useEffect,useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'

import{ BrowserRouter, Route, Routes,NavLink,useParams} from 'react-router-dom';

const Home =() =>{

  // const [post,setPost]=useState([])
  //   useEffect(()=>{
  //       fetch('https://jsonplaceholder.typicode.com/posts')
  //       .then((data) => data.json())
  //       .then((data) =>setPost(data))
  //   },[])

  //   return(
  //     <div className='post-container'>
  //         {
  //           post.map((post) =>(
  //              <NavLink style={{display:"block"}} to={`/post/${post.id}`}>{post.title}</NavLink>
  //        ))}
  //     </div>
  //   )
}

const About =() =>{
  return(
    <div>
      <h1>About Page</h1>
    </div>
  )
}

const Profile =() =>{
  return(
    <div>
      <h1>Profile Page</h1>
    </div>
  )
}

const SayUser =() =>{
  const params =useParams();
  console.log("params",params)
  return(
    <div>
      <h1>Your Name is {params.userName} </h1>
    </div>
  )
}

const PostPage = ()=>{
  const params=useParams();
  const [data,setData]=useState(null);
  console.log(params,"PostParam");

 useEffect(()=>{
     fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`)
       .then((data)=>data.json())
       .then((data)=>setData(data))
 },[])

 console.log("data",data);

 if(data === null) return<p>Loading...</p>;
 return(
  <div>
    <h1>{data.title}</h1>
    <p>{data.body}</p>
  </div>
 )
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    {/* <App /> */}
    <Routes>
      <Route path="/" element={<Home></Home>}/>
      {/* <Route path="/about" element={<About></About>}/> */}
      {/* <Route path="/profile" element={<Profile></Profile>}/> */}
      {/* <Route path="/account/profile" element={<Profile></Profile>}/> */}
          <Route path="/post/:postId" element={<PostPage/>}></Route>
        <Route path="account">
         <Route path="profile" element={<Profile></Profile>}/>
         <Route path="about" element={<About></About>}/>
        </Route>

        <Route path="/user/:userName" element={<SayUser/>}/>

    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
