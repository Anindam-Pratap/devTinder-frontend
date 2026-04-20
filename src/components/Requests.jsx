import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import UserCard from './UserCard';
import Shimmer from './Shimmer';

const Requests = () => {
  const [requests, setRequests] = useState(null); // Initialize as null to handle loading state
  const [requestReviewAlert, setRequestReviewAlert] = useState(false);

  const findRequests = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "user/requests",
        { withCredentials: true }
      );
      // Ensure we are setting an array even if data is missing
      setRequests(res?.data?.data || []);
    } catch (err) {
      console.error("Error fetching requests:", err);
      setRequests([]); // Fallback to empty array on error
    }
  };

  // 🔴 Reject
  const rejectRequest = async (id) => {
    try {
      await axios.post(
        BASE_URL + "request/review/rejected/" + id,
        {},
        { withCredentials: true }
      );
      setRequests((prev) => prev.filter((r) => r._id !== id));
      showToast();
    } catch (err) {
      console.error(err);
    }
  };

  // 🟢 Accept
  const acceptRequest = async (id) => {
    try {
      await axios.post(
        BASE_URL + "request/review/accepted/" + id,
        {},
        { withCredentials: true }
      );
      setRequests((prev) => prev.filter((r) => r._id !== id));
      showToast();
    } catch (err) {
      console.error(err);
    }
  };

  const showToast = () => {
    setRequestReviewAlert(true);
    setTimeout(() => setRequestReviewAlert(false), 5000);
  };

  useEffect(() => {
    findRequests();
  }, []);

  // 1. Loading State
  if (requests === null) {
    return <Shimmer />;
  }

  // 2. Empty State (Improved for Bright Purple Background)
  if (requests.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] px-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-12 rounded-3xl shadow-2xl text-center max-w-sm w-full">
          <div className="text-6xl mb-6 filter drop-shadow-lg">👋</div>
          <h2 className="text-3xl font-extrabold text-white mb-2 drop-shadow-md">
            Quiet in here!
          </h2>
          <p className="text-purple-100 text-lg opacity-90 leading-relaxed">
            You don't have any pending connection requests right now.
          </p>
          <button 
            onClick={findRequests}
            className="mt-6 btn btn-sm btn-outline border-white/50 text-white hover:bg-white/20"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  // 3. Data State
  return (
    <div className="flex flex-col items-center my-12 min-h-screen">
      <h1 className="text-white text-3xl font-bold mb-8 drop-shadow-lg">
        Connection Requests
      </h1>
      
      <div className="carousel carousel-center rounded-box max-w-md space-x-4 p-4">
        {requests.map((e) => (
          <div className="carousel-item" key={e.fromUserId?._id || e._id}>
            <UserCard
              user={e.fromUserId}
              firstButton="Reject"
              secondButton="Accept"
              onFirstClick={() => rejectRequest(e._id)}
              onSecondClick={() => acceptRequest(e._id)}
            />
          </div>
        ))}
      </div>

      {requestReviewAlert && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success shadow-lg border-none bg-green-500 text-white">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Action processed successfully!</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;