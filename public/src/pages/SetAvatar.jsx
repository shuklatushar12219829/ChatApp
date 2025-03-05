import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loader from "../assets/loader.gif";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
export default function SetAvatar() {
  const api = "https://api.dicebear.com/7.x/adventurer/svg?seed="; 
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  useEffect(() => {
    if(!localStorage.getItem('chat-app-user')){
      navigate('/login');
    }},[]);
  const setProfilePicture = async () => {
    const storedUser = localStorage.getItem("chat-app-user");
  
    if (!storedUser) {
      toast.error("User not found. Please log in again.", { position: "bottom-right" });
      return;
    }
  
    const user = JSON.parse(storedUser);
  
    if (!user._id) {
      toast.error("User ID is missing. Please log in again.", { position: "bottom-right" });
      return;
    }
  
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", { position: "bottom-right" });
      return;
    }
  
    try {
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });
  
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error while setting profile picture", { position: "bottom-right" });
      }
    } catch (error) {
      toast.error("Server error. Please try again later.", { position: "bottom-right" });
      console.error("Error setting avatar:", error);
    }
  };
  
  
  useEffect(() => {
    const fetchAvatars = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const imageUrl = `${api}${Math.floor(Math.random() * 1000000)}`;
        data.push(imageUrl);
      }
      setAvatars(data);
      setIsLoading(false);
    };
    fetchAvatars();
  }, []);

  return (
    <>
    {
      isLoading ? (<Container> 
        <img src={loader} alt="loader" className="loader" />
      </Container>):
      (
      <Container>
        <div className="title-container">
          <h1>Pick an avatar as your profile picture</h1>
        </div>
        <div className="avatars">
          {avatars.map((avatar, index) => (
            <div
              key={index}
              className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
              onClick={() => setSelectedAvatar(index)}
            >
              <img src={avatar} alt="avatar" />
            </div>
          ))}
        </div>
        <button className="submit-btn" onClick={setProfilePicture}>Set as Profile Picture</button>
      </Container>
      )
    }
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
