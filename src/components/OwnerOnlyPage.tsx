import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IRoomDetail } from "../types";
import { getRoom } from "../api";

export default function useOwnerOnlyPage(roomPk: string) {
  const { isLoading, data } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading) {
      if (!data?.is_owner) {
        navigate("/");
      }
    }
  }, [isLoading, navigate]);
}
