export default function FRODebugger({ children }) {
  return (
    <details>
      <summary>FRO Debugger</summary>
      <pre>{JSON.stringify(children, null, 2)}</pre>
    </details>
  );
}
