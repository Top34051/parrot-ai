import useRecordingsList from "../../hooks/use-recordings-list";
import { RecordingsListProps } from "../../types/recorder";
import { Wave } from "@foobar404/wave";
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function RecordingsList({ audio }: RecordingsListProps) {
  const { recordings, deleteAudio } = useRecordingsList(audio);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const recording = recordings.length > 0 ? recordings[0] : null;
  useEffect(() => {
    if (audioRef.current && canvasRef.current) {
      let wave = new Wave(audioRef.current, canvasRef.current);
      wave.addAnimation(new wave.animations.Wave());
    }
  }, [recording]);

  return (
    <div>
      {recording ? (
        <>
          <h1>Your recordings</h1>
          <div>
            <div tw="flex space-x-2 flex-row">
              <audio controls src={recording.audio} ref={audioRef} />
              <div>
                <canvas ref={canvasRef}></canvas>
                <button onClick={() => deleteAudio(recording.key)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          {/* <FontAwesomeIcon
            icon={faExclamationCircle}
            size="2x"
            color="#f2ea02"
          /> */}
          <span>You don't have records</span>
        </div>
      )}
    </div>
  );
}
