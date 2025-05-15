import { Button } from "@/components/ui/button"
import { File, FileAudio, FileImage, FileText, FileTypeIcon, FileVideo, Trash2 } from "lucide-react"

enum FileType {
  IMAGE = "image",
  VIDEO = "video",
  AUDIO = "audio",
  DOCUMENT = "document",
  PDF = "pdf",
  OTHER = "other",
}

const ImageColor = {
  bgColor: "bg-purple-100",
  iconColor: "text-purple-700",
}

const VideoColor = {
  bgColor: "bg-green-100",
  iconColor: "text-green-700",
}

const AudioColor = {
  bgColor: "bg-yellow-100",
  iconColor: "text-yellow-700",
}

const DocumentColor = {
  bgColor: "bg-blue-100",
  iconColor: "text-blue-700",
} 

const PdfColor = {
  bgColor: "bg-red-100",
  iconColor: "text-red-700",
}

const OtherColor = {
  bgColor: "bg-gray-200",
  iconColor: "text-gray-700",
}

const getFileIconAndColor = (file: File) => {
  if (file.type.includes(FileType.IMAGE)) {
    return {
      icon: <FileImage size={20} strokeWidth={2} className={ImageColor.iconColor}/>,
      color: ImageColor,
    }
  }

  if (file.type.includes(FileType.VIDEO)) {
    return {
      icon: <FileVideo size={20} strokeWidth={2} className={VideoColor.iconColor}/>,
      color: VideoColor,
    }
  }

  if (file.type.includes(FileType.AUDIO)) {
    return {
      icon: <FileAudio size={20} strokeWidth={2} className={AudioColor.iconColor}/>,
      color: AudioColor,
    }
  }

  if (file.type.includes(FileType.PDF)) {
    return {
      icon: <FileText size={20} strokeWidth={2} className={PdfColor.iconColor}/>,
      color: PdfColor,
    }
  } 

  if (file.type.includes(FileType.DOCUMENT)) {
    return {
      icon: <FileTypeIcon size={20} strokeWidth={2} className={DocumentColor.iconColor}/>,
      color: DocumentColor,
    }
  }

  return {
    icon: <File size={20} strokeWidth={2} className={OtherColor.iconColor}/>,
    color: OtherColor,
  }
}

export const FileUploaded = ({ file, onRemove }: { file: File, onRemove: () => void }) => {
  const { icon, color } = getFileIconAndColor(file);

  return (
    <div 
      className="flex items-center justify-between gap-2 border py-1 px-4 rounded"
      onClick={ev => ev.stopPropagation()}
    >
      <div className={`${color.bgColor} rounded p-1.5 flex gap-2 items-center`}>
        {icon}
        <p className="text-sm font-bold">{file.name}</p>
      </div>
      <Button variant="destructive" size="icon" onClick={onRemove}>
        <Trash2 size={16} strokeWidth={2}/>
      </Button>
    </div>
  )
}
