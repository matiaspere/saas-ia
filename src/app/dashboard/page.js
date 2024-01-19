"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import UploadButton from "@/components/UploadButton";

const Dashboard = () => {
  const { data: session } = useSession();
  const [coins, setCoins] = useState();

  useEffect(() => {
    async function fetchCoins() {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
      );
      const data = await response.json();

      setCoins(data);
    }
    fetchCoins();
  }, []);

  return (
    <main className="mx-auto max-w-7xl md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl text-gray-900">Activos</h1>
        <UploadButton coins={coins} />
      </div>
    </main>
  );
};

export default Dashboard;
