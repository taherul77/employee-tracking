"use client"
import dynamic from "next/dynamic";
const HomeComponent = dynamic(() => import("../../components/Home/HomeComponent.js"), { ssr: false });

import React from "react";

const page = () => {

  
  return (
    <>
      <HomeComponent></HomeComponent>
    </>
  );
};

export default page;
