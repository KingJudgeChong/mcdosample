import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Location = () => {

    const navigate = useNavigate()
    const [location, setLocation] = useState("");

    const confirmLocation = (event) => {
        event.preventDefault();
        if (location !== '') {
          axios
            .post("http://localhost:8000/location", {
              location: location,
            })
            .then(function (response) {
              console.log(response.data);
              localStorage.setItem('location', response.data.name)
              localStorage.setItem('location_id', response.data.location_id)
              navigate("/home")
            })
            .catch(function (error) {
              console.log(error);
            });
        }else {
            alert('add a location')
        }
      };

    const handleInputLocation = (event) => {
        setLocation(event.target.value)
    }
  return (
    <div className="w-full h-screen text-2xl bg-[yellow]">
        <div className='flex pt-5 pl-5'>
            <div>
            <img 
            src='https://d1csarkz8obe9u.cloudfront.net/posterpreviews/beautiful-mcdonald%27s-logo-design-template-79ecda437387a6cd29e212e10b95e83b_screen.jpg?ts=1668146898' 
            alt=''
            className='w-16'
            />
            </div>
            <div>
            <p className='pt-4 pl-4'>Mcdelivery</p>

            </div>
        
        </div>
        <div className='h-full bg-white text-center'>
            <form onSubmit={confirmLocation} className='pt-[15%]'>
                <div>
                    <input
                        className='border-2 text-xl w-96'
                        type='text'
                        placeholder='Search for your address here'
                        onChange={handleInputLocation}
                    />
                </div>
                <div className='pt-11'>
                    <button
                        type="submit">
                        Confirm
                    </button>
                </div>
            </form>
            
        </div>

    </div>
  )
}

export default Location