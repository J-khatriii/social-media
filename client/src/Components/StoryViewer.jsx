import { BadgeCheck, X } from "lucide-react";
import { useState, useEffect } from "react";

const StoryViewer = ({viewStory, setViewStory}) => {

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let timer, progressInterval;

        if(viewStory && viewStory.media_type !== "video"){
            setProgress(0);

            const duration = 10000;
            const setTime = 100;
            let elasped = 0;

            progressInterval = setInterval(() => {
                elasped += setTime;
                setProgress((elasped / duration) * 100);
            }, setTime);

            // close story after 10 seconds
            timer = setTimeout(() => {
                setViewStory(null);
            }, duration);
        }

        return () => {
            clearTimeout(timer);
            clearInterval(progressInterval);
        }
    }, [viewStory, setViewStory]);

    if(!viewStory) return null;

    const renderContent = () => {
        switch(viewStory.media_type){
            case "text":
                return (
                    <div className="p-6 text-white text-center text-2xl" style={{backgroundColor: viewStory.background_color}}>
                        {viewStory.content}
                    </div>
                );
            case "image":
                return (
                    <img src={viewStory.media_url} alt="" className="max-h-[90vh] max-w-[90vw] object-contain" />
                );
            case "video":
                return (
                    <video onEnded={() => setViewStory(null)} src={viewStory.media_url} className="max-h-screen" controls autoPlay />
                );
            default:
                return null;
        }
    }

  return (
    <div className="fixed inset-0 z-110 h-screen bg-black bg-opacity:90 flex items-center justify-center" style={{backgroundColor: viewStory.media_type === "text" ? viewStory.background_color : "#000000"}}>
        {/* progress bar */}

        <div className="absolute top-0 left-0 w-full h-1 bg-gray-700">
            <div className="h-full bg-white transition-all duration-100 linear" style={{width: `${progress}%`}}></div>
        </div>

        {/* user info - Top left */}

        <div className="absolute top-4 left-4 flex items-center space-x-3 p-2 px-4 sm:p-4 sm:px-8 backdrop-blur-2xl rounded bg-black/50">
            <img src={viewStory.user?.profile_picture} alt="" className="size-7 sm:size-8 rounded-full object-cover border border-white" />
            <div className="text-white font-medium flex items-center gap-1.5"> 
                <span>{viewStory.user?.full_name}</span>
                <BadgeCheck size={18} />
            </div>
        </div>

        {/* close button - Top right */}

        <button onClick={() => setViewStory(null)} className="absolute top-4 right-4 text-white cursor-pointer text-xl font-bold backdrop-blur-2xl rounded bg-black/50">
            <X className="w-8 h-8 hover:scale-110 transition cursor-pointer"/>
        </button>

        {/* content wrapper */}

        <div className="max-w-[90vw] max-h-[90vh] flex items-center justify-center">
            {renderContent()}
        </div>
    </div>
  )
}

export default StoryViewer
