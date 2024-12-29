import { useCallback, useEffect, useRef, useState } from "react";
import Label from "./Label";
import FunctionCardList from "./FunctionCardList";
import FunctionCard from "./FunctionCard";
import { FunctionData, Line } from "../models/ModelUtil";
import ConnectionNode from "./ConnectionNode";

const FunctionChain = () => {
  const [initialValue, setInitialValue] = useState<number>(2);
  const [lines, setLines] = useState<Line[]>([]);
  const [svgSize, setSvgSize] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });
  const [functions, setFunctions] = useState<FunctionData[]>([
    { id: 1, equation: "x^2", isValid: true },
    { id: 2, equation: "2*x+4", isValid: true },
    { id: 4, equation: "x-2", isValid: true },
    { id: 5, equation: "x/2", isValid: true },
    { id: 3, equation: "x^2+20", isValid: true },
  ]);

  const nodeRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const functionExecutionOrder: number[] = [1, 2, 4, 5, 3];

  useEffect(() => {
    calculateLines();
    window.addEventListener("resize", calculateLines);
    return () => window.removeEventListener("resize", calculateLines);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculateLines = () => {
    const newLines: Line[] = [];
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;

    for (let i = 0; i < nodeRefs.length - 1; i++) {
      const start = nodeRefs[i].current
        ?.querySelector(".output")
        ?.getBoundingClientRect();
      const end = nodeRefs[i + 1].current
        ?.querySelector(".input")
        ?.getBoundingClientRect();
      if (start && end) {
        newLines.push({
          x1: start.x + start.width / 2,
          y1: start.y + start.height / 2,
          x2: end.x + end.width / 2,
          y2: end.y + end.height / 2,
        });

        minX = Math.min(minX, start.x, end.x);
        minY = Math.min(minY, start.y, end.y);
        maxX = Math.max(maxX, start.x + start.width, end.x + end.width);
        maxY = Math.max(maxY, start.y + start.height, end.y + end.height);
      }
    }
    setLines(newLines);
    setSvgSize({
      width: maxX - minX,
      height: maxY - minY,
      top: minY,
      left: minX,
    });
  };

  const calculateResult = (): string | number => {
    let x = initialValue;
    for (const id of functionExecutionOrder) {
      const func = functions.find((f) => f.id === id);
      if (!func || !func.isValid) return "Invalid equation";
      const equation = func?.equation.replace(/x/g, `(${x})`);
      const finalEquation = equation.replace(/\^/g, `**`);
      try {
        x = eval(finalEquation);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        return "Invalid equation";
      }
    }
    return x;
  };

  const handleEquationChange = useCallback(
    (id: number, newEquation: string) => {
      const isValid = /^[0-9+\-*/^x().\s]*$/.test(newEquation);
      setFunctions((prev) =>
        prev.map((func) =>
          func.id === id ? { ...func, equation: newEquation, isValid } : func
        )
      );
    },
    []
  );

  const renderCurvedLine = (line: Line) => {
    const { x1, y1, x2, y2 } = line;
    const pathData = `M${x1 - svgSize.left},${y1 - svgSize.top} C${
      x1 - svgSize.left + 50
    },${y1 - svgSize.top} ${x2 - svgSize.left - 50},${y2 - svgSize.top} ${
      x2 - svgSize.left
    },${y2 - svgSize.top}`;
    return (
      <path
        key={line.x1}
        d={pathData}
        stroke="rgba(0, 102, 255, 0.3)"
        strokeWidth={6}
        fill="transparent"
      />
    );
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-12 bg-gray-100 p-4">
        <div className="grid grid-flow-col auto-cols-max gap-12 relative">
          <div className="flex items-end gap-2">
            <div ref={nodeRefs[0]}>
              <Label
                labelText="Initial value of x"
                className="w-[115px] h-[22px] bg-[#E29A2D] text-white
            leading-[14.52px] rounded-[14px] text-xs font-semibold mb-2"
              />

              <div className="flex justify-between items-center border-[2px] border-[#FFC267] rounded-[15px] p-2 w-[115px] h-[50px]">
                <input
                  type="number"
                  value={initialValue}
                  onChange={(e) => setInitialValue(Number(e.target.value))}
                  className="w-1/2 h-[46px] bg-[inherit]"
                  style={{ border: "none !important" }}
                />

                <div className="border border-[#FFEED5] h-[46px]"></div>
                <ConnectionNode className="output" />
              </div>
            </div>

            <div ref={nodeRefs[1]}>
              <FunctionCardList
                functionExecutionOrder={functionExecutionOrder}
                functions={functions}
                handleEquationChange={handleEquationChange}
                start={0}
                end={1}
              />
            </div>
          </div>

          <div ref={nodeRefs[2]}>
            <FunctionCardList
              functionExecutionOrder={functionExecutionOrder}
              functions={functions}
              handleEquationChange={handleEquationChange}
              start={1}
              end={2}
            />
          </div>

          <div className="flex items-end gap-2">
            <div ref={nodeRefs[functions.length]}>
              <FunctionCardList
                functionExecutionOrder={functionExecutionOrder}
                functions={functions}
                handleEquationChange={handleEquationChange}
                start={functions.length - 1}
                end={functions.length}
              />
            </div>
            <div ref={nodeRefs[functions.length + 1]}>
              <Label
                labelText="Final Output (y)"
                className="w-[111px] h-[22px] bg-[#4CAF79] text-white
            leading-[14.52px] rounded-[14px] text-xs font-semibold mb-2"
              />
              <div className="flex justify-between items-center border-[2px] border-[#2DD179] rounded-[15px] p-2 w-[111px] h-[50px]">
                <ConnectionNode className="input" />
                {calculateResult() === "Invalid equation" ? (
                  <p className="text-red-500 text-xs m-0 p-0">
                    Invalid
                    <br />
                    equation
                  </p>
                ) : (
                  <>
                    <div className="border border-[#C5F2DA] h-[46px] -ml-8"></div>
                    {calculateResult()}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {functions.slice(2, functions.length - 1).map((func, index) => (
            <div
              key={func?.id}
              ref={nodeRefs[func?.id - 1]}
              className="relative"
            >
              <FunctionCard
                id={func?.id}
                equation={func?.equation || ""}
                isValid={func?.isValid || true}
                nextFunction={
                  index + 2 < functionExecutionOrder.length - 1
                    ? functionExecutionOrder[index + 2 + 1]
                    : null
                }
                onEquationChange={handleEquationChange}
              />
            </div>
          ))}
        </div>
      </div>

      <svg
        style={{
          position: "absolute",
          top: svgSize.top,
          left: svgSize.left,
          width: svgSize.width,
          height: svgSize.height,
          pointerEvents: "none",
        }}
      >
        {lines.map((line) => renderCurvedLine(line))}
      </svg>
    </>
  );
};

export default FunctionChain;
