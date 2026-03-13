import { useEffect, useState } from "react";
import { fetchBowlers } from "../api";

interface Bowler {
  firstName: string;
  middle: string;
  lastName: string;
  teamName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

export default function BowlerTable() {
  const [bowlers, setBowlers] = useState<Bowler[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBowlers()
      .then((data) => setBowlers(data))
      .catch(() => setError("Could not load bowlers right now."))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div className="loading">Loading bowlers...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Team</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {bowlers.map((b, index) => (
            <tr key={index}>
              <td>{[b.firstName, b.middle, b.lastName].filter(Boolean).join(" ")}</td>
              <td>{b.teamName}</td>
              <td>{b.address}</td>
              <td>{b.city}</td>
              <td>{b.state}</td>
              <td>{b.zip}</td>
              <td>{b.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
