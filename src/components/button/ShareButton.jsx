const ShareButton = ({ url }) => {
    return (
        <div className="inline-flex rounded-md shadow bg-primary">
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Share on Facebook
        </a>
      </div>
    );
  };


export default ShareButton;