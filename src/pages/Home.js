import { collection, deleteDoc, onSnapshot,doc, query, where, getDocs } from 'firebase/firestore';
import {useEffect,useState} from 'react';
import {db} from '../firebase'
import DisplayBlogs from '../component/DisplayBlogs';
import React from 'react';
import Spineer from '../component/Spineer';
import {toast} from 'react-toastify';
import Tags from '../component/Tags';
import MostPopular from '../component/MostPopular';
import Trending from '../component/Trending';
import Footer from '../component/Footer';


const Home = ({setActive,user}) => {
  const[blogs,setBlogs]=useState([]);
  const[loading,setLoading]=useState(true);
  const[tag,setTag]=useState([]);
  const[trendblogs,settrendBlogs]=useState([]);

  const getTrendingBlog=async()=>{
    const docRef=collection(db,"blogs");

    const ref_data=query(docRef,where("trending","==","yes"));
    const get_data=await getDocs(ref_data);
    let trendB=[];
    get_data.docs.map((item)=>{
        trendB.push({id:item.id,...item.data()});
    })
   settrendBlogs(trendB);
  }

  useEffect(()=>{
    getTrendingBlog();
     const  unsub= onSnapshot(collection(db,'blogs'),(snapshot)=>{
        let list=[];
        let ta=[];
        snapshot.docs.forEach((doc)=>{
            ta.push(...doc.get("tags"));
            list.push({id:doc.id,...doc.data()});
        })
       
        let unitag=[...new Set(ta)];
      
        setTag(unitag);
        setBlogs(list);
        setLoading(false);
        setActive('home');
     },(error)=>{
      console.log("error");
     })
     return() =>{
      getTrendingBlog();
      return  unsub();
     }
  },[]);
  if(loading)return <Spineer/>

  const handleDelete= async(id)=>{
    try{
      if(window.confirm('Are You Sure To Delete This Blog')){
        setLoading(true);
        await deleteDoc(doc(db,"blogs",id));
        toast.success('Blog Deleted Successfully');
        setLoading(false);
      }
    }
    catch{
      console.log("error");
    }
  }
  
  return (
  
    <div className='container-fluid'>
      <div className='container padding'>
        <div className='row mx-0'>
        
          <Trending blogs={trendblogs}/>
          
          <div className='col-md-8'>
           <DisplayBlogs blogs={blogs} user={user} handleDelete={handleDelete}/>
          </div>
          <div className='col-md-3'>
            <Tags tags={tag}/>
            <MostPopular  blogs={blogs}/>
            
          </div>

         </div>  
         
      </div>
      <Footer />
    </div>





  )
}

export default Home