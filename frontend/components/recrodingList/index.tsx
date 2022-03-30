import useRecordingsList from "../../hooks/use-recordings-list";
import { RecordingsListProps } from "../../types/recorder";

export default function RecordingsList({ audio }: RecordingsListProps) {
  const { recordings, deleteAudio } = useRecordingsList(audio);
}
