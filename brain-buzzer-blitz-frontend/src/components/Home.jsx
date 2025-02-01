import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Carousel from "../img/carousel-1.jpg";
import Header from "./Header";
import axios from "axios";
import WebSocketComponent from "./WebSocketComponent";

const Home = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [user, setUser] = useState({});
  const userName = state?.userName;

  const [showNotification, setShowNotification] = useState(false);
  const [showCategories, setShowCategories] = useState(true);
  const [quizRequest, setQuizRequest] = useState({});
  const [streamData, setStreamData] = useState({});
  const [secretCode, setSecretCode] = useState();

  const onMessageReceived = (message) => {
    if (message["player1"] == userName) {
      setShowCategories(false);
      setTimeout(() => {
        setShowCategories(true);
      }, 20000);
      return;
    }
    setShowNotification(true);
    setQuizRequest(message);

    setTimeout(() => {
      setShowNotification(false);
    }, 20000);
  };

  const onGameJoined = async (message) => {
    console.log(message)
    message["userName"] = userName;
    navigate("/waiting", {replace:true, state:message});
  };

  useEffect(() => {
    if (!userName) navigate("/login", { replace: true });
    const fetchUser = async () => {
      const response = await axios.get(
        `http://localhost:8080/users/username/${userName}`
      );
      const data = await response["data"];
      console.log(data);
      setUser(data);
    };
    const fetchStreams = async () => {
      const response = await axios.get(
        `http://localhost:8080/questions/streams`
      );
      const data = await response["data"];
      setStreamData(data);
    };
    fetchStreams();
    fetchUser();
  }, []);

  
  const joinWithCode = () => {
    const join = async () => {
      const response = await axios.get(
        `http://localhost:8080/buzzers/join/${secretCode}/${userName}`
      );
      const data = await response["data"];
      console.log(data);
    };
    join();
  };


  return (
    <>
      {userName && (
        <WebSocketComponent
          userName={userName}
          onMessageReceived={onMessageReceived}
          onGameJoined={onGameJoined}
        />
      )}

      <Header userName={userName} />

        {/* user Details */}
        <div
          className="container-fluid page-header mb-5 p-0"
          style={{ backgroundImage: `url(${Carousel})` }}
        >
          <div className="container-fluid page-header-inner py-5">
            <div className="container text-center pb-5">
              <h1 className="display-3 text-white animated slideInDown">
                {user["name"]}
              </h1>
              <p className="text-white animated slideInDown">
                username: {user["username"]}
              </p>
              <h3 className="text-white animated slideInDown">
                {user["stream"]} {user["profession"]} from {user["institute"]} -{" "}
                {user["graduation_year"]} Batch{" "}
              </h3>
              <hr />
              <h2 className="text-white">Ratings: {user["ratings"]}</h2>
              <h2 className="text-white">Brain Coins: {user["brain_coins"]}</h2>
              <h2></h2>
            </div>
          </div>
        </div>

        {/* user Details */}
        
         {showNotification && (
           <Notification notification={quizRequest} userName={userName} />
         )}

      {showCategories && 
      <>
        <div className="container-xxl py-5">
            <div className="container">
                <div className="text-center wow fadeInUp" data-wow-delay="0.2s">
                    <h6 className="section-title text-center text-primary text-uppercase">
                        Start competing
                    </h6>
                    <h1 className="mb-2">
                        Explore Our <span className="text-primary text-uppercase">Streams</span>
                    </h1>
                    <div className="d-flex mx-auto w-75 border mb-5 py-4 px-5">
                      <input className="form-control py-2 w-70 text-center mx-auto" value={secretCode} onChange={(e) => setSecretCode(e.target.value)} placeholder="Enter your secret key here to join"></input>
                      <div className="mx-3"></div>
                      <button className="col-md-1 btn btn-primary w-25 text-center mx-auto" onClick={joinWithCode}>Join</button>
                    </div>
                </div>

                <div className="row g-4" id="txtHint">
                    {Object.entries(streamData).map(([stream, categories]) => (
                        <Category key={stream} stream={stream} categories={categories} userName={userName}/>
                    ))}
                </div>

            </div>
        </div>
      </>}

      {!showCategories && <>
        <h5 className="text-center">Wait for opponent users to join! You can start another buzzer round if no one joins in 20 seconds</h5>
      </>}

    </>
  );
};

