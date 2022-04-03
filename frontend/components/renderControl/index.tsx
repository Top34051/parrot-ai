import tw from "twin.macro";
import { RecorderControlsProps } from "../../types/recorder";
import { formatMinutes, formatSeconds } from "../../utils/format";
import Buttons from "../buttons";

export default function RecorderControls({
  recorderState,
  handlers,
}: RecorderControlsProps) {

  const { recordingMinutes, recordingSeconds, initRecording } = recorderState;
  const { startRecording, saveRecording } = handlers;
  
  return (
    <div tw="flex flex-col justify-center items-center">
  
      {initRecording ? (
        <button
          className="start-button"
          title="Save recording"
          disabled={recordingSeconds === 0}
          onClick={saveRecording}
        >
          <Buttons.Button buttonType="stop-record" size="normal" />
        </button>
      ) : (
        <button
          className="start-button"
          title="Start recording"
          onClick={startRecording}
        >
          <Buttons.Button buttonType="start-record" size="normal" />
        </button>
      )}

      <div tw="flex justify-center">
        {initRecording && <div className="recording-indicator"></div>}
        <div>{formatMinutes(recordingMinutes)}</div>
        <div>:</div>
        <div>{formatSeconds(recordingSeconds)}</div>
      </div>
      
    </div>
  );
}
