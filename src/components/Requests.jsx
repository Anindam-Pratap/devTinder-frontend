import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../utils/constants'
import UserCard from './UserCard'
import Shimmer from './Shimmer'

const Requests = () => {
  const [requests, setRequests] = useState([])
  const [requestReviewAlert, setRequestReviewAlert] = useState(false)

  const findRequests = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "user/requests",
        { withCredentials: true }
      )
      console.log(res)
      setRequests(res?.data?.data)
    } catch (err) {
      console.error(err)
    }
  }

  // 🔴 Reject
  const rejectRequest = async (id) => {
    try {
      await axios.post(
        BASE_URL + "request/review/rejected/" + id,
        {},
        { withCredentials: true }
      )

      // remove from UI instantly
      setRequests((prev) => prev.filter((r) => r.fromUserId._id !== id))

      setRequestReviewAlert(true)
      setTimeout(() => setRequestReviewAlert(false), 5000)
    } catch (err) {
      console.error(err)
    }
  }

  // 🟢 Accept
  const acceptRequest = async (id) => {
    try {
      await axios.post(
        BASE_URL + "request/review/accepted/" + id,
        {},
        { withCredentials: true }
      )

      // remove from UI instantly
      setRequests((prev) => prev.filter((r) => r.fromUserId._id !== id))

      setRequestReviewAlert(true)
      setTimeout(() => setRequestReviewAlert(false), 5000)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    findRequests()
  }, [])

  return (
    (requests === null) ? <Shimmer /> :
      <div className='flex justify-center my-12'>
        <div className="carousel rounded-box w-96">
          {requests.map((e) => (
            <div className='carousel-item' key={e.fromUserId._id}>
              <UserCard
                user={e.fromUserId}
                firstButton="Reject"
                secondButton="Accept"
                onFirstClick={() => rejectRequest(e.fromUserId._id)}
                onSecondClick={() => acceptRequest(e.fromUserId._id)}
              />
            </div>
          ))}
        </div>

        {requestReviewAlert && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>Request Reviewed Successfully</span>
            </div>
          </div>
        )}
      </div>
  )
}

export default Requests