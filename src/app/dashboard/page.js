"use client";
import React from "react";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();

  return <div>{session?.user?.email}</div>;
};

export default Dashboard;