const Notification = (props) => {
  const notification = props.notification;
  const userName = props.userName;

  const joinBuzzer = () => { 
    const secretCode = notification["secretCode"];
    const join = async () => {
      const response = await axios.get(
        `http://localhost:8080/buzzers/join/${secretCode}/${userName}`
      );
      const data = await response["data"];
      console.log(data);
    };
    join();
  };

  return (
    <>
      <div
        className="container-fluid booking pb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container">
          <div className="bg-white shadow" style={{ padding: 35 + "px" }}>
            <div className="row g-2">
              <div className="col-md-10">
                <div className="row g-2">
                  <div className="col-md-12">
                    <h6>
                      User {notification["player1"]}{" "}
                      <b className="text-muted">
                        ({notification["player1Profession"]} at{" "}
                        {notification["player1Institute"]})
                      </b>{" "}
                      with ratings
                      <b> {notification["player1Ratings"]}</b> has started a
                      buzzer round with
                      <span> {notification["count"]} questions</span> on topic
                      <b> {notification["category"]}</b> (
                      <span>{notification["difficulty"]} level</span>)
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <button className="btn btn-primary w-100" onClick={joinBuzzer}>
                  Click here to join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


const Category = (props) => {
  const [difficulty, setDifficulty] = useState('Easy');
  const [count, setCount] = useState(10);
  const [category, setCategory] = useState('%25');
  const stream = props.stream;
  const categories = props.categories;
  const userName = props.userName;
  const [secretCode, setSecretCode] = useState('');

  const createBuzzer = async()=>{
    const response = await axios.get(`http://localhost:8080/buzzers/create/${userName}?categoryLike=${category}&difficulty=${difficulty}&count=${count}&stream=${stream}`);
    const data = await response["data"];
    return data;
  }

  const StrangerBuzzer = async()=>{
    const data = await createBuzzer();
    await axios.get(`http://localhost:8080/buzzers/share/${data["id"]}`);
  }

  const FriendBuzzer = async()=>{
    const data = await createBuzzer();
    setSecretCode(data['secretCode']);
    console.log(secretCode);
  }

    return(
        <>
            <div className="col-lg-4 col-md-6 bg-grey wow fadeInUp" data-wow-delay="0.1s">
                <div className="room-item shadow rounded overflow-hidden">
                    <h2 className="text-center mx-auto my-auto mt-4 border py-1" style={{height: 100 + 'px'}}>{stream}</h2>
                    <hr/>
                    <div className="mt-3 w-75 text-center mx-auto">
                        <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="%25">Mixed</option>

                            {Object.entries(categories).map(([xx, category], index) => (
                              <option value={category}>{category}</option>
                            ))}

                        </select>
                        <div className="mt-2 d-flex justify-content-between">
                            <select className="form-select w-50" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} id="filterId">
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                            <div className="mx-1"></div>
                            <input type="number" className="form-control w-50" value={count} onChange={(e) => setCount(e.target.value)} id="questionCount" placeholder="No. of questions" min={5} max={30}/>
                        </div>
                    </div>
                    
                    <div className="d-flex mx-5 mt-5 mb-3 justify-content-between">
                        <a className="btn btn-sm btn-primary rounded py-2 px-4">
                            Practise
                        </a>
                        <a className="btn btn-sm btn-secondary rounded py-2 px-4" onClick={StrangerBuzzer}>
                            Compete Stranger
                        </a>
                    </div>
                    <div className="w-200 px-5 mb-3 text-center">
                      {(secretCode) ? 
                      <>
                        <input className="form-control" disabled value={secretCode}></input>
                        <small className="text-muted">Copy the code and share with ur buddy</small>
                      </>
                      : 
                        <a className="btn btn-sm w-100 btn-info rounded py-2 px-5" onClick={FriendBuzzer}>
                            Battle with your buddy
                        </a>
                      }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
