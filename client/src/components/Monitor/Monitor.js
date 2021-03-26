import React, { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import SidebarTemplate from '../common/SidebarTemplate/SidebarTemplate';
import axios from 'axios';
import Date from "../../utils/dateUtil";
const MODEL_URL = process.env.PUBLIC_URL + '/models'
const displaySize = {
  height: 600,
  width: 600
}

const Monitor = (props) => {
  const [initializing, setInitializing] = useState(false)
  const [state, _setState] = useState({ recordings: [] })
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const loadModels = async () => {
      getDetails();
      setInitializing(true)
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(startVideo)
    }
    loadModels();
  }, [])

  const getDetails = () => {
    axios
      .get(`/api/patients/${props.match.params.patient_id}`)
      .then((res) => {
        // console.log(Date(res.data.recordings[0].time))
        _setState(res.data);
      })
  }

  const startVideo = () => {
    var constraints = { audio: false, video: { ...displaySize } };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        videoRef.current.srcObject = stream
        videoRef.current.onloadedmetadata = function (e) {
          videoRef.current.play();
        };
      })
      .catch(function (err) {
        console.log(err.name + ": " + err.message);
      });
  }

  const findMax = (obj) => {
    let expression = Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b);
    updateRecordings([...state.recordings, { expression } ]);
  }

  const updateRecordings = (recordings) => {
    recordings = recordings.sort((a, b) => new Date(b.date) - new Date(a.date));
    recordings.reverse();
    let temp = state;
    temp.recordings = [...recordings];
    _setState(temp);
    console.log(state.recordings.length)
  }

  const updateApi = () => {
    axios
    .put(`/api/patients/${props.match.params.patient_id}`, { ...state })
    .then((res) => {
      console.log("api", res.data.recordings)
    })
  }

  const handleVideoOnPlay = () => {
    setInterval(updateApi, 30000);
    setInterval(async () => {
      if (initializing) {
        setInitializing(false);
      }
      canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
      faceapi.matchDimensions(canvasRef.current, displaySize)
      const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions()
      const resizedDetections = faceapi.resizeResults(detections, displaySize)
      canvasRef.current.getContext('2d').clearRect(0, 0, displaySize.width, displaySize.height);
      faceapi.draw.drawDetections(canvasRef.current, resizedDetections)
      faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections)
      if (resizedDetections.length > 0) {
        findMax(resizedDetections[0].expressions)
      }
    }, 3000)
  }


  return (
    <SidebarTemplate>
      <div className="Monitor" >
        <span>{initializing ? 'Loading' : 'Ready'}</span>
        <div className="video_out" id="video_out">
          <video ref={videoRef}
            autoPlay
            muted
            height={displaySize.height}
            width={displaySize.width}
            onPlaying={() => handleVideoOnPlay()}
          />
          <canvas ref={canvasRef} />
        </div>
      </div>
    </SidebarTemplate>
  );
}

export default Monitor;
