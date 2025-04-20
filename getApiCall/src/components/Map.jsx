import React from 'react'

function Map() {
    const students = [
      { name: "John", age: 20, email: "john@gmail.com", contact: "1234567890" },
      { name: "Doe", age: 22, email: "doe@gmail.com", contact: "1234567890" },
      { name: "Smith",age: 23,email: "smith@gmail.com",contact: "1234567890"},
      { name: "Jane", age: 24, email: "jane@gmail.com", contact: "1234567890" },
      { name: "Alex", age: 25, email: "alex@gmail.com", contact: "1234567890" },
      { name: "Bob", age: 26, email: "bob@gmail.com", contact: "1234567890" },
    ];
   
    students.map((item)=>{
        console.log("My Name is = ",item)
    })
  return (
    <div>
        <h1>Handle Array With List</h1>
        <table border="1px solid black" cellPadding="10px" cellSpacing="0px">
        <tr>
                    <td>Name</td>
                    <td>Age</td>
                    <td>Email</td>
                    <td>Contact</td>
                </tr>
        {
            // students.map((item,index)=>{
            //     return(
            //         <div key={index}>
            //             <h3>My Name is {item}</h3>
            //         </div>
            //     )
            // })

            students.map((data)=>
                <tr>
                    <td>{data.name}</td>
                    <td>{data.age}</td>
                    <td>{data.email}</td>
                    <td>{data.contact}</td>
                </tr>
                
            )

        }
        </table>
    </div>
  )
}

export default Map

//In React map() function commonly used to render a list of elements.It comes from JavaScript and is used to iterate over an array and transform each element into a React element (like component <div>, <li>)