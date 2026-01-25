"use client";
import React from "react";

const RefreshGoogleToken = () => {
  const login = () => {
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
      response_type: "code",
      scope: "openid email profile",
    });

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  };

  return <button onClick={login}>Google 로그인</button>;
};

export default RefreshGoogleToken;
