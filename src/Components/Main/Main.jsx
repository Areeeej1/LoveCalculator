import React,{useState } from 'react'
import  axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import "./Main.css"
import Modal from 'react-modal';
const customStyles={
    content:{
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
     
      transform: 'translate(-50%, -50%)',
      width:'35%',
      color:"red",
      backgroundColor:"pink"
  
    },
    

  };
  Modal.setAppElement('#root');
const Main = () => {
    
    const [firstName,setFirstName]=useState("");
    const [secondName,setSecondName]=useState("");
    const [open, setOpen] = useState(false);
    const [errMessage, setErrorMessage] = useState('');
    const [result,setResult]=useState('');
    const [showResult,setShowResult]=useState(false);
    const closeModal=()=>{
        setShowResult(false);
        setResult('');
      }
      const handleClose=()=>{
        setOpen(false)
      }
    const test=(e)=>{
  
        e.preventDefault();
        if(firstName.trim()==="" || secondName.trim()==="")
        {
         if( firstName.trim()==="")
         { 
            setErrorMessage("Name1 is Required")
        }
         else
         {
            setErrorMessage("Name2 is Required")
        }
          setOpen(true);
          
        }
        else{
            axios.get(`https://love-calculator.p.rapidapi.com/getPercentage?sname=${secondName}&fname=${firstName}`,
              {headers: {
                  'X-RapidAPI-Key': '46193b98dcmsh28ff4ec40fd3c12p1f983djsn4535926ad215',
                  'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com'
              }
             
          }
              ).then(response=>{
                
                  setResult(response.data)
                  setShowResult(true);
                  
              })
                .catch(error=>{
                    setResult(error.message);
                    
                })
            }
      

    }
  return (
    <>
   
    <div className='middleDiv'>
    <Snackbar
          style={{ marginTop:"7%", maxWidth:"min-content"}}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={errMessage}
        
        anchorOrigin={{vertical:'top',
        horizontal: 'right'}}
     
      />
        <div className="firstText">
       Name 1:   <input type="text" name="fname" placeholder="Your Name" onChange={(e)=>{setFirstName(e.target.value)}} ></input>
        </div>
        <div className="secondText">
        Name 2:  <input type="text" name="sname" placeholder="Lover Name" onChange={(e)=>{setSecondName(e.target.value)}}></input>
        </div>
        
            
            <button onClick={(e)=>test(e)}>Test</button>
       
           
    </div>
    <Modal
     isOpen={showResult}
     onRequestClose={closeModal}
     contentLabel="Result Modal"
     style={customStyles}
   >
      <div className='result'><span>Your Love Percentage is: <b>{result?.percentage
}%</b> </span><br></br>
      <span> { result?.result}</span>
       </div>
   </Modal>
    </>
  )
}

export default Main