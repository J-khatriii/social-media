import { useEffect, useState } from 'react';
import { assets, dummyPostsData } from '../assets/assets';
import Loading from '../Components/Loading';
import StoriesBar from '../Components/StoriesBar';
import PostCard from '../Components/PostCard';
import RecentMessages from '../Components/RecentMessages';

const Feed = () => {

  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFeeds = async () => {
    setFeeds(dummyPostsData);
  }

  // fetch the posts
  useEffect(() => {
    fetchFeeds();
  },[]);

  return !loading ? (
    <div className='h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8'>
      {/* stories and  posts list */}
      <div className="">
        <StoriesBar />
        <div className='p-4 space-y-6'>
          {
            feeds.map((post) => (
              <PostCard key={post._id} post={post} />
            ))
          }
        </div>
      </div>

      {/* right sidebar */}
      <div className='max-xl:hidden sticky top-0'>
        <div className='max-w-xs bh-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow'>
          <h3 className='text-slate-800 font-semibold'>Sponsored</h3>
          <img src={assets.sponsored_img} className='rounded-md w-75 h-50' alt="sponsored_img" />
          <p className='text-slate-600'>Email Marketing</p>
          <p className='text-slate-400'>Supercharge your marketing with a powerful, easy-to-use platform built for results.</p>
        </div>
        
        <RecentMessages />
      </div>
    </div>
  ) : <Loading /> 
}

export default Feed
