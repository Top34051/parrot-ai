import { RecorderControlsProps } from "../../types/recorder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faTimes,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { formatMinutes, formatSeconds } from "../../utils/format";

export default function RecorderControls({
  recorderState,
  handlers,
}: RecorderControlsProps) {
  const { recordingMinutes, recordingSeconds, initRecording } = recorderState;
  const { startRecording, saveRecording, cancelRecording } = handlers;
  return (
    <div tw="flex space-x-2">
      <div>
        {initRecording && <div className="recording-indicator"></div>}
        <span>{formatMinutes(recordingMinutes)}</span>
        <span>:</span>
        <span>{formatSeconds(recordingSeconds)}</span>
      </div>
      {initRecording && (
        <div className="cancel-button-container">
          <button
            className="cancel-button"
            title="Cancel recording"
            onClick={cancelRecording}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      )}
      <div>
        {initRecording ? (
          <button
            className="start-button"
            title="Save recording"
            disabled={recordingSeconds === 0}
            onClick={saveRecording}
          >
            <FontAwesomeIcon icon={faSave} size="2x" />
          </button>
        ) : (
          <button
            className="start-button"
            title="Start recording"
            onClick={startRecording}
          >
            <FontAwesomeIcon icon={faMicrophone} size="2x" />
          </button>
        )}
      </div>
    </div>
  );
}
