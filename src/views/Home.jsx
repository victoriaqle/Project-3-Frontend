import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import Header from '../components/Header.jsx'




function Home() {

  const [newDescription, setNewDescription] = useState('')

  const [description, setDescription] = useState([])

  useEffect(()=>{
    axios
          .get( 'http://localhost:3000/notes')
          .then((response)=>{
          setDescription(response.data)
          })
  },[])

  const hanldeNewDescriptionChange = (event) =>{
    setNewDescription(event.target.value);
  }

  const handleNewDescriptionFormSubmit = (event) => {
        event.preventDefault();
        axios
          .post(
            'http://localhost:3000/notes',
          {
            description:newDescription
          }
        )
  }




  const displayDescription = (params) => {
      return Math.floor(Math.random()  * params.length )
  }



const handleEdit = (descriptionData)=>{
    axios
        .put(
            `http://localhost:3000/notes/${descriptionData._id}`,
            {
                description:descriptionData?.description,
            }
        )
        .then(()=>{
            axios
                .get('http://localhost:3000/notes')
                .then((response)=>{
                    // setDescription(response.data)
                    console.log(response.data);
                })
        })
}

console.log(description[displayDescription(description)]);
  return (

    <main>

        <Header />
        <h2 className='subtitle'>Somone wrote this for you</h2>


        <section>
            <h1 className='msg'>{description[displayDescription(description)]?.description}</h1>
        </section>



        <section>
        <center><h1 className='subtitle2'>Send a positive messege to a stranger</h1>

           <form className='form' onSubmit={handleNewDescriptionFormSubmit}>
                  User: <input type='text' /><br/>
                  Note: <input type='text' onChange={hanldeNewDescriptionChange}/><br/>
                  <input type='submit' className='btn' value='Send Love'/>
            </form></center>
          </section>

        <section>
        {/* <form className='form' onSubmit={handleEdit(description[displayDescription(description)])}>
                        User: <input type='text' /><br/>
                        Note: <input type='text' onChange={hanldeNewDescriptionChange}/><br/>
                        <input type='submit' className='btn' value='Send Love'/>
                    </form> */}
        </section>

    </main>


  );



}

export default Home;
