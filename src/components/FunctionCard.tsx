import ConnectionNode from "./ConnectionNode";

interface FunctionCardProps {
  id: number;
  equation: string;
  isValid: boolean;
  nextFunction: number | null;
  onEquationChange: (id: number, newEquation: string) => void;
}
const FunctionCard = ({
  id,
  equation,
  isValid,
  nextFunction,
  onEquationChange,
}: FunctionCardProps) => {
  return (
    <div className="bg-white shadow-lg  border border-[#DFDFDF] rounded-[15px] p-4 w-[235px]">
      <div className="flex justify-start items-center mb-2">
        <div className="grid grid-rows-2 grid-cols-3 gap-[3px] mr-2">
          <div className="h-[3px] w-[3px] rounded-[50%] bg-[#CDCDCD]"></div>
          <div className="h-[3px] w-[3px] rounded-[50%] bg-[#CDCDCD]"></div>
          <div className="h-[3px] w-[3px] rounded-[50%] bg-[#CDCDCD]"></div>
          <div className="h-[3px] w-[3px] rounded-[50%] bg-[#CDCDCD]"></div>
          <div className="h-[3px] w-[3px] rounded-[50%] bg-[#CDCDCD]"></div>
          <div className="h-[3px] w-[3px] rounded-[50%] bg-[#CDCDCD]"></div>
        </div>
        <h2 className="font-semibold text-xs text-[#A5A5A5] w-[76px] h-[17px]">
          Function: {id}
        </h2>
      </div>
      <div>
        <label className="block text-[#252525] text-xs font-medium mb-1">
          Equation
        </label>
        <input
          type="text"
          value={equation}
          onChange={(e) => onEquationChange(id, e.target.value)}
          className={`border border-[#D3D3D3] rounded-[8px] p-2 w-full h-[33px] font-semibold text-xs text-[#252525] ${
            isValid ? "border-gray-300" : "border-red-500"
          }`}
        />
        {!isValid && (
          <p className="text-red-500 text-xs mt-2">
            Invalid equation. Use +, -, *, /, ^.
          </p>
        )}
      </div>

      <div className="mt-4">
        <label className="block text-[#252525] text-xs font-medium mb-1">
          Next Function
        </label>
        <select
          disabled
          value={nextFunction || ""}
          className="border border-[#D3D3D3] rounded-[8px] w-full h-[33px] bg-gray-200"
        >
          <option
            className="h-[17px] font-semibold text-xs text-[#A5A5A5]"
            value=""
          >
            {nextFunction ? `Function: ${nextFunction}` : "-"}
          </option>
        </select>
      </div>

      <div className="flex justify-between mt-[40px] mb-[1.5px]">
        <div className="flex justify-between items-end h-[12px] text-[#585757] font-medium text-xs">
          <ConnectionNode className="mr-1 input" />
          input
        </div>
        <div className="flex justify-between items-end h-[12px] text-[#585757] font-medium text-xs">
          <ConnectionNode className="mr-1 output" />
          output
        </div>
      </div>
    </div>
  );
};

export default FunctionCard;
