import './HomePage.css'
import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

const HomePage = () => {
    const {image,setImage}=useState("human1");
    // const test= async() => {
    //   await fetch("http://localhost:3000/api/test",{
    //     credentials:"include",
    //   });
    // };

  return (
    <div className='homePage'>
        <img src="/orbital.png" alt="" className='orbital' />
       <div className="left">
        <h1>ZEN AI</h1>
        <h2>Supercharge your creativity and productivity</h2>
        <h3> An AI-powered conversational application built using a Generative Pre-trained Transformer (GPT) model. 
          It focuses on generating human-like responses based on user input, leveraging deep learning to understand and produce coherent
          , contextually relevant text. Such a project can handle a wide range of tasks, from answering questions and generating 
          creative content to aiding customer support and performing complex data analysis. </h3>
        <Link to="/dashboard">Get Started</Link>

       </div>
       
       <div className="right">
        <div className="imgContainer">
            <div className="bgContainer">
                <div className="bg">
 
                </div>
            </div>
            <img src="/bot.png" alt="" className='bot' />
            <div className="chat">
            <img src={image==="human1"?"/human1.jpeg":image==="x"?"/human2.jpeg":"/bot.png"} alt="" />
                <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        "human:We produce food for Mice",
        2000,
        // wait 1s before replacing "Mice" with "Hamsters"
        "bot:We produce food for Hamsters",
        2000,
     
        "human:We produce food for Guinea Pigs",
        2000,
       
        'bot:We produce food for Chinchillas',
        2000,
      
      ]}
      wrapper="span"
      cursor={true}
      repeat={Infinity}
      omitDeletionAnimation={true}
        /> 
            </div>
        </div>
       </div>
       <div className="terms">
        <img src="./logo.png" alt="" />
        <div className="links">
            <Link to="/" >Terms of Services</Link>
            <Link to="/">Privacy Policy</Link>
        </div>
       </div>
    </div>
  )
}

export default HomePage
