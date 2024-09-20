const DLCPageIcon: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div>
      {/* DLC Page Icon Button */}
      <button
        onClick={onClick}
        className=""
        title="Open DLC Page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        DLC
      </button>
    </div>
  );
};

export default DLCPageIcon;