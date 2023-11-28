import React from 'react'

const Footer = () => {
  return (
    <footer className='container-fluid bg-dark text-white ' style={{height:"300px"}}>
    <div className='container text-white '>
    <div className='row '>
   <div className='col mt-4'>
    <h3> Help</h3>
    <h5 className='text-muted'  style={{marginTop:'20px'}}>Help Center</h5>
    <h5 className='text-muted'  >Help Forum</h5>
    <h5 className='text-muted'  >Vidio Tutorial</h5>
   </div>
   <div className='col mt-4'>
    <h3> Community</h3>
    <h5 className='text-muted'  style={{marginTop:'20px'}}>Blogger Buzz</h5>
    </div>
   <div className='col mt-4'>
    <h3> Devlopers</h3>
    <h5 className='text-muted'  style={{marginTop:'20px'}}>Blogger Api</h5>
    <h5 className='text-muted'  >Devloper Forum</h5>
    
   </div>
   </div>
       

    </div>
    <hr></hr>
    <div className="footer-copyright text-center py-3">© 2020 Copyright:
        <a href="https://mdbootstrap.com/"> MDBootstrap.com</a>
    </div>
</footer>
  )
}

export default Footer