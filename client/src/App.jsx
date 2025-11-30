import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Messages from "./pages/Messages";
import ChatBox from "./pages/ChatBox";
import Connections from "./pages/Connections";
import Discover from "./pages/Discover";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import Layout from "./pages/Layout";

import { useUser, useAuth } from "@clerk/clerk-react";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "./Features/user/userSlice";
import { fetchConnections } from "./Features/connections/connectonsSlice";
import { addMessage } from "./Features/messages/messagesSlice";
import Notifications from "./Components/Notifications";

const App = () => {

  const { user } = useUser();
  const { getToken } = useAuth();

  const { pathname } = useLocation();
  const pathnameRef = useRef(pathname);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if(user){
        const token = await getToken();
        dispatch(fetchUser(token));
        dispatch(fetchConnections(token));
      }
    }
    fetchData();
  }, [user, getToken, dispatch]);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    if(user){
      const eventSource = new EventSource(import.meta.env.VITE_BASEURL + "/api/message/" + user.id);

      eventSource.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          // handle only object messages (ignore pings like "connected")
          if (typeof parsed !== "object" || parsed === null) return;

          // ensure we have the expected shape
          if (!parsed.from_user_id || !parsed.from_user_id._id) return;

          if (pathnameRef.current === ("/messages/" + parsed.from_user_id._id)) {
            dispatch(addMessage(parsed));
          } else {
            toast.custom((t) => (
              <Notifications t={t} message={parsed} />
            ), { position: "bottom-right" });
          }
        } catch (err) {
          // ignore non-JSON messages and safely bail out
          // console.warn('SSE parse error / non-json message', err);
          return;
        }
      }
      return () => {
        eventSource.close();
      }
    }
  }, [user, dispatch]);

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={!user ? <Login /> : <Layout />}>
          <Route index element={<Feed />} />
          <Route path="messages" element={<Messages />} />
          <Route path="messages/:userId" element={<ChatBox />} />
          <Route path="connections" element={<Connections />} />
          <Route path="discover" element={<Discover />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:profileId" element={<Profile />} />
          <Route path="create-post" element={<CreatePost />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
