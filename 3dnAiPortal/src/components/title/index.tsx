"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Title: React.FC = () => {
  return (
    <Link href="/" style={{ display: "flex", alignItems: "center" }}>
      <div style={{ position: "relative", width: "120px", height: "40px" }}>
        <Image
          src="/assets/images/Logo.png"
          alt="TDN Portal Logo"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
    </Link>
  );
};
