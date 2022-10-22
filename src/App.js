import React, { useState } from "react";
import { motion } from "framer-motion"
import logo from "./Assets/images/logo.svg"
import paper from "./Assets/images/icon-paper.svg"
import rock from "./Assets/images/icon-rock.svg"
import scissors from "./Assets/images/icon-scissors.svg"
import rulesimage from "./Assets/images/image-rules.svg"
import close from "./Assets/images/icon-close.svg"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [AISellect, SetAISellect] = useState("")
  const [select, Setselect] = useState(false)
  const [selected, SetSelected] = useState("")
  const [score, SetScore] = useState(0)
  const [rules, SetRules] = useState(false)
  const results = ["paper","rock","scissors"]

  const losenotify = () => {
    toast.error('You lost 😭', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  const winnotify = () => {
    toast.success('You Won 😉', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  function SelectPlayer(playerselected) {
    let airesult = Math.round(Math.random() * 2)
    SetAISellect(results[airesult]);
    SetSelected(playerselected)
  }
  
  function submit() {
      if(AISellect === selected && AISellect.length > 0 && selected.length > 0) {
        Setselect(false)
        SetScore(score+1)
        SetAISellect("")
        SetSelected("")
        winnotify()
      } else {
        losenotify()
        Setselect(true)
      }
  }

  function restartGame() {
    SetAISellect("")
    SetSelected("")
    SetScore(0)
    setTimeout(() => {
      Setselect(false)
    }, 500  )
  }

  return (
    <>
    <div className={`h-screen flex flex-col items-center ${rules ? "justify-center":""} custom-bg`}>
      {/* Header */}
      {!rules &&
      <>
        <div className="w-[600px] p-5 h-[150px] flex flex-row justify-between border-2 border-[#606e85] rounded-lg mt-7">
        <img src={logo}/>
        <div className="w-[150px] h-[100%] bg-white rounded-lg flex flex-col items-center justify-center">
          <h1 className="font-[600] text-[#3b4363] text-lg">Score</h1>
          <h1 className="font-[700] text-[#3b4363] text-5xl">{score}</h1>
        </div>
      </div>
      {/* Content */}
        <div className={`w-[700px] bg-no-repeat ${select ? "hidden":""} bg-center ${!select ? "bg-[url('./Assets/images/bg-triangle.svg')]":""} h-[600px] flex flex-col items-center justify-center mt-10`}>
          {!select &&
          <>
          <div className={`w-[60%] h-[15%] flex flex-row justify-between`}>
          <div className="h-[175px] w-[175px] border-[15px] border-[#4865f4] rounded-full flex items-center justify-center bg-white cursor-pointer" onMouseOver={() => SelectPlayer(results[0])} onClick={() => submit()}>
            <img src={paper} alt="paper" className="h-[75px]"/>
          </div>
          <div className="h-[175px] w-[175px] border-[15px] border-[#ec9e0e] rounded-full flex items-center justify-center bg-white cursor-pointer" onMouseOver={() => SelectPlayer(results[2])} onClick={() => submit()}>
            <img src={scissors} alt="scissors" className="h-[75px]"/>
          </div>
        </div>
        <div className="w-[100%] h-[50%] flex items-center justify-center">
          <div className="h-[175px] w-[175px] mt-[125px] border-[15px] border-[#dc2e4e] rounded-full flex items-center justify-center bg-white cursor-pointer" onMouseOver={() => SelectPlayer(results[1])} onClick={() => submit()}>
            <img src={rock} alt="rock" className="h-[75px]"/>
          </div>
        </div>
        </>
        }
        </div>
        {/* Footer */}
        <div className="w-[98%] h-[150px] flex items-center justify-end">
          <h1 className={`text-white w-[125px] h-[40px] rounded-lg items-center justify-center border-2 flex cursor-pointer border-white ${select ? "hidden":""} font-[600] text-xl`} onClick={() => {SetRules(true);}}>Rules</h1>
        </div>
        </>
        }
        {rules &&
        <>
          <div className={`w-[350px] h-[270px] flex flex-col items-center`}>
            <div className="w-[100%] flex items-start justify-end">
              <img src={close} className="fill-white p-2 bg-black/20 rounded-full hover:rotate-180 transition-all duration-1000 cursor-pointer" onClick={() => SetRules(false)}/>
            </div>
            <img src={rulesimage} className="w-[304px] h-[270px]"/>
          </div>
        </>
        }
        {select &&
        <>
          {/* Results Screen */}
          <div className="w-[350px] h-[40%] flex flex-col items-center justify-center">
            <h1 className="text-white font-bold text-[50px]">Lose</h1>
            <h1 className="text-white font-bold text-[40px]">Score: {score}</h1>
            <button className="bg-green-800 text-white p-5 mt-10 rounded-xl hover:scale-95 transition-all duration-300" onClick={() => restartGame()}>Restart Game</button>
          </div>
        </> 
        }
    </div>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    </>
  );
}

export default App;
