import React, { useState } from 'react'

function Register() {

    useState

  return (
    <section>
        <form>
            <div>
                <span>username :---</span>
                <input type="text" placeholder='username' />
            </div>
            <div>
                <span>First Name :---</span>
                <input type="text" placeholder='First Name' />
            </div>
            <div>
                <span>Last Name :---</span>
                <input type="text" placeholder='Last Name' />
            </div>
            <div>
                <span>Email :---</span>
                <input type="text" placeholder='Email' />  
            </div>
            <div>
                <span>Password :---</span>
                <input type="text" placeholder='Password' />  
            </div>
            <button type='submit'>Register</button>
        </form>
    </section>
  )
}

export default Register