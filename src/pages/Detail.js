import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase'
import Tags from '../component/Tags'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import MostPopular from '../component/MostPopular'

const Detail = ({ setActive }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [tags,settags]=useState([]);
  const[blogs,setBlogs]=useState(null);


  
  useEffect(()=>{
   const getBlog=async()=>{
    const ref=collection(db,'blogs');
    const blogss=await getDocs(ref);
    setBlogs(blogss.docs.map((doc)=>(
        {id:doc.id,...doc.data()}
    ))
    )
   };
   getBlog();
  },[]);
  useEffect(() => {
    id && getBlogDetail();
  }, [id]);

  const getBlogDetail = async () => {
    const docref = doc(db, "blogs", id);
    const blogDetail = await getDoc(docref);
    setBlog(blogDetail.data());
    settags(blogDetail.data().tags);
    setActive(null);
  }
  
  return (
    <div className='single'>
      <div className='blog-title-box' style={{ backgroundImage: `url('${blog?.imgUrl}')` }}>
        <div className='overlay'></div>
        <div className='blog-title'>
          <span>{blog?.timestamp.toDate().toDateString()}</span>
          <h2>{blog?.title}</h2>
        </div>
      </div>
      <div className='container-fluid pb-4pt-4 padding blog-single-content'>
        <div className='container padding'>
          <div className='row mx-0'>
            <div className='col-md-8'>
              <span className='meta-info text-start' >
                By <p className='author'>{blog?.author}</p> -&nbsp;
                {blog?.timestamp.toDate().toDateString()}
              </span>
              <p className='text-start'>{blog?.description}</p>

            </div>
            <div className='col-md-3'>
           <Tags tags={tags}/>
               <MostPopular blogs={blogs}/>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail