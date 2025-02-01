import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed, removeFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import { SwipeableCard } from "./SwipeableCard";
import { UserPlus, UserX } from "lucide-react";

export default function Feed() {
  const feed = useSelector((store) => store.feed);
  console.log(feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed?.length) return;
    console.log("lll");
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };

  useEffect(() => {
    if (!feed.length) {
      getFeed();
    }
  }, [feed.length]);

  const handleSwipe = async (direction) => {
    try {
      const status = direction === "right" ? "interested" : "ignored";
      console.log(status);

      await axios.post(
        BASE_URL + `/request/send/${status}/${feed[0]._id}`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeFeed(feed[0]._id));
    } catch (err) {
      console.error("Error handling swipe:", err);
    }
  };

  if (!feed?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No more profiles to show!
          </h2>
          <p className="text-gray-600">Check back later for more matches</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <div className="max-w-md mx-auto pt-10  px-4">
        {/* Card Stack */}
        <div className="relative h-[500px] w-full">
          {/* Stack of cards */}
          {feed.map((user, index) => (
            <div
              key={user._id}
              className="absolute w-full"
              style={{
                zIndex: feed.length - index,
              }}
            >
              <SwipeableCard
                user={user}
                onSwipe={index === 0 ? handleSwipe : () => {}}
              />
            </div>
          ))}
        </div>

        {/* Action Buttons */}
      </div>
    </div>
  );
}
