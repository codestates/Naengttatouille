import './Recipe.css';

export default function Recipe({ getYoutubeVideo, videoList, nextPageUrl }) {
  return (
    <div className='recipe'>
      <ul className='recipe__list'>
        {videoList?.map((video) => {
          return (
            <li key={video.videoId} className='recipe__content'>
              <a className='video' href={video.url} target='_blank' rel='noreferrer'>
                <img src={video.videoThumbnail} alt='thumbnail' />
              </a>
              <a className='text' href={video.url} target='_blank' rel='noreferrer'>
                <div className='title'>{video.videoTitle}</div>
                <div className='description'>{video.videoDescription}</div>
              </a>
            </li>
          );
        })}
      </ul>
      <div className='button__more'>
        <button onClick={() => getYoutubeVideo(nextPageUrl)}>더보기</button>
      </div>
    </div>
  );
}
