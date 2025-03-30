import { Col, message, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllExams } from "../../../apicalls/exams";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";
function Home() {
  const [exams, setExams] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const getExams = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllExams();
      if (response.success) {
        setExams(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  const formatTime = (secondsLeft) => {
    const hours = Math.floor(secondsLeft / 3600);
    const minutes = Math.floor((secondsLeft % 3600) / 60);
  
    if (hours >= 1) {
      return `${hours}:${minutes.toString().padStart(2, "0")} hr`;
    } else {
      return `${minutes} min`;
    }
  };

  return (
    user && (
      <div>
        <PageTitle title={`Hi ${user.name}, Welcome to Graduate Mentors`} />
        <div className="divider"></div>
        <Row gutter={[16, 16]} align="stretch" style={{paddingLeft: "15px",width: "99%"}}>
          {exams.map((exam) => (
            <Col xs={24} sm={12} md={12} lg={8} key={exam._id}>
              <div className="card-lg flex flex-col gap-1 p-2">
                <h1 className="responsive-text font-semibold">{exam?.name}</h1>

                <h1 className="text-md">Subject : {exam.subject}</h1>

                <h1 className="text-md">Total Marks : {exam.totalMarks}</h1>
                {/* <h1 className="text-md">Passing Marks : {exam.passingMarks}</h1> */}
                <h1 className="text-md">Duration : {formatTime(exam.duration)}</h1>

                <button
                  className="primary-outlined-btn"
                  onClick={() => navigate(`/user/write-exam/${exam._id}`)}
                >
                  Start Exam
                </button>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    )
  );
}

export default Home;
