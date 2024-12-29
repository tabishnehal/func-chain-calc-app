import FunctionCard from "./FunctionCard";
import { FunctionData } from "../models/ModelUtil";

interface FunctionCardListProps {
  functionExecutionOrder: number[];
  functions: FunctionData[];
  handleEquationChange: (id: number, newEquation: string) => void;
  start: number;
  end: number;
}

const FunctionCardList = ({
  functionExecutionOrder,
  functions,
  handleEquationChange,
  start,
  end,
}: FunctionCardListProps) => {
  return functionExecutionOrder.slice(start, end).map((id, index) => {
    const func = functions.find((f) => f.id === id);
    return (
      <div key={func?.id} className="relative">
        <FunctionCard
          id={id}
          equation={func?.equation || ""}
          isValid={func?.isValid || true}
          nextFunction={
            index + start < functionExecutionOrder.length - 1
              ? functionExecutionOrder[index + start + 1]
              : null
          }
          onEquationChange={handleEquationChange}
        />
      </div>
    );
  });
};
export default FunctionCardList;
