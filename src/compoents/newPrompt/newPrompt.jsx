import { IKImage } from 'imagekitio-react';
import './newPrompt.css'
import Upload from '../upload/upload.jsx'
import { useEffect, useRef, useState } from 'react'
import model from '../../llb/gemini';
import Markdown from "react-markdown"
import { useMutation, useQueryClient } from '@tanstack/react-query';



const NewPrompt = ({data}) => {
    const [question,setQuestion]=useState("");
    const [answer,setAnswer]=useState("");
  const [img,setImg]=useState({
    isLoading:false,
    error:"",
    dbData:{},
    aiData:{},
  });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
    generationConfig:{
  
    },
  });

    const endRef=useRef(null);
    const formRef=useRef(null);
    useEffect(() =>{
      endRef.current.scrollIntoView({behavior: "smooth"});
    },[data,question,answer,img.dbData]);
    const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: async ()=>{
        // console.log({data,lololo: data.data._id});
          return   fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`,{
            method:"PUT",
            credentials:"include",
            headers:{
              "Content-Type":"application/json",
            },
            body:JSON.stringify({
              question:question.length?question:undefined,
              answer,
              img:img.dbData?.filePath || undefined,
            }),
          }).then((res)=>res.json()); 
      },
      onSuccess: (id) => {
        // Invalidate and refetch
        queryClient
        .invalidateQueries({ queryKey: ["chat",data._id] })
        .then(()=>{
          formRef.current.reset()
          setQuestion("");
          setAnswer("");
          setImg({
            isLoading:false,
            error:"",
            dbData:{},
            aiData:{},
          });
        });
      },
      onError:(err)=>{
        console.log(err);
      },
    });

    const add = async (text,isInitial)=>
    {
      console.log({xx12:text})
      console.log(text)
     if(!isInitial) setQuestion(text);
      try{
            const result = await chat.sendMessageStream(
            Object.entries(img.aiData).length?[img.aiData,text]:[text]);
            let accumulatedText="";
            for await (const chunk of result.stream)
             {
            const chunkText = chunk.text();
            accumulatedText+=chunkText;
            setAnswer(accumulatedText);
              }
            mutation.mutate()
          }catch(err){
             console.log(err);
          }

    };


    const handleSubmit =async (e)=>{
      e.preventDefault();
      const text=e.target.text.value;
      console.log({november:text})
      if(!text)return;
      add(text,false);


    };
    const hasrun=useRef(false);
    useEffect(()=>{
      if(!hasrun.current){
        if(data?.history?.length===1){
          add(data.history[0].parts[0].text,true);
        }
      }
      hasrun.current=true;
      
    },[]);
  return (
        <>
        {img.isLoading &&    <div className="">Loading...</div>}
        {img.dbData?.filePath && (
          <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width="280"
          height="300"
          transformation={[{width:280}]}
          />
        )}
        {question && <div className='message user'>{question}</div>}
        {answer && (
          <div className='message'>
          <Markdown>{answer}</Markdown>
          </div>
        )}
        <div className="endChat" ref={endRef}></div>
        <form className='newForm' onSubmit={handleSubmit} ref={formRef} >
         <Upload 
         setImg={setImg}
         />
          <input id='file' type="file" multiple={false} hidden />
          <input type="text" name='text' placeholder='Ask Anything...' />
          <button>
              <img src="/arrow.png" alt="" />
          </button>
      </form></>
    
  );

};

export default NewPrompt