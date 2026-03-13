import Heading from "./components/Heading";
import BowlerTable from "./components/BowlerTable";

function App() {
  return (
    <div className="container">
      <Heading />
      <section className="card">
        <BowlerTable />
      </section>
    </div>
  );
}

export default App;
