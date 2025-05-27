// pages/index.js
import { useState } from "react";
import StatementUploader from "../components/StatementUploader";

export default function Home() {
  const [transactions, setTransactions] = useState([]);

  return (
    <div className="min-h-screen bg-buuk-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Buuk</h1>

      <section className="mb-8">
        <h2 className="text-xl mb-2">1. Upload your bank CSV</h2>
        <StatementUploader onData={setTransactions} />
      </section>

      {transactions.length > 0 && (
        <section>
          <h2 className="text-xl mb-2">2. Transactions</h2>
          <div className="overflow-auto bg-white text-black rounded shadow">
            <table className="w-full">
              <thead className="bg-buuk-600 text-white">
                <tr>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Description</th>
                  <th className="p-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, i) => (
                  <tr key={i} className={i % 2 ? "bg-gray-100" : ""}>
                    <td className="p-2">{tx.Date}</td>
                    <td className="p-2">{tx.Description}</td>
                    <td className="p-2 text-right">{tx.Amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
