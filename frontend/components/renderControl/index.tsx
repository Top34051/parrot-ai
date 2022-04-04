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
    <div tw="flex justify-center items-center space-x-3">
  
      {initRecording ? (
        <div
          className="start-button"
          title="Save recording"
          tw="flex"
        >
          <Buttons.Button buttonType="stop-record" size="normal" onClick={saveRecording}/>
        </div>
      ) : (
        <div
          className="start-button"
          title="Start recording"
          tw="flex"
        >
          <Buttons.Button buttonType="start-record" size="normal" onClick={startRecording}/>
        </div>
      )}

      <div tw="flex justify-center rounded-lg w-16 bg-gray-300 p-1 font-mono">
        {initRecording && <div className="recording-indicator"></div>}
        <div>{formatMinutes(recordingMinutes)}</div>
        <div>:</div>
        <div>{formatSeconds(recordingSeconds)}</div>
      </div>
      
    </div>
  );
}
