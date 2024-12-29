# Function Chain Calculator WebApp

A web application that allows users to execute a chain of 5 mathematical functions, with output (y) of each function serving as the input (x) for the next.

Here is the deployment link for same:
[Deployment Link](link)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (version 14 or higher)
- **Git**

## Getting Started

### Clone the Repository

To clone the repository, run the following command in your terminal.

```sh
git clone https://github.com/tabishnehal/func-chain-calc-app.git
```

### Navigate to the Project Directory

Change into the project directory using the cd command.

```
cd func-chain-calc-app
```

### Install Dependencies

Install the required dependencies using npm. This will download all the necessary packages listed in the package.json file.

```
npm install
```

### Run the Development Server

Start the development server to run your React application. This will launch the app and you can view it in your browser.

```
npm run dev
```

### Open the Application in Your Browser

Once the development server is running, open your browser and navigate to the URL provided in the terminal output, typically http://localhost:5173.

## Add another Function

If you want to add another function such as `x/2 - x + 1`, then you can do followings:

- In `src/components/FunctionChain.tsx` file:
  - add an element `{ id: 6, equation: "x/2 - x + 1", isValid: true },` before last element to `functions` array.
  - add an element `useRef<HTMLDivElement>(null)` to `nodeRefs` array.
  - add an element `6` before last element to `functionExecutionOrder` array.

The resultant arrays will be as follows in execution order of `[1, 2, 4, 5, 6, 3]`:

```js
const [functions, setFunctions] = useState<FunctionData[]>([
    { id: 1, equation: "x^2", isValid: true },
    { id: 2, equation: "2*x+4", isValid: true },
    { id: 4, equation: "x-2", isValid: true },
    { id: 5, equation: "x/2", isValid: true },
    { id: 6, equation: "x/2 - x + 1", isValid: true },
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
    useRef<HTMLDivElement>(null),
  ];

  const functionExecutionOrder: number[] = [1, 2, 4, 5, 6, 3];
```
