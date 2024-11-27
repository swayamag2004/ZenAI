import './chatlist.css'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

const ChatList = () => {

    const { isPending, error, data } = useQuery({
      queryKey: ["userChats"],
      queryFn: () =>
        fetch(`${import.meta.env.VITE_API_URL}/api/userchats`,{
          credentials:"include",
        }).then((res) =>
          res.json()),
    });
  return (
    <div className='chatList'>
      
      <span className='title'>DASHBOARD</span>
     <Link to="/dashboard">Create a new Chat</Link>
     <Link to="/">Explore LAMA AI</Link>
     <Link to="/">Contact</Link>

     <hr />
     <span className='title'>RECENT CHAST</span>
     <div className="list">
       { isPending
       ? "Loading..."
       :error
       ? "something went wrong"
       :data?.map((chat)=>(
        <Link to={`/dashboard/chats/${chat._id}`} key={chat._id} >
          {chat.title}      
          </Link>
        // console.log(data[0].chats)
       ))
       }
     </div>
     <hr />

     <div className="upgrade">
      <img src="/logo.png" alt="" />
      <div className="texts">
        <span>upgrade to Zen AI pro and </span>
        <span>Get access to all premium features</span>
      </div>
     </div>
    </div>
  );
};

export default ChatList;
