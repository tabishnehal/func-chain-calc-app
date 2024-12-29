interface ConnectionNodeProps {
  className?: string;
}

const ConnectionNode = ({ className }: ConnectionNodeProps) => {
  return (
    <div
      className={`flex justify-center items-center w-[16px] h-[16px] border-2 border-[#A5A5A5] rounded-[50%] ${className}`}
    >
      <div className="w-[7px] h-[7px] bg-blue-500 rounded-[50%]" />
    </div>
  );
};

export default ConnectionNode;
