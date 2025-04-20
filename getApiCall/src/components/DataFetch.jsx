import { useState,useEffect } from 'react'
import axios from 'axios'
function DataFetch() {
    const [user, setUser] = useState([]);

    useEffect(()=>{
 
       // function for call api
       //Question why we used async with function and add await with axios
 
       const getData =async()=>{
        const result=  await axios.get('https://jsonplaceholder.typicode.com/users');
       //  console.log(result.data,"result");
        setUser(result.data);
  }
 
       getData();
   },[]);
 
   console.log(user,"user");;
   return (
     <>
       API Call
       <table border="1px solid black" cellPadding="5px" cellSpacing="0px">
         <tr>
           <td>ID</td>
           <td>Name</td>
           <td>UserName</td>
           <td>Email</td>
           <td>Address</td>
           <td>Geo Location</td>
           <td>Phone</td>
           <td>WebSite</td>
           <td>Company</td>
         </tr>
         {user.map((data) => (
           <tr>
             <td>{data.id}</td>
             <td>{data.name}</td>
             <td>{data.username}</td>
             <td>{data.email}</td>
             <td>
               {data.address.street},{data.address.city},{data.address.suite}.
               {data.address.zipcode}
             </td>
             <td>
               {data.address.geo.lat},{data.address.geo.lng}
             </td>
             <td>{data.phone}</td>
             <td>{data.website}</td>
             <td>
               {data.company.name},{data.company.catchPhrase},{data.company.bs}
             </td>
           </tr>
         ))}
       </table>
     </>
   );
 }


export default DataFetch

//useEffect
// For api call , you typically want to fetch data when the component mounts.( First render) useEffect provides a clean way to achieve this.
// It separates data fetching logic form the render logic. making the code easier to read and maintain.
//useEffect offers a powerful and flexible wat to handle side effects in functional components. 

//Axios: it's additional features provides like automatic JSON parsing.Intercepting request and response manipulation, cancellation, timeout setting, and built-in support for Cross-Site Request Forgery(CSRF) protection

//fetch : Basic Functionality for making request and handling response . Requires manual parsing of JSON data and error handling.

/*
    {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  }
*/